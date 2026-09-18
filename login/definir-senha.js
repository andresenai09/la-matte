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

  // Pré-preenche o nome completo com o que veio do Google (usuário pode ajustar)
  $("#nomeCompleto").value = usuarioGoogle.nomeCompleto || "";

  // Máscaras de input (iguais às do cadastro)
  $("#cpf").addEventListener("input", (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  $("#telefone").addEventListener("input", (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  });

  $("#cep").addEventListener("input", (e) => {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/^(\d{5})(\d)/, "$1-$2");
  });

  // Validação e envio do formulário
  $("#formDefinirSenha").onsubmit = (e) => {
    e.preventDefault();

    ["NomeCompleto", "Cpf", "Nascimento", "Telefone", "Cep", "Senha1", "Senha2"].forEach((k) => {
      $("#erro" + k).textContent = "";
    });
    $("#mensagem").textContent = "";

    const nomeCompleto = $("#nomeCompleto").value.trim();
    const cpf = $("#cpf").value;
    const nascimento = $("#nascimento").value;
    const telefone = $("#telefone").value;
    const cep = $("#cep").value;
    const novaSenha = $("#novaSenha").value;
    const confirmSenha = $("#confirmSenha").value;
    let erro = false;

    const err = (id, msg) => {
      $("#erro" + id).textContent = msg;
      erro = true;
    };

    if (!nomeCompleto) err("NomeCompleto", "Informe o nome completo.");
    if (cpf.replace(/\D/g, "").length !== 11) err("Cpf", "Informe um CPF válido.");
    if (!nascimento) err("Nascimento", "Informe a data.");
    if (telefone.replace(/\D/g, "").length < 10) err("Telefone", "Informe um telefone válido.");
    if (cep.replace(/\D/g, "").length !== 8) err("Cep", "Informe um CEP válido.");
    if (novaSenha.length < 6) err("Senha1", "Use pelo menos 6 caracteres.");
    if (novaSenha !== confirmSenha) err("Senha2", "As senhas não coincidem.");

    if (erro) return;

    // Completa o objeto do usuário Google com os dados obrigatórios
    usuarioGoogle.nomeCompleto = nomeCompleto;
    usuarioGoogle.cpf = cpf;
    usuarioGoogle.nascimento = nascimento;
    usuarioGoogle.telefone = telefone;
    usuarioGoogle.cep = cep;
    usuarioGoogle.senha = novaSenha;

    // Recupera lista de usuários do localStorage
    let usuarios = [];
    try {
      usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    } catch {
      usuarios = [];
    }

    // Verifica se o usuário já existe
    const index = usuarios.findIndex(
      (x) => x.googleId === usuarioGoogle.googleId || x.email === usuarioGoogle.email
    );

    if (index >= 0) {
      usuarios[index] = usuarioGoogle;
    } else {
      usuarios.push(usuarioGoogle);
    }

    // Salva no localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioGoogle));

    // Limpa sessionStorage
    sessionStorage.removeItem("usuarioGoogle");

    // Redireciona para a página principal
    $("#mensagem").textContent = "Cadastro concluído com sucesso!";
    setTimeout(() => {
      window.location.href = "../principal/index.html";
    }, 1200);
  };
});
