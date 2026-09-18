document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);

  let usuarios;

  try {
    usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  } catch {
    usuarios = [];
  }

  if (!usuarios.length) {
    usuarios = [
      {
        usuario: "admin",
        senha: "1234",
        nomeCompleto: "Administrador",
        cpf: "000.000.000-00",
        nascimento: "1990-01-01",
        telefone: "(11) 99999-9999",
        cep: "01001-000"
      }
    ];

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  $("#formLogin").onsubmit = (e) => {
    e.preventDefault();

    $("#erroUser").textContent = "";
    $("#erroSenha").textContent = "";
    $("#mensagem").textContent = "";

    const u = $("#user").value.trim();
    const s = $("#senha").value;
    let erro = false;

    if (!u) {
      $("#erroUser").textContent = "Informe seu usuário.";
      erro = true;
    }

    if (!s) {
      $("#erroSenha").textContent = "Informe sua senha.";
      erro = true;
    }

    if (erro) return;

    const encontrado = usuarios.find(
      (x) => (x.usuario === u || x.telefone === u) && x.senha === s
    );

    if (!encontrado) {
      $("#mensagem").textContent = "Usuário ou senha incorretos.";
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(encontrado));
    location.href = "../principal/index.html";
  };

  function decodificarJWT(token) {
    const partes = token.split(".");

    if (partes.length !== 3) {
      throw new Error("Token do Google inválido.");
    }

    const base64 = partes[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(json);
  }

  window.handleGoogleLogin = (response) => {
    try {
      $("#erroGoogle").textContent = "";

      const dados = decodificarJWT(response.credential);

      const nome = dados.name || "Usuário Google";
      const email = dados.email || "";
      const foto = dados.picture || "";
      const idGoogle = dados.sub || "";

      if (!email || !idGoogle) {
        throw new Error("Não foi possível obter os dados da conta Google.");
      }

      let lista = [];

      try {
        lista = JSON.parse(localStorage.getItem("usuarios")) || [];
      } catch {
        lista = [];
      }

      const existente = lista.find(
        (x) => x.googleId === idGoogle || x.email === email
      );

      if (existente) {
        // Usuário já existe: atualiza só nome/foto do Google, sem apagar
        // os dados (CPF, nascimento, telefone, CEP, senha) já preenchidos.
        existente.usuario = existente.usuario || email;
        existente.email = email;
        existente.nomeCompleto = existente.nomeCompleto || nome;
        existente.foto = foto;
        existente.googleId = idGoogle;

        localStorage.setItem(
          "usuarioLogado",
          JSON.stringify(existente)
        );

        location.href = "../principal/index.html";
      } else {
        // Novo usuário - armazena temporariamente e pede para completar o cadastro
        const usuarioGoogle = {
          usuario: email,
          email: email,
          nomeCompleto: nome,
          foto: foto,
          googleId: idGoogle,
          cpf: "",
          nascimento: "",
          telefone: "",
          cep: "",
          senha: "" // definida na etapa de completar cadastro
        };

        sessionStorage.setItem("usuarioGoogle", JSON.stringify(usuarioGoogle));
        location.href = "./definir-senha.html";
      }

    } catch (erro) {
      console.error(erro);
      $("#erroGoogle").textContent =
        "Não foi possível entrar com o Google.";
    }
  };

  function iniciarGoogle() {
    if (
      !window.google ||
      !google.accounts ||
      !google.accounts.id
    ) {
      setTimeout(iniciarGoogle, 300);
      return;
    }

    google.accounts.id.initialize({
      client_id:
        "788044762044-kafe2e8p0qqrf3aqcr52ha1vmtv831mu.apps.googleusercontent.com",

      callback: handleGoogleLogin
    });

    google.accounts.id.renderButton(
      $("#googleButton"),
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "pill",
        width: 350,
        logo_alignment: "left"
      }
    );
  }

  iniciarGoogle();
});
