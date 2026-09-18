document.addEventListener("DOMContentLoaded", () => {

  const painelFundo = document.getElementById("painelFundo");
  const perfilBtn = document.getElementById("perfilBtn");
  const perfilPopup = document.getElementById("perfilPopup");

  const favoritosBtn = document.getElementById("favoritosBtn");
  const favoritosPainel = document.getElementById("favoritosPainel");
  const fecharFavoritos = document.getElementById("fecharFavoritos");

  const carrinhoBtn = document.getElementById("carrinhoBtn");
  const carrinhoPainel = document.getElementById("carrinhoPainel");
  const fecharCarrinho = document.getElementById("fecharCarrinho");

  const menuBtn = document.getElementById("menuBtn");
  const menuOverlay = document.getElementById("menuOverlay");
  const fecharMenu = document.getElementById("fecharMenu");

  const perfilLinks = document.getElementById("perfilLinks");

  const contadorCarrinho = document.getElementById("contadorCarrinho");
  const contadorFavoritos = document.getElementById("contadorFavoritos");

  const perfilTabs = document.querySelectorAll(".perfil-tab");
  const perfilPanels = document.querySelectorAll(".perfil-panel");

  const perfilForm = document.getElementById("perfilForm");
  const mensagemPerfil = document.getElementById("mensagemPerfil");

  const usuarioPerfil = document.getElementById("usuarioPerfil");
  const nomePerfil = document.getElementById("nomePerfil");
  const cpfPerfil = document.getElementById("cpfPerfil");
  const nascimentoPerfil = document.getElementById("nascimentoPerfil");
  const telefonePerfil = document.getElementById("telefonePerfil");
  const cepPerfil = document.getElementById("cepPerfil");

  const enderecoFormPerfil = document.getElementById("enderecoFormPerfil");
  const enderecoRuaPerfil = document.getElementById("enderecoRuaPerfil");
  const enderecoNumeroPerfil = document.getElementById("enderecoNumeroPerfil");
  const enderecoComplementoPerfil = document.getElementById("enderecoComplementoPerfil");
  const enderecoBairroPerfil = document.getElementById("enderecoBairroPerfil");
  const enderecoCidadePerfil = document.getElementById("enderecoCidadePerfil");
  const enderecoEstadoPerfil = document.getElementById("enderecoEstadoPerfil");
  const mensagemEnderecoPerfil = document.getElementById("mensagemEnderecoPerfil");

  const modalSenha = document.getElementById("modalSenha");
  const formAlterarSenha = document.getElementById("formAlterarSenha");
  const fecharModalSenha = document.getElementById("fecharModalSenha");
  const fecharModalSenhaBotao = document.getElementById("fecharModalSenhaBotao");
  const mensagemSenha = document.getElementById("mensagemSenha");

  // Se a página exige conta (tem o formulário de dados), garante que há login
  if (perfilForm && !JSON.parse(localStorage.getItem("usuarioLogado") || "null")) {
    alert("Você precisa estar logado para acessar seu perfil.");
    window.location.href = "../login/login.html";
    return;
  }

  const perfilNomeMenu = document.getElementById("perfilNomeMenu");
  const perfilSubMenu = document.getElementById("perfilSubMenu");

  const sairPerfil = document.getElementById("sairPerfil");

  let carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
  let favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

  function normalizarFavoritos(lista) {
    if (!Array.isArray(lista)) return [];
    return [...new Set(lista.map(item => {
      if (typeof item === "object" && item !== null) return Number(item.id);
      return Number(item);
    }).filter(Number.isFinite))];
  }

  favoritos = normalizarFavoritos(favoritos);

  if (!carrinho.length) {
    try {
      const antigo = JSON.parse(localStorage.getItem("laMatteCarrinho") || "[]");
      if (Array.isArray(antigo) && antigo.length) {
        carrinho = antigo;
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      }
    } catch {}
  }

  if (!favoritos.length) {
    try {
      const antigosFavoritos = JSON.parse(localStorage.getItem("laMatteFavoritos") || "[]");
      if (Array.isArray(antigosFavoritos) && antigosFavoritos.length) {
        favoritos = normalizarFavoritos(antigosFavoritos);
      }
    } catch {}
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  function fecharTodos() {
    perfilPopup?.classList.remove("aberto");
    favoritosPainel?.classList.remove("aberto");
    carrinhoPainel?.classList.remove("aberto");
    menuOverlay?.classList.remove("aberto");

    menuBtn?.classList.remove("active");

    painelFundo?.classList.remove("ativo");
    document.body.classList.remove("painel-aberto");
  }

  function abrirPainel(painel) {
    fecharTodos();

    painel?.classList.add("aberto");
    painelFundo?.classList.add("ativo");
    document.body.classList.add("painel-aberto");
  }


  perfilBtn?.addEventListener("click", event => {

    event.stopPropagation();

    if (perfilPopup.classList.contains("aberto")) {
      fecharTodos();
      return;
    }

    fecharTodos();

    perfilPopup.classList.add("aberto");

  });


  favoritosBtn?.addEventListener("click", () => {
    abrirPainel(favoritosPainel);
    renderFavoritos();
  });


  carrinhoBtn?.addEventListener("click", () => {
    abrirPainel(carrinhoPainel);
    renderCarrinho();
  });


  menuBtn?.addEventListener("click", () => {

    if (menuOverlay.classList.contains("aberto")) {
      fecharTodos();
      return;
    }

    abrirPainel(menuOverlay);
    menuBtn.classList.add("active");

  });


  fecharFavoritos?.addEventListener("click", fecharTodos);
  fecharCarrinho?.addEventListener("click", fecharTodos);
  fecharMenu?.addEventListener("click", fecharTodos);

  painelFundo?.addEventListener("click", fecharTodos);


  document.addEventListener("click", event => {

    if (
      perfilPopup?.classList.contains("aberto") &&
      !perfilPopup.contains(event.target) &&
      !perfilBtn.contains(event.target)
    ) {
      fecharTodos();
    }

  });


  document.querySelectorAll(".menu-links a").forEach(link => {

    link.addEventListener("click", () => {
      fecharTodos();
    });

  });


  perfilTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const painelId = tab.dataset.painel;

      perfilTabs.forEach(item => {
        item.classList.remove("ativo");
      });

      perfilPanels.forEach(panel => {
        panel.classList.remove("ativo");
      });

      tab.classList.add("ativo");

      const painel = document.getElementById(painelId);

      if (painel) {
        painel.classList.add("ativo");
      }

    });

  });


  function atualizarContadores() {

    if (contadorCarrinho) {
      contadorCarrinho.textContent = carrinho.reduce(
        (total, item) => total + (item.quantidade || 1),
        0
      );
    }

    if (contadorFavoritos) {
      contadorFavoritos.textContent = favoritos.length;
    }

  }


  function renderCarrinho() {

    const container = document.getElementById("carrinhoConteudo");
    const subtotal = document.getElementById("subtotalCarrinho");

    if (!container) return;

    if (!carrinho.length) {

      container.innerHTML = `
        <div class="vazio">
          <span>🛒</span>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos para vê-los aqui.</p>
        </div>
      `;

      if (subtotal) {
        subtotal.textContent = "R$ 0,00";
      }

      return;
    }

    let total = 0;

    container.innerHTML = carrinho.map((item, index) => {

      const quantidade = item.quantidade || 1;
      const preco = Number(item.preco || 0);
      const valor = preco * quantidade;

      total += valor;

      return `
        <div class="item-painel">

          <img src="${item.imagem || ""}" alt="${item.nome || "Produto"}">

          <div class="item-info">

            <h4>${item.nome || "Produto"}</h4>

            <strong>
              R$ ${preco.toFixed(2).replace(".", ",")}
            </strong>

            <div class="quantidade">

              <button data-action="diminuir" data-index="${index}">
                −
              </button>

              <span>${quantidade}</span>

              <button data-action="aumentar" data-index="${index}">
                +
              </button>

            </div>

          </div>

          <button class="remover" data-action="remover" data-index="${index}">
            ×
          </button>

        </div>
      `;

    }).join("");

    if (subtotal) {
      subtotal.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
    }

    container.querySelectorAll("[data-action]").forEach(button => {

      button.addEventListener("click", () => {

        const index = Number(button.dataset.index);
        const action = button.dataset.action;

        if (action === "aumentar") {
          carrinho[index].quantidade = (carrinho[index].quantidade || 1) + 1;
        }

        if (action === "diminuir") {

          carrinho[index].quantidade =
            (carrinho[index].quantidade || 1) - 1;

          if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
          }

        }

        if (action === "remover") {
          carrinho.splice(index, 1);
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        atualizarContadores();
        renderCarrinho();

      });

    });

  }


  function renderPedidos() {

    const container = document.getElementById("listaPedidos");

    if (!container) return;

    const usuario = getUsuarioLogado();

    if (!usuario) {
      container.innerHTML = "";
      return;
    }

    let pedidos = [];

    try {
      pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
    } catch {
      pedidos = [];
    }

    const identificador = String(usuario.usuario || usuario.email || "").trim().toLowerCase();

    pedidos = pedidos.filter(pedido => {
      const dono = String(pedido.usuario || pedido.email || "").trim().toLowerCase();
      return dono === identificador;
    }).sort((a, b) => {
      const da = new Date(a.dataISO || a.data || 0).getTime() || 0;
      const db = new Date(b.dataISO || b.data || 0).getTime() || 0;
      return db - da;
    });

    if (!pedidos.length) {
      container.innerHTML = `
        <div class="estado-vazio">
          <span>◎</span>
          <h3>Nenhum pedido ainda</h3>
          <p>Quando você realizar uma compra, seus pedidos aparecerão aqui.</p>
          <a href="../principal/index.html#produtos" class="btn-principal">
            Explorar produtos
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = pedidos.map(pedido => {

      const itens = Array.isArray(pedido.items) ? pedido.items : [];
      const total = Number(pedido.total || 0);
      const status = pedido.status || "pendente";
      const statusTexto = status === "pendente" ? "Pagamento pendente" : status;

      return `
        <article class="pedido-card">
          <div class="pedido-cabecalho">
            <div>
              <span class="pedido-label">PEDIDO</span>
              <h3>${pedido.id || "Pedido"}</h3>
              <p>${pedido.data || ""}</p>
            </div>
            <span class="pedido-status">${statusTexto}</span>
          </div>

          <div class="pedido-itens">
            ${itens.map(item => {
              const quantidade = Number(item.quantidade || 1);
              const preco = Number(item.preco || 0);
              return `
                <div class="pedido-item">
                  <img src="${item.imagem || ""}" alt="${item.nome || "Produto"}">
                  <div>
                    <strong>${item.nome || "Produto"}</strong>
                    <span>${quantidade} ${quantidade === 1 ? "unidade" : "unidades"}</span>
                  </div>
                  <b>R$ ${(preco * quantidade).toFixed(2).replace(".", ",")}</b>
                </div>
              `;
            }).join("")}
          </div>

          <div class="pedido-rodape">
            <span>${itens.length} ${itens.length === 1 ? "item" : "itens"}</span>
            <strong>Total: R$ ${total.toFixed(2).replace(".", ",")}</strong>
          </div>
        </article>
      `;

    }).join("");
  }


  function renderFavoritos() {
    const container = document.getElementById("favoritosConteudo");
    const perfilContainer = document.getElementById("perfilFavoritos");

    const lista = typeof produtos !== "undefined"
      ? produtos.filter(produto => favoritos.includes(produto.id))
      : [];

    if (!lista.length) {
      const vazio = `
        <div class="vazio">
          <span>♡</span>
          <h3>Nenhum favorito</h3>
          <p>Os produtos que você favoritar aparecerão aqui.</p>
        </div>
      `;

      if (container) container.innerHTML = vazio;
      if (perfilContainer) perfilContainer.innerHTML = vazio;
      return;
    }

    const html = lista.map(item => `
      <div class="item-painel">
        <img src="${item.imagem || ""}" alt="${item.nome || "Produto"}" loading="lazy">
        <div class="item-info">
          <h4>${item.nome || "Produto"}</h4>
          <strong>R$ ${Number(item.preco || 0).toFixed(2).replace(".", ",")}</strong>
          <a href="../produto/index.html?id=${item.id}" class="mini-link">Ver produto</a>
        </div>
        <button class="remover" data-remove-fav="${item.id}">×</button>
      </div>
    `).join("");

    if (container) container.innerHTML = html;
    if (perfilContainer) perfilContainer.innerHTML = html;

    document.querySelectorAll("[data-remove-fav]").forEach(button => {
      button.addEventListener("click", () => {
        const id = Number(button.dataset.removeFav);
        favoritos = favoritos.filter(item => Number(item) !== id);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        renderFavoritos();
        atualizarContadores();
      });
    });
  }


  function maskCpf(v) {
    return v.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function maskTelefone(v) {
    return v.replace(/\D/g, "").slice(0, 11)
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  }

  function maskCep(v) {
    return v.replace(/\D/g, "").slice(0, 8)
      .replace(/^(\d{5})(\d)/, "$1-$2");
  }

  cpfPerfil?.addEventListener("input", () => cpfPerfil.value = maskCpf(cpfPerfil.value));
  telefonePerfil?.addEventListener("input", () => telefonePerfil.value = maskTelefone(telefonePerfil.value));
  cepPerfil?.addEventListener("input", () => cepPerfil.value = maskCep(cepPerfil.value));


  function getUsuarioLogado() {
    try {
      return JSON.parse(localStorage.getItem("usuarioLogado") || "null");
    } catch {
      return null;
    }
  }


  function identificadorUsuario() {
    const dados = getUsuarioLogado();
    return String(dados?.usuario || dados?.email || "").trim().toLowerCase();
  }

  function chaveEndereco() {
    const id = identificadorUsuario();
    return id ? `laMatteEndereco_${encodeURIComponent(id)}` : "laMatteEndereco";
  }

  function obterEnderecoPerfil() {
    return {
      rua: enderecoRuaPerfil?.value.trim() || "",
      numero: enderecoNumeroPerfil?.value.trim() || "",
      complemento: enderecoComplementoPerfil?.value.trim() || "",
      bairro: enderecoBairroPerfil?.value.trim() || "",
      cidade: enderecoCidadePerfil?.value.trim() || "",
      estado: enderecoEstadoPerfil?.value.trim() || ""
    };
  }

  function carregarEnderecoPerfil() {
    let endereco = null;
    try {
      endereco = JSON.parse(localStorage.getItem(chaveEndereco()) || "null");
    } catch {}

    const dados = getUsuarioLogado();
    if (!endereco && dados?.endereco) endereco = dados.endereco;
    if (!endereco) return;

    if (enderecoRuaPerfil) enderecoRuaPerfil.value = endereco.rua || "";
    if (enderecoNumeroPerfil) enderecoNumeroPerfil.value = endereco.numero || "";
    if (enderecoComplementoPerfil) enderecoComplementoPerfil.value = endereco.complemento || "";
    if (enderecoBairroPerfil) enderecoBairroPerfil.value = endereco.bairro || "";
    if (enderecoCidadePerfil) enderecoCidadePerfil.value = endereco.cidade || "";
    if (enderecoEstadoPerfil) enderecoEstadoPerfil.value = endereco.estado || "";
  }

  function salvarEnderecoPerfil(endereco) {
    localStorage.setItem(chaveEndereco(), JSON.stringify(endereco));

    const usuario = getUsuarioLogado();
    if (!usuario) return;

    usuario.endereco = endereco;
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    let usuarios = [];
    try { usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]"); } catch { usuarios = []; }

    const id = identificadorUsuario();
    const index = usuarios.findIndex(u => String(u.usuario || u.email || "").trim().toLowerCase() === id);
    if (index >= 0) {
      usuarios[index] = { ...usuarios[index], endereco };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }

  function carregarPerfil() {

    const dados = getUsuarioLogado();

    if (usuarioPerfil) {
      usuarioPerfil.value = (dados && (dados.usuario || dados.email)) || "";
    }

    if (nomePerfil) {
      nomePerfil.value = (dados && dados.nomeCompleto) || "";
    }

    if (cpfPerfil) {
      cpfPerfil.value = (dados && dados.cpf) || "";
    }

    if (nascimentoPerfil) {
      nascimentoPerfil.value = (dados && dados.nascimento) || "";
    }

    if (telefonePerfil) {
      telefonePerfil.value = (dados && dados.telefone) || "";
    }

    if (cepPerfil) {
      cepPerfil.value = (dados && dados.cep) || "";
    }

    if (dados) {
      perfilNomeMenu.textContent = dados.nomeCompleto || dados.usuario;
      perfilSubMenu.textContent = dados.telefone || dados.email || "Minha conta";
    } else {
      perfilNomeMenu.textContent = "Visitante";
      perfilSubMenu.textContent = "Faça login para acessar sua conta";
    }

    atualizarLinksPerfil(dados);
    carregarEnderecoPerfil();

  }


  function atualizarLinksPerfil(dados) {

    if (!perfilLinks) return;

    if (dados) {

      perfilLinks.innerHTML = `
        <a href="index.html">
          Minha conta
          <span>›</span>
        </a>

        <button type="button" id="menuSair">
          Sair
          <span>›</span>
        </button>
      `;

      document.getElementById("menuSair")?.addEventListener(
        "click",
        sairDaConta
      );

    } else {

      perfilLinks.innerHTML = `
        <a href="../login/login.html">
          Entrar
          <span>›</span>
        </a>

        <a href="../cadastro/cadastro.html">
          Criar conta
          <span>›</span>
        </a>
      `;

    }

  }


  function sairDaConta() {

    localStorage.removeItem("usuarioLogado");

    if (perfilForm) {
      window.location.href = "../login/login.html";
      return;
    }

    carregarPerfil();

    mensagemPerfil.textContent =
      "Você saiu da sua conta.";

    fecharTodos();

  }


  perfilForm?.addEventListener("submit", event => {

    event.preventDefault();

    let usuarioLogado = getUsuarioLogado();

    if (!usuarioLogado) {
      window.location.href = "../login/login.html";
      return;
    }

    usuarioLogado.nomeCompleto = nomePerfil.value.trim();
    usuarioLogado.cpf = cpfPerfil.value.trim();
    usuarioLogado.nascimento = nascimentoPerfil.value;
    usuarioLogado.telefone = telefonePerfil.value.trim();
    usuarioLogado.cep = cepPerfil.value.trim();

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const index = usuarios.findIndex(u => u.usuario === usuarioLogado.usuario);

    if (index >= 0) {
      usuarios[index] = usuarioLogado;
    } else {
      usuarios.push(usuarioLogado);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

    mensagemPerfil.textContent =
      "Dados atualizados com sucesso.";

    carregarPerfil();

  });


  enderecoFormPerfil?.addEventListener("submit", event => {
    event.preventDefault();

    const endereco = obterEnderecoPerfil();
    if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      if (mensagemEnderecoPerfil) {
        mensagemEnderecoPerfil.textContent = "Preencha rua, número, bairro, cidade e estado.";
        mensagemEnderecoPerfil.classList.add("erro");
      }
      return;
    }

    salvarEnderecoPerfil(endereco);

    if (mensagemEnderecoPerfil) {
      mensagemEnderecoPerfil.textContent = "Endereço salvo com sucesso. Ele será preenchido automaticamente no checkout.";
      mensagemEnderecoPerfil.classList.remove("erro");
    }
  });

  sairPerfil?.addEventListener("click", sairDaConta);


  function abrirModalSenha() {
    if (!modalSenha) return;
    modalSenha.classList.add("aberto");
    modalSenha.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
    document.getElementById("senhaAtual")?.focus();
  }

  function fecharModalSenhaFuncao() {
    if (!modalSenha) return;
    modalSenha.classList.remove("aberto");
    modalSenha.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
    formAlterarSenha?.reset();
    if (mensagemSenha) mensagemSenha.textContent = "";
  }

  document.getElementById("alterarSenha")?.addEventListener("click", abrirModalSenha);
  fecharModalSenha?.addEventListener("click", fecharModalSenhaFuncao);
  fecharModalSenhaBotao?.addEventListener("click", fecharModalSenhaFuncao);

  formAlterarSenha?.addEventListener("submit", event => {
    event.preventDefault();

    const usuario = getUsuarioLogado();
    const atual = document.getElementById("senhaAtual")?.value || "";
    const nova = document.getElementById("novaSenha")?.value || "";
    const confirmacao = document.getElementById("confirmarNovaSenha")?.value || "";

    if (!usuario) return;

    if (!usuario.senha || atual !== usuario.senha) {
      mensagemSenha.textContent = "A senha atual está incorreta.";
      mensagemSenha.className = "mensagem-senha erro";
      return;
    }

    if (nova.length < 6) {
      mensagemSenha.textContent = "A nova senha precisa ter pelo menos 6 caracteres.";
      mensagemSenha.className = "mensagem-senha erro";
      return;
    }

    if (nova !== confirmacao) {
      mensagemSenha.textContent = "As novas senhas não coincidem.";
      mensagemSenha.className = "mensagem-senha erro";
      return;
    }

    let usuarios = [];
    try { usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]"); } catch { usuarios = []; }

    const id = identificadorUsuario();
    const index = usuarios.findIndex(u => String(u.usuario || u.email || "").trim().toLowerCase() === id);

    usuario.senha = nova;
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    if (index >= 0) {
      usuarios[index] = { ...usuarios[index], senha: nova };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    mensagemSenha.textContent = "Senha alterada com sucesso.";
    mensagemSenha.className = "mensagem-senha sucesso";

    setTimeout(fecharModalSenhaFuncao, 900);
  });


  document.getElementById("formNewsletter")?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const mensagem =
        document.getElementById("newsletterSucesso");

      if (mensagem) {
        mensagem.textContent =
          "Inscrição realizada com sucesso!";
      }

      event.target.reset();

    }
  );


  const parametros = new URLSearchParams(window.location.search);
  if (parametros.get("aba") === "pedidos") {
    const abaPedidos = document.querySelector('.perfil-tab[data-painel="pedidos"]');
    abaPedidos?.click();
  }

  atualizarContadores();
  carregarPerfil();
  renderPedidos();
  renderCarrinho();
  renderFavoritos();

});
