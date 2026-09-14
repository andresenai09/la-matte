document.addEventListener("DOMContentLoaded", () => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  const get = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  let carrinho = get("carrinho", []);
  let favoritos = get("favoritos", []);
  let categoria = "Todos";
  let slide = 0;

  const grid = $("#gridProdutos");
  const sem = $("#semResultados");
  const pesquisa = $("#campoPesquisa");
  const track = $("#bannerContainer");
  const dots = $$(".dots button");

  function totalCarrinho() {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  function atualizarContadores() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    $("#contadorCarrinho").textContent = totalItens;
    $("#contadorFavoritos").textContent = favoritos.length;
  }

  function card(produto) {
    const isFavorito = favoritos.includes(produto.id);
    return `
      <article class="produto-card" data-id="${produto.id}">
        <button class="fav-card ${isFavorito ? "ativo" : ""}" data-fav="${produto.id}">
          ${isFavorito ? "♥" : "♡"}
        </button>
        <a href="../produto/index.html?id=${produto.id}" class="produto-link">
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

  function renderProdutos() {
    const termo = (pesquisa?.value || "").toLowerCase().trim();
    const lista = produtos.filter(p => {
      const bateCategoria = categoria === "Todos" || p.categoria === categoria;
      const textoBusca = (p.nome + " " + p.descricao + " " + p.categoria).toLowerCase();
      const bateTermo = !termo || textoBusca.includes(termo);
      return bateCategoria && bateTermo;
    });

    grid.innerHTML = lista.map(card).join("");
    sem.style.display = lista.length ? "none" : "block";

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
        adicionar(Number(btn.dataset.add));
      };
    });
  }

  function adicionar(id, quantidade = 1) {
    const produto = encontrarProduto(id);
    if (!produto) return;

    const itemExistente = carrinho.find(x => x.id === id);
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

  function alterar(id, quantidade) {
    const itemExistente = carrinho.find(x => x.id === id);
    if (!itemExistente) return;

    if (quantidade <= 0) {
      carrinho = carrinho.filter(x => x.id !== id);
    } else {
      itemExistente.quantidade = quantidade;
    }

    save("carrinho", carrinho);
    renderCarrinho();
    atualizarContadores();
  }

  function toggleFavorito(id) {
    favoritos = favoritos.includes(id)
      ? favoritos.filter(x => x !== id)
      : [...favoritos, id];

    save("favoritos", favoritos);
    renderProdutos();
    renderFavoritos();
    atualizarContadores();
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
        const id = Number(btn.dataset.minus);
        const qtdAtual = carrinho.find(i => i.id === id)?.quantidade || 1;
        alterar(id, qtdAtual - 1);
      };
    });

    $$("[data-plus]").forEach(btn => {
      btn.onclick = () => {
        const id = Number(btn.dataset.plus);
        const qtdAtual = carrinho.find(i => i.id === id)?.quantidade || 0;
        alterar(id, qtdAtual + 1);
      };
    });

    $$("[data-remove]").forEach(btn => {
      btn.onclick = () => alterar(Number(btn.dataset.remove), 0);
    });
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
            <a href="../produto/index.html?id=${p.id}" class="mini-link">Ver produto</a>
          </div>
          <button class="remover" data-remove-fav="${p.id}">×</button>
        </div>
      `).join("");
    }

    $$("[data-remove-fav]").forEach(btn => {
      btn.onclick = () => toggleFavorito(Number(btn.dataset.removeFav));
    });
  }

  function fecharTodos() {
    $$(".painel-lateral").forEach(p => p.classList.remove("aberto"));
    $("#perfilPopup")?.classList.remove("aberto");
    $("#painelFundo")?.classList.remove("ativo");
    document.body.classList.remove("painel-aberto");
    $("#menuBtn")?.classList.remove("active");
  }

  function abrir(elemento) {
    fecharTodos();
    elemento.classList.add("aberto");
    $("#painelFundo").classList.add("ativo");
    document.body.classList.add("painel-aberto");
  }

  function atualizarUsuario() {
    const usuarioLogado = get("usuarioLogado", null);
    const links = $("#perfilLinks");

    $("#perfilNomeMenu").textContent = usuarioLogado
      ? (usuarioLogado.nomeCompleto || usuarioLogado.usuario)
      : "Visitante";

    $("#perfilSubMenu").textContent = usuarioLogado
      ? (usuarioLogado.telefone || "Cliente La Matte")
      : "Faça login para acessar sua conta";

    if (usuarioLogado) {
      links.innerHTML = `
        <a href="../perfil/index.html">Meu Perfil / Editar Dados <b>›</b></a>
        <a href="#produtos">Fazer compras <b>›</b></a>
        <button id="btnSairConta">Sair da conta <b>›</b></button>
      `;

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

  function banner(indice) {
    slide = (indice + 3) % 3;
    if (track) track.style.transform = `translateX(-${slide * 33.3333}%)`;
    dots.forEach((dot, idx) => dot.classList.toggle("ativo", idx === slide));
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

  ["fecharCarrinho", "fecharFavoritos", "fecharMenu"].forEach(id => {
    if ($("#" + id)) $("#" + id).onclick = fecharTodos;
  });

  $("#painelFundo").onclick = fecharTodos;
  document.onkeydown = e => {
    if (e.key === "Escape") fecharTodos();
  };

  $("#perfilBtn").onclick = () => {
    const usuarioLogado = get("usuarioLogado", null);
    if (usuarioLogado) {
      window.location.href = "../perfil/index.html";
    } else {
      $("#perfilPopup").classList.toggle("aberto");
    }
  };

  $$(".filtros button").forEach(btn => {
    btn.onclick = () => {
      $$(".filtros button").forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      categoria = btn.dataset.categoria;
      renderProdutos();
    };
  });

  if (pesquisa) pesquisa.oninput = renderProdutos;
  if ($("#limparPesquisa")) {
    $("#limparPesquisa").onclick = () => {
      pesquisa.value = "";
      renderProdutos();
    };
  }

  if ($("#bannerNext")) $("#bannerNext").onclick = () => banner(slide + 1);
  if ($("#bannerPrev")) $("#bannerPrev").onclick = () => banner(slide - 1);
  dots.forEach(dot => {
    dot.onclick = () => banner(Number(dot.dataset.slide));
  });
  setInterval(() => banner(slide + 1), 6000);

  if ($("#suporteForm")) {
    $("#suporteForm").onsubmit = e => {
      e.preventDefault();
      $("#suporteSucesso").textContent = "Mensagem registrada nesta demonstração. Obrigado!";
      e.target.reset();
    };
  }

  if ($("#formNewsletter")) {
    $("#formNewsletter").onsubmit = e => {
      e.preventDefault();
      $("#newsletterSucesso").textContent = "Inscrição realizada!";
      e.target.reset();
    };
  }

  atualizarUsuario();
  renderProdutos();
  renderCarrinho();
  renderFavoritos();
  atualizarContadores();
  banner(0);
});
