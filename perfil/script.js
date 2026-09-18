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

  // Se a página exige conta (tem o formulário de dados), garante que há login
  if (perfilForm && !JSON.parse(localStorage.getItem("usuarioLogado") || "null")) {
    alert("Você precisa estar logado para acessar seu perfil.");
    window.location.href = "../login/login.html";
    return;
  }

  const perfilNomeMenu = document.getElementById("perfilNomeMenu");
  const perfilSubMenu = document.getElementById("perfilSubMenu");

  const sairPerfil = document.getElementById("sairPerfil");

  let carrinho = JSON.parse(localStorage.getItem("laMatteCarrinho") || "[]");
  let favoritos = JSON.parse(localStorage.getItem("laMatteFavoritos") || "[]");

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

        localStorage.setItem(
          "laMatteCarrinho",
          JSON.stringify(carrinho)
        );

        atualizarContadores();
        renderCarrinho();

      });

    });

  }


  function renderFavoritos() {

    const container = document.getElementById("favoritosConteudo");
    const perfilContainer = document.getElementById("perfilFavoritos");

    if (!favoritos.length) {

      const vazio = `
        <div class="vazio">
          <span>♡</span>
          <h3>Nenhum favorito</h3>
          <p>Os produtos que você favoritar aparecerão aqui.</p>
        </div>
      `;

      if (container) {
        container.innerHTML = vazio;
      }

      if (perfilContainer) {
        perfilContainer.innerHTML = vazio;
      }

      return;
    }

    const html = favoritos.map(item => {

      return `
        <div class="item-painel">

          <img src="${item.imagem || ""}" alt="${item.nome || "Produto"}">

          <div class="item-info">

            <h4>${item.nome || "Produto"}</h4>

            <strong>
              R$ ${Number(item.preco || 0).toFixed(2).replace(".", ",")}
            </strong>

          </div>

        </div>
      `;

    }).join("");

    if (container) {
      container.innerHTML = html;
    }

    if (perfilContainer) {
      perfilContainer.innerHTML = html;
    }

  }


  // Máscaras (iguais às usadas no cadastro)
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


  sairPerfil?.addEventListener("click", sairDaConta);


  document.getElementById("alterarSenha")?.addEventListener(
    "click",
    () => {
      alert("Entra na sua conta para alterar a senha.");
    }
  );


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


  atualizarContadores();
  carregarPerfil();
  renderCarrinho();
  renderFavoritos();

});
