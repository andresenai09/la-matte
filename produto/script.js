document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const get = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  /* ============================================================
     PRODUTO ATUAL
     ============================================================ */
  const urlParams = new URLSearchParams(location.search);
  const id = Number(urlParams.get("id")) || 1;
  const produtoAtual = encontrarProduto(id);

  if (!produtoAtual) {
    location.href = "../principal/index.html";
    return;
  }

  let carrinho = get("carrinho", []);
  let favoritos = get("favoritos", []);

  if (!carrinho.length) {
    const antigoCarrinho = get("laMatteCarrinho", []);
    if (Array.isArray(antigoCarrinho) && antigoCarrinho.length) {
      carrinho = antigoCarrinho;
      save("carrinho", carrinho);
    }
  }

  if (!favoritos.length) {
    const antigosFavoritos = get("laMatteFavoritos", []);
    if (Array.isArray(antigosFavoritos) && antigosFavoritos.length) {
      favoritos = antigosFavoritos.map(item => typeof item === "object" ? item.id : item).filter(Number.isFinite);
      save("favoritos", favoritos);
    }
  }

  /* ============================================================
     GERADOR PSEUDOALEATÓRIO DETERMINÍSTICO (por produto)
     Garante que as avaliações "realistas" fiquem sempre
     iguais para o mesmo produto, em vez de mudar a cada load.
     ============================================================ */
  function mulberry32(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rng = mulberry32(produtoAtual.id * 9973 + 17);
  const escolher = arr => arr[Math.floor(rng() * arr.length)];
  const embaralhar = arr => {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  };

  /* ============================================================
     CABEÇALHO / PAINÉIS (idêntico em comportamento à página principal)
     ============================================================ */
  function totalCarrinho() {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  function atualizarContadores() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    $("#contadorCarrinho").textContent = totalItens;
    $("#contadorFavoritos").textContent = favoritos.length;
  }

  function renderCarrinho() {
    const box = $("#carrinhoConteudo");
    if (!carrinho.length) {
      box.innerHTML = `
        <div class="vazio">
          <span>🛒</span>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos para começar.</p>
        </div>
      `;
    } else {
      box.innerHTML = carrinho.map(item => `
        <div class="item-painel">
          <img src="${item.imagem}" alt="${item.nome}" loading="lazy">
          <div class="item-info">
            <h4>${item.nome}</h4>
            <strong>${formatarMoeda(item.preco)}</strong>
            <div class="quantidade">
              <button data-minus="${item.id}">−</button>
              <span>${item.quantidade}</span>
              <button data-plus="${item.id}">+</button>
            </div>
          </div>
          <button class="remover" data-remove="${item.id}">×</button>
        </div>
      `).join("");
    }

    $("#subtotalCarrinho").textContent = formatarMoeda(totalCarrinho());

    $$("[data-minus]").forEach(btn => {
      btn.onclick = () => {
        const pid = Number(btn.dataset.minus);
        const qtdAtual = carrinho.find(i => i.id === pid)?.quantidade || 1;
        alterarCarrinho(pid, qtdAtual - 1);
      };
    });
    $$("[data-plus]").forEach(btn => {
      btn.onclick = () => {
        const pid = Number(btn.dataset.plus);
        const qtdAtual = carrinho.find(i => i.id === pid)?.quantidade || 0;
        alterarCarrinho(pid, qtdAtual + 1);
      };
    });
    $$("[data-remove]").forEach(btn => {
      btn.onclick = () => alterarCarrinho(Number(btn.dataset.remove), 0);
    });
  }

  function alterarCarrinho(pid, quantidade) {
    const itemExistente = carrinho.find(x => x.id === pid);
    if (!itemExistente) return;
    if (quantidade <= 0) {
      carrinho = carrinho.filter(x => x.id !== pid);
    } else {
      itemExistente.quantidade = quantidade;
    }
    save("carrinho", carrinho);
    renderCarrinho();
    atualizarContadores();
  }

  function adicionarAoCarrinho(pid, quantidade = 1) {
    const produto = encontrarProduto(pid);
    if (!produto) return;

    const itemExistente = carrinho.find(x => x.id === pid);
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        quantidade
      });
    }

    save("carrinho", carrinho);
    renderCarrinho();
    atualizarContadores();
  }

  function renderFavoritos() {
    const box = $("#favoritosConteudo");
    const lista = produtos.filter(p => favoritos.includes(p.id));

    if (!lista.length) {
      box.innerHTML = `
        <div class="vazio">
          <span>♡</span>
          <h3>Nenhum favorito</h3>
          <p>Toque no coração de um produto para salvá-lo.</p>
        </div>
      `;
    } else {
      box.innerHTML = lista.map(p => `
        <div class="item-painel">
          <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
          <div class="item-info">
            <h4>${p.nome}</h4>
            <strong>${formatarMoeda(p.preco)}</strong>
            <a href="index.html?id=${p.id}" class="mini-link">Ver produto</a>
          </div>
          <button class="remover" data-remove-fav="${p.id}">×</button>
        </div>
      `).join("");
    }

    $$("[data-remove-fav]").forEach(btn => {
      btn.onclick = () => toggleFavorito(Number(btn.dataset.removeFav));
    });
  }

  function toggleFavorito(pid) {
    favoritos = favoritos.includes(pid)
      ? favoritos.filter(x => x !== pid)
      : [...favoritos, pid];

    save("favoritos", favoritos);
    renderFavoritos();
    atualizarContadores();
    atualizarBotaoFavoritoProduto();
    renderRelacionados();
  }

  function fecharTodos() {
    $$(".painel-lateral").forEach(p => p.classList.remove("aberto"));
    $("#perfilPopup").classList.remove("aberto");
    $("#painelFundo").classList.remove("ativo");
    document.body.classList.remove("painel-aberto");
    $("#menuBtn").classList.remove("active");
  }

  function abrir(elemento) {
    fecharTodos();
    elemento.classList.add("aberto");
    $("#painelFundo").classList.add("ativo");
    document.body.classList.add("painel-aberto");
  }

  function preencherPerfil(usuario) {
    const campos = ["Usuario", "NomeCompleto", "Cpf", "Nascimento", "Telefone", "Cep", "Senha"];
    campos.forEach(campo => {
      const el = $("#perfil" + campo);
      const chave = campo.charAt(0).toLowerCase() + campo.slice(1);
      if (el) el.value = usuario[chave] || "";
    });
    $("#msgSucessoPerfil").textContent = "";
  }

  function atualizarUsuario() {
    const usuarioLogado = get("usuarioLogado", null);
    const links = $("#perfilLinks");

    $("#perfilNomeMenu").textContent = usuarioLogado
      ? (usuarioLogado.nomeCompleto || usuarioLogado.usuario)
      : "Visitante";

    $("#perfilSubMenu").textContent = usuarioLogado
      ? (usuarioLogado.telefone || "Cliente")
      : "Faça login para acessar sua conta";

    if (usuarioLogado) {
      links.innerHTML = `
        <button id="btnAbrirDadosPerfil">Meus dados / editar perfil <b>›</b></button>
        <a href="../principal/index.html#produtos">Fazer compras <b>›</b></a>
        <button id="btnSairConta">Sair da conta <b>›</b></button>
      `;
      $("#btnAbrirDadosPerfil")?.addEventListener("click", () => {
        preencherPerfil(usuarioLogado);
        abrir($("#perfilPainel"));
      });
      $("#btnSairConta")?.addEventListener("click", logout);
    } else {
      links.innerHTML = `
        <a href="../login/login.html">Entrar na conta <b>›</b></a>
        <a href="../cadastro/cadastro.html">Criar cadastro <b>›</b></a>
      `;
    }
  }

  function logout() {
    localStorage.removeItem("usuarioLogado");
    fecharTodos();
    atualizarUsuario();
  }

  $("#carrinhoBtn").onclick = () => abrir($("#carrinhoPainel"));
  $("#favoritosBtn").onclick = () => abrir($("#favoritosPainel"));
  $("#menuBtn").onclick = () => {
    if ($("#menuOverlay").classList.contains("aberto")) {
      fecharTodos();
    } else {
      abrir($("#menuOverlay"));
      $("#menuBtn").classList.add("active");
    }
  };
  ["fecharCarrinho", "fecharFavoritos", "fecharMenu", "fecharPerfil"].forEach(elId => {
    $("#" + elId).onclick = fecharTodos;
  });
  $("#painelFundo").onclick = fecharTodos;
  document.onkeydown = e => {
    if (e.key === "Escape") fecharTodos();
  };
  $("#perfilBtn").onclick = () => {
    const usuarioLogado = get("usuarioLogado", null);
    if (usuarioLogado) {
      preencherPerfil(usuarioLogado);
      abrir($("#perfilPainel"));
    } else {
      $("#perfilPopup").classList.toggle("aberto");
    }
  };
  $("#btnSairContaGeral")?.addEventListener("click", logout);

  $("#formEditarPerfil").onsubmit = e => {
    e.preventDefault();
    let usuarios = get("usuarios", []);
    let usuarioLogado = get("usuarioLogado", {});
    const antigoUsuario = usuarioLogado.usuario;

    const campos = ["Usuario", "NomeCompleto", "Cpf", "Nascimento", "Telefone", "Cep", "Senha"];
    campos.forEach(campo => {
      const chave = campo.charAt(0).toLowerCase() + campo.slice(1);
      usuarioLogado[chave] = $("#perfil" + campo).value.trim();
    });

    const index = usuarios.findIndex(x => x.usuario === antigoUsuario);
    if (index >= 0) {
      usuarios[index] = usuarioLogado;
    } else {
      usuarios.push(usuarioLogado);
    }

    save("usuarios", usuarios);
    save("usuarioLogado", usuarioLogado);
    atualizarUsuario();
    $("#msgSucessoPerfil").textContent = "Dados atualizados com sucesso!";
  };

  $("#formNewsletter").onsubmit = e => {
    e.preventDefault();
    $("#newsletterSucesso").textContent = "Inscrição realizada!";
    e.target.reset();
  };

  /* ============================================================
     DADOS DO PRODUTO NA PÁGINA
     ============================================================ */
  document.title = `${produtoAtual.nome} | La Matte`;

  $("#nome").textContent = produtoAtual.nome;
  $("#crumb").textContent = produtoAtual.nome;
  $("#crumbCategoria").textContent = produtoAtual.categoria;
  $("#categoria").textContent = produtoAtual.categoria;

  const imagemEl = $("#imagemProduto");
  imagemEl.src = produtoAtual.imagem;
  imagemEl.alt = produtoAtual.nome;
  imagemEl.onerror = () => {
    imagemEl.onerror = null;
    imagemEl.src = "#";
  };

  $("#preco").textContent = formatarMoeda(produtoAtual.preco);
  $("#descricao").textContent = produtoAtual.descricao;
  $("#descricaoLonga").innerHTML = produtoAtual.descricaoLonga;

  function renderEstrelas(nota) {
    const cheias = Math.round(nota);
    return "★".repeat(cheias) + "☆".repeat(5 - cheias);
  }
  $("#estrelas").textContent = renderEstrelas(produtoAtual.avaliacao);
  $("#nota").textContent = produtoAtual.avaliacao.toFixed(1);
  $("#qtdAvaliacoes").textContent = `(${produtoAtual.avaliacoes} avaliações)`;

  /* Selo de estoque (elemento próprio, determinístico por produto) */
  const estoqueBaixo = rng() < 0.22;
  const seloEstoque = $("#seloEstoque");
  if (estoqueBaixo) {
    seloEstoque.textContent = "Restam poucas unidades";
    seloEstoque.classList.add("baixo");
  } else {
    seloEstoque.textContent = "Em estoque — pronto para envio";
  }

  /* ============================================================
     FAVORITAR PRODUTO ATUAL
     ============================================================ */
  function atualizarBotaoFavoritoProduto() {
    const ativo = favoritos.includes(produtoAtual.id);
    $("#favoritarProduto").classList.toggle("ativo", ativo);
    $("#favIconProduto").textContent = ativo ? "♥" : "♡";
  }
  $("#favoritarProduto").onclick = () => toggleFavorito(produtoAtual.id);

  /* ============================================================
     QUANTIDADE E COMPRA
     ============================================================ */
  let qtd = 1;
  $("#menos").onclick = () => {
    qtd = Math.max(1, qtd - 1);
    $("#quantidade").textContent = qtd;
  };
  $("#mais").onclick = () => {
    qtd++;
    $("#quantidade").textContent = qtd;
  };

  $("#adicionar").onclick = () => {
    adicionarAoCarrinho(produtoAtual.id, qtd);
    const btn = $("#adicionar");
    btn.textContent = "Adicionado ✓";
    setTimeout(() => { btn.textContent = "Adicionar ao carrinho"; }, 1200);
  };

  $("#comprarAgora").onclick = () => {
    adicionarAoCarrinho(produtoAtual.id, qtd);
    location.href = "../checkout/index.html";
  };

  $("#compartilharProduto").onclick = () => {
    const url = location.href;
    const finalizarAviso = () => {
      $("#msgCompartilhar").textContent = "Link copiado!";
      setTimeout(() => { $("#msgCompartilhar").textContent = ""; }, 2000);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(finalizarAviso).catch(finalizarAviso);
    } else {
      finalizarAviso();
    }
  };

  /* ============================================================
     DICAS DE USO (elemento próprio, por categoria)
     ============================================================ */
  const dicasPorCategoria = {
    "Erva-Mate": {
      titulo: "Como preparar o chimarrão perfeito",
      dicas: [
        "Encha a cuia até cerca de 2/3 com a erva-mate antes de posicionar a bomba.",
        "Use água entre 70°C e 80°C — água fervendo queima a erva e amarga o chimarrão.",
        "Mantenha a embalagem bem fechada, em local seco e ao abrigo da luz."
      ]
    },
    "Tereré": {
      titulo: "Como preparar um tereré refrescante",
      dicas: [
        "Utilize água bem gelada ou suco natural para potencializar o frescor.",
        "Capriche no gelo dentro da guampa para manter a temperatura por mais tempo.",
        "Combine com folhas de hortelã ou rodelas de limão para um toque extra."
      ]
    },
    "Chás": {
      titulo: "Como extrair o melhor aroma do seu chá",
      dicas: [
        "Respeite o tempo de infusão indicado para não deixar o chá amargo.",
        "Água quente, mas fora do fervor intenso, preserva melhor os óleos essenciais.",
        "Guarde em recipiente hermético, longe de temperos e da luz direta."
      ]
    },
    "Bombas": {
      titulo: "Cuidados para preservar sua bomba",
      dicas: [
        "Lave em água corrente logo após o uso, sem deixar erva ressecar no filtro.",
        "Evite lava-louças: a lavagem manual preserva o acabamento e o brilho.",
        "Seque bem antes de guardar para evitar manchas e oxidação."
      ]
    },
    "Cuias": {
      titulo: "Como curar e cuidar da sua cuia",
      dicas: [
        "Antes do primeiro uso, faça a cura tradicional com erva e água morna por 24h.",
        "Nunca lave com detergente: isso remove a película protetora formada com o uso.",
        "Deixe secar naturalmente, de boca para baixo, após cada utilização."
      ]
    },
    "Guampas": {
      titulo: "Como aproveitar melhor a sua guampa",
      dicas: [
        "Lave com água morna e deixe secar completamente entre um uso e outro.",
        "Para tererés mais longos, adicione gelo aos poucos para conservar a temperatura.",
        "Evite exposição prolongada ao sol direto para preservar o material."
      ]
    },
    "Garrafas": {
      titulo: "Como potencializar a conservação térmica",
      dicas: [
        "Pré-aqueça ou pré-resfrie a garrafa por alguns minutos antes de usá-la.",
        "Mantenha a tampa bem rosqueada para não perder a vedação a vácuo.",
        "Higienize o interior periodicamente com água morna e bicarbonato de sódio."
      ]
    }
  };
  const dica = dicasPorCategoria[produtoAtual.categoria];
  if (dica) {
    $("#dicasUso").innerHTML = `
      <h3>${dica.titulo}</h3>
      <ul>${dica.dicas.map(d => `<li>${d}</li>`).join("")}</ul>
    `;
  }

  /* ============================================================
     RESUMO DE AVALIAÇÕES (nota geral + barras de distribuição)
     ============================================================ */
  $("#mediaAvaliacao").textContent = produtoAtual.avaliacao.toFixed(1);
  $("#estrelasResumo").textContent = renderEstrelas(produtoAtual.avaliacao);
  $("#totalAvaliacoesTexto").textContent = `${produtoAtual.avaliacoes} avaliações verificadas`;

  function distribuicaoEstrelas(media) {
    if (media >= 4.7) return [78, 15, 4, 2, 1];
    if (media >= 4.4) return [65, 22, 8, 3, 2];
    if (media >= 4.0) return [52, 27, 13, 5, 3];
    return [38, 29, 19, 9, 5];
  }
  const distribuicao = distribuicaoEstrelas(produtoAtual.avaliacao);
  $("#barrasAvaliacao").innerHTML = [5, 4, 3, 2, 1].map((estrela, i) => `
    <div class="barra-linha">
      <span>${estrela} ★</span>
      <div class="barra-fundo"><div class="barra-preenchida" style="width:${distribuicao[i]}%"></div></div>
      <span>${distribuicao[i]}%</span>
    </div>
  `).join("");

  /* ============================================================
     AVALIAÇÕES REALISTAS (geradas por categoria, determinísticas)
     ============================================================ */
  const nomesClientes = [
    "Mariana Oliveira", "Lucas Ferreira", "Beatriz Santos", "Rafael Costa",
    "Camila Rodrigues", "Thiago Almeida", "Fernanda Lima", "Bruno Carvalho",
    "Juliana Pereira", "Gustavo Martins", "Larissa Souza", "Eduardo Ribeiro",
    "Patrícia Gomes", "Diego Barbosa", "Aline Cardoso", "Rodrigo Teixeira",
    "Vanessa Nunes", "Felipe Azevedo", "Priscila Rocha", "Marcelo Dias",
    "Renata Fonseca", "André Monteiro", "Débora Pinto", "Leonardo Farias"
  ];

  const coresAvatar = ["#38604d", "#c49a55", "#0f2c23", "#a87a2d", "#7a9a86", "#9a712c"];

  const datasRelativas = [
    "há 2 dias", "há 5 dias", "há 1 semana", "há 2 semanas", "há 3 semanas",
    "há 1 mês", "há 2 meses", "há 3 meses", "há 4 meses", "há 6 meses"
  ];

  const comentariosGerais = [
    "Superou minhas expectativas. Embalagem chegou intacta e o produto tem qualidade visível.",
    "Já é a segunda vez que compro e a experiência continua excelente. Recomendo.",
    "Custo-benefício muito bom comparado a outras lojas que já experimentei.",
    "Entrega rápida e produto exatamente como descrito no anúncio.",
    "Atendimento nota dez quando tive uma dúvida sobre o pedido.",
    "Gostei bastante, mas achei que poderia vir com uma embalagem um pouco mais reforçada."
  ];

  const comentariosPorCategoria = {
    "Erva-Mate": [
      "Erva de ótima qualidade, sabor equilibrado e sem amargor excessivo. Meu chimarrão ficou perfeito.",
      "Rende muito bem, moagem ideal e chegou bem fresquinha, com aroma forte assim que abri.",
      "Virou a erva oficial aqui de casa. Cor verde bonita e sabor consistente do início ao fim da cuia.",
      "Comprei para presentear meu pai, que é exigente com chimarrão, e ele aprovou de primeira.",
      "Textura ótima para a bomba, não entupiu em nenhum momento durante o uso."
    ],
    "Tereré": [
      "Combinação perfeita para os dias quentes, o sabor refrescante realmente faz diferença.",
      "Erva com granulometria ideal, não entupiu a bomba mesmo com bastante gelo na guampa.",
      "O aroma cítrico é sensacional, senti o frescor logo nos primeiros goles.",
      "Levei para uma roda de tereré com os amigos e todo mundo elogiou o sabor."
    ],
    "Chás": [
      "Aroma incrível assim que abre o pacote, e o sabor na xícara é tão bom quanto o cheiro.",
      "Virou parte da minha rotina noturna, é bem relaxante e tem gosto natural, sem artificialidade.",
      "Infusão rápida e sabor persistente, não precisa exagerar na quantidade para sentir o efeito.",
      "Ótimo para quem busca uma opção mais saudável no lugar do café à tarde."
    ],
    "Bombas": [
      "Acabamento impecável, dá para perceber a qualidade do material assim que pega na mão.",
      "Filtra muito bem, nunca passou erva para a água mesmo usando moagem mais fina.",
      "Comprei como presente e a pessoa amou o brilho e o peso agradável na mão.",
      "Durável e fácil de limpar, já uso há um tempo e continua com ótima aparência."
    ],
    "Cuias": [
      "Já cheguei curada corretamente, foi só lavar e começar a usar sem complicação.",
      "Acabamento artesanal muito bonito, virou peça de destaque na minha mesa de mate.",
      "Formato confortável na mão e o material parece ser bem resistente a quedas leves.",
      "Superou o que eu esperava pelo preço, qualidade de loja física."
    ],
    "Guampas": [
      "Mantém a temperatura por bastante tempo, perfeita para tererés mais longos no calor.",
      "Design bonito e resistente, já derrubei sem querer e não teve nenhum arranhão visível.",
      "Boa ergonomia, encaixa bem na mão mesmo em sessões longas de tereré.",
      "Comprei para o verão e não me arrependi, o gelo dura bem mais que na garrafa comum."
    ],
    "Garrafas": [
      "Conservação térmica impressionante, a água continua gelada depois de muitas horas.",
      "Vedação perfeita, nunca vazou uma gota mesmo carregando na mochila deitada.",
      "Ótima para o dia a dia no trabalho, mantém a bebida na temperatura ideal até o fim do expediente.",
      "Material resistente, já caiu algumas vezes e não amassou nem furou."
    ]
  };

  function iniciais(nome) {
    return nome.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  }

  function gerarNotaReview(mediaProduto) {
    const roll = rng();
    const base = Math.round(mediaProduto);
    if (roll < 0.62) return base;
    if (roll < 0.85) return Math.max(1, base - 1);
    if (roll < 0.95) return Math.min(5, base + 1);
    return Math.max(1, base - 2);
  }

  function gerarAvaliacoes() {
    const poolCategoria = comentariosPorCategoria[produtoAtual.categoria] || [];
    const poolCompleto = embaralhar([...poolCategoria, ...comentariosGerais]);
    const quantidade = Math.min(6, poolCompleto.length);
    const nomesUsados = embaralhar(nomesClientes).slice(0, quantidade);

    return poolCompleto.slice(0, quantidade).map((texto, i) => {
      const nome = nomesUsados[i];
      return {
        nome,
        iniciais: iniciais(nome),
        cor: escolher(coresAvatar),
        nota: gerarNotaReview(produtoAtual.avaliacao),
        data: escolher(datasRelativas),
        verificado: rng() < 0.85,
        util: Math.floor(rng() * 38),
        texto
      };
    }).sort((a, b) => b.nota - a.nota);
  }

  $("#listaAvaliacoes").innerHTML = gerarAvaliacoes().map(av => `
    <article class="review">
      <div class="review-avatar" style="background:${av.cor}">${av.iniciais}</div>
      <div class="review-corpo">
        <div class="review-cabecalho">
          <strong>${av.nome}</strong>
          ${av.verificado ? '<span class="selo-verificado">Compra verificada</span>' : ""}
          <span class="review-data">${av.data}</span>
        </div>
        <div class="estrelas-review">${renderEstrelas(av.nota)}</div>
        <p>${av.texto}</p>
        <div class="review-util">${av.util} pessoas acharam esta avaliação útil</div>
      </div>
    </article>
  `).join("");

  /* ============================================================
     PRODUTOS RELACIONADOS
     ============================================================ */
  function cardRelacionado(produto) {
    const isFavorito = favoritos.includes(produto.id);
    return `
      <article class="produto-card" data-id="${produto.id}">
        <button class="fav-card ${isFavorito ? "ativo" : ""}" data-fav="${produto.id}">
          ${isFavorito ? "♥" : "♡"}
        </button>
        <a href="index.html?id=${produto.id}" class="produto-link">
          <div class="produto-img">
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
          </div>
          <div class="produto-info">
            <span>${produto.categoria}</span>
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <div>
              <strong>${formatarMoeda(produto.preco)}</strong>
              <em>★ ${produto.avaliacao}</em>
            </div>
          </div>
        </a>
        <button class="add-card" data-add="${produto.id}">Adicionar ao carrinho</button>
      </article>
    `;
  }

  function renderRelacionados() {
    let lista = produtos.filter(p => p.categoria === produtoAtual.categoria && p.id !== produtoAtual.id);
    if (lista.length < 4) {
      const extras = produtos.filter(p => p.id !== produtoAtual.id && !lista.includes(p));
      lista = lista.concat(embaralhar(extras));
    }
    lista = embaralhar(lista).slice(0, 4);

    $("#gridRelacionados").innerHTML = lista.map(cardRelacionado).join("");

    $$("[data-fav]").forEach(btn => {
      btn.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorito(Number(btn.dataset.fav));
      };
    });
    $$("[data-add]").forEach(btn => {
      btn.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        adicionarAoCarrinho(Number(btn.dataset.add));
        const original = btn.textContent;
        btn.textContent = "Adicionado ✓";
        setTimeout(() => { btn.textContent = original; }, 1200);
      };
    });
  }

  /* ============================================================
     INICIALIZAÇÃO
     ============================================================ */
  atualizarUsuario();
  atualizarContadores();
  renderCarrinho();
  renderFavoritos();
  atualizarBotaoFavoritoProduto();
  renderRelacionados();
});
