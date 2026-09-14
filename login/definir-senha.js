document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s);

  // Recupera dados do usuário Google da sessionStorage (temporário)
  let usuarioGoogle = JSON.parse(sessionStorage.getItem("usuarioGoogle") || "null");

  // Se não houver dados, redireciona para login
  if (!usuarioGoogle) {
    alert("Sessão expirada. Por favor, faça login novamente.");
    window.location.href = "./login.html";
    return;
  }

  // Preenche o nome e email na página
  $("#nomeGoogle").textContent = usuarioGoogle.nomeCompleto || "Usuário Google";
  $("#emailGoogle").textContent = usuarioGoogle.email || "";

  // Validação e envio do formulário
  $("#formDefinirSenha").onsubmit = (e) => {
    e.preventDefault();

    $("#erroSenha1").textContent = "";
    $("#erroSenha2").textContent = "";
    $("#mensagem").textContent = "";

    const novaSenha = $("#novaSenha").value;
    const confirmSenha = $("#confirmSenha").value;
    let erro = false;

    // Validação de comprimento
    if (novaSenha.length < 6) {
      $("#erroSenha1").textContent = "A senha deve ter no mínimo 6 caracteres.";
      erro = true;
    }

    // Validação de correspondência
    if (novaSenha !== confirmSenha) {
      $("#erroSenha2").textContent = "As senhas não coincidem.";
      erro = true;
    }

    if (erro) return;

    // Adiciona a senha ao objeto do usuário
    usuarioGoogle.senha = novaSenha;

    // Recupera lista de usuários do localStorage
    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    } catch {
      usuarios = [];
    }

    // Verifica se o usuário já existe
    const existente = usuarios.find(
      (x) => x.googleId === usuarioGoogle.googleId || x.email === usuarioGoogle.email
    );

    if (existente) {
      // Atualiza usuário existente
      Object.assign(existente, usuarioGoogle);
      const index = usuarios.findIndex(
        (x) => x.googleId === usuarioGoogle.googleId || x.email === usuarioGoogle.email
      );
      usuarios[index] = existente;
    } else {
      // Adiciona novo usuário
      usuarios.push(usuarioGoogle);
    }

    // Salva no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioGoogle));

    // Limpa sessionStorage
    sessionStorage.removeItem("usuarioGoogle");

    // Redireciona para a página principal
    $("#mensagem").textContent = "Senha definida com sucesso!";
    setTimeout(() => {
      window.location.href = "../principal/index.html";
    }, 1500);
  };
});
