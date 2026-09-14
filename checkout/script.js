document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // RECUPERA DADOS
  let carrinho = [];
  let usuarioLogado = null;

  try {
    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;
  } catch {
    carrinho = [];
    usuarioLogado = null;
  }

  // Se não estiver logado, redireciona
  if (!usuarioLogado) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = "../login/login.html";
    return;
  }

  // Se carrinho vazio, redireciona
  if (!carrinho.length) {
    alert("Seu carrinho está vazio.");
    window.location.href = "../principal/index.html";
    return;
  }

  // FUNÇÃO PARA FORMATAR MOEDA
  const formatarMoeda = valor => 
    "R$ " + valor.toFixed(2).replace(".", ",");

  // FUNÇÃO PARA CALCULAR TOTAL
  const calcularTotal = () => 
    carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

  // FUNÇÃO PARA VALIDAR DADOS OBRIGATÓRIOS
  function validarDadosObrigatorios() {
    const dadosObrigatorios = ["cpf", "nascimento", "telefone", "cep", "nomeCompleto"];
    const dadosFaltando = [];

    for (let campo of dadosObrigatorios) {
      if (!usuarioLogado[campo] || usuarioLogado[campo].trim() === "") {
        dadosFaltando.push(campo);
      }
    }

    return dadosFaltando;
  }

  // VERIFICAR DADOS E REDIRECIONAR SE NECESSÁRIO
  const dadosFaltando = validarDadosObrigatorios();
  
  if (dadosFaltando.length > 0) {
    // Se faltam dados, redireciona para a página de completar dados
    alert("Você precisa completar seus dados cadastrais antes de finalizar a compra.");
    window.location.href = "../perfil/completar-dados.html";
    return;
  }

  // RENDERIZAR PRODUTOS NO CHECKOUT
  function renderizarProdutos() {
    const box = $("#itens");
    const total = calcularTotal();

    box.innerHTML = carrinho.map(item => `
      <div class="item-checkout">
        <img src="${item.imagem}" alt="${item.nome}" loading="lazy">
        <div class="item-info">
          <h4>${item.nome}</h4>
          <span class="qtd">Qtd: ${item.quantidade}</span>
        </div>
        <div class="item-preco">
          <strong>${formatarMoeda(item.preco * item.quantidade)}</strong>
        </div>
      </div>
    `).join("");

    $("#subtotal").textContent = formatarMoeda(total);
    $("#resumoSubtotal").textContent = formatarMoeda(total);
    $("#resumoTotal").textContent = formatarMoeda(total);
  }

  // EXIBIR DADOS DO USUÁRIO
  function exibirDadosUsuario() {
    const box = $("#dadosUsuario");
    
    const dados = [
      { label: "Nome Completo", valor: usuarioLogado.nomeCompleto || "Não informado" },
      { label: "CPF", valor: usuarioLogado.cpf || "Não informado" },
      { label: "Data de Nascimento", valor: usuarioLogado.nascimento || "Não informado" },
      { label: "Telefone", valor: usuarioLogado.telefone || "Não informado" },
      { label: "CEP", valor: usuarioLogado.cep || "Não informado" }
    ];

    box.innerHTML = dados.map(d => `
      <div class="dado-linha">
        <span class="dado-label">${d.label}:</span>
        <span class="dado-valor">${d.valor}</span>
      </div>
    `).join("");
  }

  // BOTÃO FINALIZAR COMPRA
  $("#btnFinalizarCompra").onclick = () => {
    $("#msgAlerta").textContent = "";

    // Validar endereço
    const rua = $("#endRua").value.trim();
    const numero = $("#endNumero").value.trim();
    const bairro = $("#endBairro").value.trim();
    const cidade = $("#endCidade").value.trim();
    const estado = $("#endEstado").value.trim();

    if (!rua || !numero || !bairro || !cidade || !estado) {
      $("#msgEnderecoErro").textContent = "⚠️ Preencha todos os campos de endereço.";
      $("#msgEnderecoErro").classList.add("erro");
      return;
    }

    // Se passou em todas as validações
    const pagamento = $('input[name="pagamento"]:checked').value;
    
    const pedido = {
      id: "LM-" + Date.now(),
      data: new Date().toLocaleDateString("pt-BR"),
      items: carrinho,
      subtotal: calcularTotal(),
      frete: 0,
      total: calcularTotal(),
      endereco: {
        rua,
        numero,
        complemento: $("#endComplemento").value,
        bairro,
        cidade,
        estado
      },
      pagamento,
      usuario: usuarioLogado.usuario,
      status: "pendente"
    };

    // Salvar pedido no localStorage
    let pedidos = [];
    try {
      pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    } catch {
      pedidos = [];
    }

    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Limpar carrinho
    localStorage.removeItem("carrinho");

    // Exibir mensagem de sucesso
    $("#msgAlerta").textContent = "✓ Pedido realizado com sucesso! Redirecionando...";
    $("#msgAlerta").classList.remove("erro");
    $("#msgAlerta").classList.add("sucesso");

    // Redirecionar após 2 segundos
    setTimeout(() => {
      window.location.href = "../principal/index.html?pedido=" + pedido.id;
    }, 2000);
  };

  // VALIDAR ENDEREÇO AO SAIR DO CAMPO
  const camposEndereco = ["#endRua", "#endNumero", "#endBairro", "#endCidade", "#endEstado"];
  camposEndereco.forEach(seletor => {
    $(seletor).addEventListener("blur", () => {
      const rua = $("#endRua").value.trim();
      const numero = $("#endNumero").value.trim();
      const bairro = $("#endBairro").value.trim();
      const cidade = $("#endCidade").value.trim();
      const estado = $("#endEstado").value.trim();

      if (rua || numero || bairro || cidade || estado) {
        if (!rua || !numero || !bairro || !cidade || !estado) {
          $("#msgEnderecoErro").textContent = "⚠️ Preencha todos os campos obrigatórios do endereço.";
          $("#msgEnderecoErro").classList.add("erro");
        } else {
          $("#msgEnderecoErro").textContent = "";
          $("#msgEnderecoErro").classList.remove("erro");
        }
      }
    });
  });

  // MUDAR ESTILO DO PAGAMENTO SELECIONADO
  $$('input[name="pagamento"]').forEach(input => {
    input.addEventListener("change", (e) => {
      $$(".pagamento").forEach(p => p.classList.remove("ativo"));
      e.target.closest(".pagamento").classList.add("ativo");
    });
  });

  // INICIALIZAR
  renderizarProdutos();
  exibirDadosUsuario();
});
