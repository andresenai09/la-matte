document.addEventListener("DOMContentLoaded", () => {

  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);


  /* USUÁRIO */

  let usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar seu perfil.");
    window.location.href = "../login/login.html";
    return;
  }


  /* ELEMENTOS */

  const fundo = $("#fundoPaineis");
  const perfilBtn = $("#perfilBtn");
  const perfilPopup = $("#perfilPopup");

  const favoritosBtn = $("#favoritosBtn");
  const carrinhoBtn = $("#carrinhoBtn");
  const menuBtn = $("#menuBtn");

  const carrinhoPainel = $("#carrinhoPainel");
  const favoritosPainel = $("#favoritosPainel");
  const menuOverlay = $("#menuOverlay");


  /* HEADER */

  function carregarHeader() {

    const inicial = (
      usuarioLogado.nomeCompleto ||
      usuarioLogado.usuario ||
      "U"
    ).charAt(0).toUpperCase();

    $("#avatarBox").textContent = inicial;

    $("#heroNome").textContent =
      usuarioLogado.nomeCompleto ||
      usuarioLogado.usuario ||
      "Usuário";

    $("#heroUsuario").textContent =
      "@" + (usuarioLogado.usuario || "usuario");

    $("#perfilNomeMenu").textContent =
      usuarioLogado.nomeCompleto ||
      usuarioLogado.usuario ||
      "Meu Perfil";

    $("#perfilSubMenu").textContent =
      usuarioLogado.googleId
        ? "Conectado via Google"
        : "Conta La Matte";

    if (usuarioLogado.googleId) {

      $("#heroBadge").textContent = "Conectado via Google";
      $("#heroBadge").style.background = "#e8f0fe";
      $("#heroBadge").style.color = "#1a73e8";

    }

  }


  /* PAINÉIS */

  function fecharTodosPaineis() {

    carrinhoPainel.classList.remove("aberto");
    favoritosPainel.classList.remove("aberto");
    menuOverlay.classList.remove("aberto");

    fundo.classList.remove("aberto");

    menuBtn.classList.remove("aberto");

  }


  function abrirPainel(painel) {

    fecharTodosPaineis();

    setTimeout(() => {

      painel.classList.add("aberto");
      fundo.classList.add("aberto");

    }, 10);

  }


  fundo.addEventListener("click", () => {
    fecharTodosPaineis();
  });


  /* PERFIL POPUP */

  perfilBtn.addEventListener("click", e => {

    e.stopPropagation();

    fecharTodosPaineis();

    perfilPopup.classList.toggle("aberto");

  });


  document.addEventListener("click", e => {

    if (
      perfilPopup.classList.contains("aberto") &&
      !perfilPopup.contains(e.target) &&
      !perfilBtn.contains(e.target)
    ) {

      perfilPopup.classList.remove("aberto");

    }

  });


  /* ABRIR PERFIL */

  $("#abrirPerfilBtn").addEventListener("click", () => {

    perfilPopup.classList.remove("aberto");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* ABRIR FAVORITOS PELA JANELA DE PERFIL */

  $("#abrirFavoritosPerfilBtn").addEventListener("click", () => {

    perfilPopup.classList.remove("aberto");

    trocarAba("favoritos");

    window.scrollTo({
      top: document.querySelector(".conteudo-perfil").offsetTop - 100,
      behavior: "smooth"
    });

  });


  /* FAVORITOS */

  favoritosBtn.addEventListener("click", () => {

    perfilPopup.classList.remove("aberto");

    atualizarFavoritosPainel();

    abrirPainel(favoritosPainel);

  });


  /* CARRINHO */

  carrinhoBtn.addEventListener("click", () => {

    perfilPopup.classList.remove("aberto");

    atualizarCarrinhoPainel();

    abrirPainel(carrinhoPainel);

  });


  /* MENU */

  menuBtn.addEventListener("click", () => {

    perfilPopup.classList.remove("aberto");

    if (menuOverlay.classList.contains("aberto")) {

      fecharTodosPaineis();

    } else {

      abrirPainel(menuOverlay);

    }

  });


  $("#fecharCarrinho").addEventListener(
    "click",
    fecharTodosPaineis
  );

  $("#fecharFavoritos").addEventListener(
    "click",
    fecharTodosPaineis
  );

  $("#fecharMenu").addEventListener(
    "click",
    fecharTodosPaineis
  );


  /* MÁSCARAS */

  function aplicarMascara(el, fn) {

    if (!el) return;

    el.addEventListener("input", () => {

      el.value = fn(el.value);

    });

  }


  aplicarMascara(
    $("#campoCpf"),
    valor => {

      valor = valor
        .replace(/\D/g, "")
        .slice(0, 11);

      return valor
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    }
  );


  aplicarMascara(
    $("#campoTelefone"),
    valor => {

      valor = valor
        .replace(/\D/g, "")
        .slice(0, 11);

      return valor
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");

    }
  );


  aplicarMascara(
    $("#campoCep"),
    valor => {

      valor = valor
        .replace(/\D/g, "")
        .slice(0, 8);

      return valor
        .replace(/^(\d{5})(\d)/, "$1-$2");

    }
  );


  /* PREENCHER DADOS */

  function preencherDados() {

    $("#campoUsuario").value =
      usuarioLogado.usuario || "";

    $("#campoNomeCompleto").value =
      usuarioLogado.nomeCompleto || "";

    $("#campoCpf").value =
      usuarioLogado.cpf || "";

    $("#campoNascimento").value =
      usuarioLogado.nascimento || "";

    $("#campoTelefone").value =
      usuarioLogado.telefone || "";

    $("#campoCep").value =
      usuarioLogado.cep || "";

    $("#campoSenha").value =
      usuarioLogado.senha || "";

  }


  /* MOSTRAR SENHA */

  let senhaVisivel = false;

  $("#btnMostrarSenha").addEventListener(
    "click",
    e => {

      e.preventDefault();

      senhaVisivel = !senhaVisivel;

      $("#campoSenha").type =
        senhaVisivel
          ? "text"
          : "password";

      $("#btnMostrarSenha").textContent =
        senhaVisivel
          ? "🙈"
          : "👁️";

    }
  );


  /* TROCA DE ABAS */

  function trocarAba(nome) {

    $$(".aba-item").forEach(btn => {

      btn.classList.toggle(
        "ativa",
        btn.dataset.aba === nome
      );

    });

    $$(".painel-aba").forEach(painel => {

      painel.classList.toggle(
        "ativo",
        painel.id === "aba-" + nome
      );

    });

    if (nome === "favoritos") {
      carregarFavoritosPerfil();
    }

  }


  $$(".aba-item").forEach(btn => {

    btn.addEventListener("click", () => {

      trocarAba(btn.dataset.aba);

    });

  });


  /* SALVAR DADOS */

  $("#formDadosPessoais").addEventListener(
    "submit",
    e => {

      e.preventDefault();

      const msg = $("#msgFeedbackDados");

      let usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      const usuarioAntigo =
        usuarioLogado.usuario;

      usuarioLogado.usuario =
        $("#campoUsuario").value.trim();

      usuarioLogado.nomeCompleto =
        $("#campoNomeCompleto").value.trim();

      usuarioLogado.cpf =
        $("#campoCpf").value.trim();

      usuarioLogado.nascimento =
        $("#campoNascimento").value;

      usuarioLogado.telefone =
        $("#campoTelefone").value.trim();

      usuarioLogado.cep =
        $("#campoCep").value.trim();


      const index = usuarios.findIndex(
        u => u.usuario === usuarioAntigo
      );


      if (index >= 0) {

        usuarios[index] = usuarioLogado;

      } else {

        usuarios.push(usuarioLogado);

      }


      localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
      );

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      );


      carregarHeader();

      msg.textContent =
        "Dados atualizados com sucesso!";

      msg.className =
        "msg-feedback";


      setTimeout(() => {

        msg.textContent = "";

      }, 3500);

    }
  );


  /* ENDEREÇO */

  $("#formEndereco").addEventListener(
    "submit",
    e => {

      e.preventDefault();

      usuarioLogado.endereco = {

        rua: $("#endRua").value.trim(),
        numero: $("#endNumero").value.trim(),
        complemento: $("#endComplemento").value.trim(),
        bairro: $("#endBairro").value.trim(),
        cidade: $("#endCidade").value.trim()

      };


      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      );


      const msg =
        $("#msgFeedbackEnd");

      msg.textContent =
        "Endereço principal salvo!";

      setTimeout(() => {

        msg.textContent = "";

      }, 3500);

    }
  );


  /* CARREGAR ENDEREÇO */

  function carregarEndereco() {

    const endereco =
      usuarioLogado.endereco || {};

    $("#endRua").value =
      endereco.rua || "";

    $("#endNumero").value =
      endereco.numero || "";

    $("#endComplemento").value =
      endereco.complemento || "";

    $("#endBairro").value =
      endereco.bairro || "";

    $("#endCidade").value =
      endereco.cidade || "";

  }


  /* ALTERAR SENHA */

  $("#formSenha").addEventListener(
    "submit",
    e => {

      e.preventDefault();

      const msg =
        $("#msgFeedbackSenha");

      const atual =
        $("#senhaAtual").value;

      const nova =
        $("#novaSenha").value;

      const confirmacao =
        $("#confNovaSenha").value;


      if (atual !== usuarioLogado.senha) {

        msg.textContent =
          "A senha atual está incorreta.";

        msg.className =
          "msg-feedback erro";

        return;

      }


      if (nova.length < 6) {

        msg.textContent =
          "A nova senha deve ter no mínimo 6 caracteres.";

        msg.className =
          "msg-feedback erro";

        return;

      }


      if (nova !== confirmacao) {

        msg.textContent =
          "As senhas não coincidem.";

        msg.className =
          "msg-feedback erro";

        return;

      }


      usuarioLogado.senha = nova;


      let usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );


      const index =
        usuarios.findIndex(
          u => u.usuario === usuarioLogado.usuario
        );


      if (index >= 0) {

        usuarios[index].senha = nova;

      }


      localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
      );

      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
      );


      $("#campoSenha").value = nova;


      msg.textContent =
        "Senha alterada com sucesso!";

      msg.className =
        "msg-feedback";


      e.target.reset();


      setTimeout(() => {

        msg.textContent = "";

      }, 3500);

    }
  );


  /* PEDIDOS */

  function carregarPedidos() {

    const box =
      $("#containerPedidos");

    box.innerHTML = `

      <div class="card-pedido">

        <div class="cabecalho-pedido">

          <div>

            <strong>
              Pedido #LM-2026-8921
            </strong>

            <br>

            <span>
              Realizado em: 12/09/2026
            </span>

          </div>

          <span class="status-badge transporte">
            Em Transporte
          </span>

        </div>

        <div class="itens-pedido">

          • 1x Erva-Mate Tradicional Barão a Vácuo 500g<br>
          • 1x Bomba de Inox Torcida para Chimarrão com Rosca

        </div>

        <div class="total-pedido">
          Total: R$ 63,90
        </div>

      </div>


      <div class="card-pedido">

        <div class="cabecalho-pedido">

          <div>

            <strong>
              Pedido #LM-2026-4410
            </strong>

            <br>

            <span>
              Realizado em: 28/08/2026
            </span>

          </div>

          <span class="status-badge entregue">
            Entregue
          </span>

        </div>

        <div class="itens-pedido">

          • 2x Erva-Mate para Tereré Trots Boldo e Menta 500g<br>
          • 1x Guampa de Chifre de Boi Artesanal

        </div>

        <div class="total-pedido">
          Total: R$ 84,70
        </div>

      </div>

    `;

  }


  /* FAVORITOS */

  function obterFavoritos() {

    return JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

  }


  function atualizarContadorFavoritos() {

    const favoritos =
      obterFavoritos();

    $("#contadorFavoritos").textContent =
      favoritos.length;

  }


  function carregarFavoritosPerfil() {

    const box =
      $("#containerFavoritosPerfil");

    const favs =
      obterFavoritos();


    if (
      typeof produtos === "undefined" ||
      !favs.length
    ) {

      box.innerHTML = `
        <p style="color:#777;grid-column:1/-1;">
          Você ainda não possui produtos favoritados.
        </p>
      `;

      return;

    }


    const lista =
      produtos.filter(
        p => favs.includes(p.id)
      );


    if (!lista.length) {

      box.innerHTML = `
        <p style="color:#777;grid-column:1/-1;">
          Você ainda não possui produtos favoritados.
        </p>
      `;

      return;

    }


    box.innerHTML =
      lista.map(p => `

        <div class="mini-card-fav">

          <img
            src="${p.imagem}"
            alt="${p.nome}"
          >

          <h4>
            ${p.nome}
          </h4>

          <strong>
            R$ ${Number(p.preco)
              .toFixed(2)
              .replace(".", ",")}
          </strong>

          <a
            href="../produto/index.html?id=${p.id}"
            class="btn-ver-fav"
          >
            Ver Produto
          </a>

        </div>

      `).join("");

  }


  /* FAVORITOS PAINEL */

  function atualizarFavoritosPainel() {

    const box =
      $("#favoritosConteudo");

    const favs =
      obterFavoritos();


    if (
      typeof produtos === "undefined" ||
      !favs.length
    ) {

      box.innerHTML = `
        <p style="color:#777;">
          Você ainda não possui produtos favoritos.
        </p>
      `;

      atualizarContadorFavoritos();

      return;

    }


    const lista =
      produtos.filter(
        p => favs.includes(p.id)
      );


    if (!lista.length) {

      box.innerHTML = `
        <p style="color:#777;">
          Você ainda não possui produtos favoritos.
        </p>
      `;

      return;

    }


    box.innerHTML =
      lista.map(p => `

        <div class="item-painel">

          <img
            src="${p.imagem}"
            alt="${p.nome}"
          >

          <div class="item-painel-info">

            <h4>
              ${p.nome}
            </h4>

            <strong>
              R$ ${Number(p.preco)
                .toFixed(2)
                .replace(".", ",")}
            </strong>

          </div>

          <a
            href="../produto/index.html?id=${p.id}"
            class="btn-ver-fav"
          >
            Ver
          </a>

        </div>

      `).join("");

    atualizarContadorFavoritos();

  }


  /* CARRINHO */

  function obterCarrinho() {

    return JSON.parse(
      localStorage.getItem("carrinho") || "[]"
    );

  }


  function atualizarContadorCarrinho() {

    const carrinho =
      obterCarrinho();

    const quantidade =
      carrinho.reduce(
        (total, item) =>
          total + Number(item.quantidade || 1),
        0
      );

    $("#contadorCarrinho").textContent =
      quantidade;

  }


  function atualizarCarrinhoPainel() {

    const box =
      $("#carrinhoConteudo");

    const carrinho =
      obterCarrinho();


    if (!carrinho.length) {

      box.innerHTML = `
        <div style="text-align:center;padding:40px 10px;color:#777;">
          <div style="font-size:42px;margin-bottom:15px;">
            🛒
          </div>

          <p>
            Seu carrinho está vazio.
          </p>
        </div>
      `;

      $("#subtotalCarrinho").textContent =
        "R$ 0,00";

      atualizarContadorCarrinho();

      return;

    }


    let subtotal = 0;


    box.innerHTML =
      carrinho.map((item, index) => {

        const quantidade =
          Number(item.quantidade || 1);

        const preco =
          Number(item.preco || 0);

        subtotal +=
          preco * quantidade;


        return `

          <div class="item-painel">

            <img
              src="${item.imagem || ""}"
              alt="${item.nome || "Produto"}"
            >

            <div class="item-painel-info">

              <h4>
                ${item.nome || "Produto"}
              </h4>

              <span>
                Quantidade: ${quantidade}
              </span>

              <strong>
                R$ ${(preco * quantidade)
                  .toFixed(2)
                  .replace(".", ",")}
              </strong>

            </div>

            <button
              class="btn-remover-painel"
              data-index="${index}"
              title="Remover"
            >
              ×
            </button>

          </div>

        `;

      }).join("");


    $("#subtotalCarrinho").textContent =
      "R$ " +
      subtotal
        .toFixed(2)
        .replace(".", ",");


    $$(".btn-remover-painel").forEach(btn => {

      btn.addEventListener("click", () => {

        const index =
          Number(btn.dataset.index);

        const novoCarrinho =
          obterCarrinho();

        novoCarrinho.splice(index, 1);

        localStorage.setItem(
          "carrinho",
          JSON.stringify(novoCarrinho)
        );

        atualizarCarrinhoPainel();

      });

    });


    atualizarContadorCarrinho();

  }


  /* SAIR */

  function logout() {

    localStorage.removeItem(
      "usuarioLogado"
    );

    window.location.href =
      "../principal/index.html";

  }


  $("#btnSairHero").addEventListener(
    "click",
    logout
  );

  $("#btnSairPopup").addEventListener(
    "click",
    logout
  );


  /* INICIALIZAÇÃO */

  carregarHeader();

  preencherDados();

  carregarEndereco();

  carregarPedidos();

  carregarFavoritosPerfil();

  atualizarFavoritosPainel();

  atualizarContadorFavoritos();

  atualizarContadorCarrinho();

});
