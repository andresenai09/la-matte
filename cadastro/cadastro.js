document.addEventListener("DOMContentLoaded", () => {
  // Funções utilitárias
  const $ = (s) => document.querySelector(s);
  const form = $("#formCadastro");
  const mask = (el, fn) => el && el.addEventListener("input", () => el.value = fn(el.value));

  // Máscaras de input
  mask($("#cpf"), (v) => {
    v = v.replace(/\D/g, "").slice(0, 11);
    return v
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  });

  mask($("#telefone"), (v) => {
    v = v.replace(/\D/g, "").slice(0, 11);
    return v
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");
  });

  mask($("#cep"), (v) => {
    v = v.replace(/\D/g, "").slice(0, 8);
    return v.replace(/^(\d{5})(\d)/, "$1-$2");
  });

  // Validação e submissão do formulário
  form.onsubmit = (e) => {
    e.preventDefault();

    // Limpar mensagens de erro
    ["Campo", "NomeCompleto", "Cpf", "Nascimento", "Telefone", "Cep", "Senha", "ConfirmarSenha", "Termos"].forEach((k) => {
      $("#erro" + k).textContent = "";
    });

    // Capturar valores
    let u = $("#campo").value.trim();
    let nome = $("#nomeCompleto").value.trim();
    let cpf = $("#cpf").value;
    let nasc = $("#nascimento").value;
    let tel = $("#telefone").value;
    let cep = $("#cep").value;
    let senha = $("#senha").value;
    let conf = $("#confirmarSenha").value;
    let termos = $("#aceitar-termos").checked;
    let erro = false;

    // Função auxiliar para exibir erros
    const err = (id, msg) => {
      $("#erro" + id).textContent = msg;
      erro = true;
    };

    // Regras de validação
    if (!u) err("Campo", "Informe o usuário.");
    if (!nome) err("NomeCompleto", "Informe o nome completo.");
    if (cpf.replace(/\D/g, "").length !== 11) err("Cpf", "Informe um CPF válido.");
    if (!nasc) err("Nascimento", "Informe a data.");
    if (tel.replace(/\D/g, "").length < 10) err("Telefone", "Informe um telefone válido.");
    if (cep.replace(/\D/g, "").length !== 8) err("Cep", "Informe um CEP válido.");
    if (senha.length < 6) err("Senha", "Use pelo menos 6 caracteres.");
    if (senha !== conf) err("ConfirmarSenha", "As senhas não coincidem.");
    if (!termos) err("Termos", "Aceite os termos para continuar.");

    if (erro) return;

    // Verificação de usuário existente e salvamento
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (usuarios.some((x) => x.usuario.toLowerCase() === u.toLowerCase())) {
      err("Campo", "Esse usuário já existe.");
      return;
    }

    const novo = {
      usuario: u,
      nomeCompleto: nome,
      cpf,
      nascimento: nasc,
      telefone: tel,
      cep,
      senha
    };

    usuarios.push(novo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(novo));
    
    // Feedback de sucesso
    $("#mensagemGeral").textContent = "Conta criada!";
    setTimeout(() => location.href = "../principal/index.html", 500);
  };

  // Mock de Login com o Google
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