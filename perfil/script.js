document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const mask = (el, fn) => {
    if (el) {
      el.addEventListener("input", () => {
        el.value = fn(el.value);
      });
    }
  };

  mask($("#campoCpf"), v => {
    v = v.replace(/\D/g, "").slice(0, 11);
    return v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  mask($("#campoTelefone"), v => {
    v = v.replace(/\D/g, "").slice(0, 11);
    return v
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  });

  mask($("#campoCep"), v => {
    v = v.replace(/\D/g, "").slice(0, 8);
    return v.replace(/^(\d{5})(\d)/, "$1-$2");
  });

  let usuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado") || "null"
  );

  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar seu perfil.");
    window.location.href = "../login/login.html";
    return;
  }

  function carregarHeader() {
    const inicial = (
      usuarioLogado.nomeCompleto ||
      usuarioLogado.usuario ||
      "U"
    )
      .charAt(0)
      .toUpperCase();

    $("#avatarBox").textContent = inicial;
    $("#heroNome").textContent =
      usuarioLogado.nomeCompleto || usuarioLogado.usuario;

    $("#heroUsuario").textContent =
      "@" + (usuarioLogado.usuario || "usuario");

    if (usuarioLogado.googleId) {
      $("#heroBadge").textContent = "Conectado via Google";
      $("#heroBadge").style.background = "#e8f0fe";
      $("#heroBadge").style.color = "#1a73e8";
    }
  }

  function preencherDados() {
    $("#campoUsuario").value = usuarioLogado.usuario || "";
    $("#campoNomeCompleto").value = usuarioLogado.nomeCompleto || "";
    $("#campoCpf").value = usuarioLogado.cpf || "";
    $("#campoNascimento").value = usuarioLogado.nascimento || "";
    $("#campoTelefone").value = usuarioLogado.telefone || "";
    $("#campoCep").value = usuarioLogado.cep || "";
    $("#campoSenha").value = usuarioLogado.senha || "";
  }

  let senhaVisivel = false;

  $("#btnMostrarSenha").onclick = e => {
    e.preventDefault();

    senhaVisivel = !senhaVisivel;

    if (senhaVisivel) {
      $("#campoSenha").type = "text";
      $("#btnMostrarSenha").textContent = "🙈";
    } else {
      $("#campoSenha").type = "password";
      $("#btnMostrarSenha").textContent = "👁️";
    }
  };

  const abas = $$(".aba-item");
  const paineis = $$(".painel-aba");

  abas.forEach(btn => {
    btn.addEventListener("click", () => {
      const abaId = "aba-" + btn.dataset.aba;
      const painelNovo = $("#" + abaId);

      if (!painelNovo) return;

      abas.forEach(b => b.classList.remove("ativa"));

      paineis.forEach(painel => {
        painel.classList.remove("ativo");
      });

      btn.classList.add("ativa");

      requestAnimationFrame(() => {
        painelNovo.classList.add("ativo");
      });

      window.scrollTo({
        top: document.querySelector(".layout-dashboard").offsetTop - 25,
        behavior: "smooth"
      });
    });
  });

  $("#formDadosPessoais").onsubmit = e => {
    e.preventDefault();

    const msg = $("#msgFeedbackDados");

    let usuarios = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    );

    const usuarioAntigo = usuarioLogado.usuario;

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

    msg.className = "msg-feedback";

    setTimeout(() => {
      msg.textContent = "";
    }, 3500);
  };

  $("#formEndereco").onsubmit = e => {
    e.preventDefault();

    const msg = $("#msgFeedbackEnd");

    msg.textContent =
      "Endereço principal salvo!";

    msg.className = "msg-feedback";

    setTimeout(() => {
      msg.textContent = "";
    }, 3500);
  };

  $("#formSenha").onsubmit = e => {
    e.preventDefault();

    const msg = $("#msgFeedbackSenha");

    const atual = $("#senhaAtual").value;
    const nova = $("#novaSenha").value;
    const conf = $("#confNovaSenha").value;

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

    if (nova !== conf) {
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

    const index = usuarios.findIndex(
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
  };

  function carregarPedidos() {
    const box = $("#containerPedidos");

    box.innerHTML = `
      <div class="card-pedido">
        <div class="cabecalho-pedido">
          <div>
            <strong>Pedido #LM-2026-8921</strong><br>
            <span>Realizado em: 12/09/2026</span>
          </div>
          <span class="status-badge transporte">Em Transporte</span>
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
            <strong>Pedido #LM-2026-4410</strong><br>
            <span>Realizado em: 28/08/2026</span>
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

  function carregarFavoritosPerfil() {
    const box = $("#containerFavoritosPerfil");

    const favs = JSON.parse(
      localStorage.getItem("favoritos") || "[]"
    );

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

    const lista = produtos.filter(
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

    box.innerHTML = lista
      .map(
        p => `
          <div class="mini-card-fav">
            <img src="${p.imagem}" alt="${p.nome}">
            <h4>${p.nome}</h4>
            <strong>
              R$ ${p.preco.toFixed(2).replace(".", ",")}
            </strong>
            <a
              href="../produto/index.html?id=${p.id}"
              class="btn-ver-fav"
            >
              Ver Produto
            </a>
          </div>
        `
      )
      .join("");
  }

  function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href =
      "../principal/index.html";
  }

  $("#btnSairTopo").onclick = logout;
  $("#btnSairHero").onclick = logout;

  carregarHeader();
  preencherDados();
  carregarPedidos();
  carregarFavoritosPerfil();
});
