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

  $("#google").onclick = () => {
    const u = {
      usuario: "usuario_google",
      nomeCompleto: "Usuário Google",
      cpf: "111.222.333-44",
      nascimento: "1998-05-15",
      telefone: "(11) 98888-7777",
      cep: "01000-000",
      senha: "google_auth_pass"
    };

    const list = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (!list.some((x) => x.usuario === u.usuario)) {
      list.push(u);
    }

    localStorage.setItem("usuarios", JSON.stringify(list));
    localStorage.setItem("usuarioLogado", JSON.stringify(u));
    location.href = "../principal/index.html";
  };
});