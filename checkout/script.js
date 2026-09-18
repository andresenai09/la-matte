document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  const getJSON = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  let carrinho = getJSON("carrinho", []);
  let usuarioLogado = getJSON("usuarioLogado", null);

  if (!usuarioLogado) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = "../login/login.html";
    return;
  }

  if (!carrinho.length) {
    alert("Seu carrinho está vazio.");
    window.location.href = "../principal/index.html";
    return;
  }

  const formatarMoeda = valor =>
    "R$ " + Number(valor || 0).toFixed(2).replace(".", ",");

  const calcularTotal = () =>
    carrinho.reduce((acc, item) => acc + Number(item.preco || 0) * Number(item.quantidade || 1), 0);

  const identificadorUsuario = () =>
    String(usuarioLogado.usuario || usuarioLogado.email || "").trim().toLowerCase();

  const chaveEndereco = () => {
    const id = identificadorUsuario();
    return id ? `laMatteEndereco_${encodeURIComponent(id)}` : "laMatteEndereco";
  };

  function validarDadosObrigatorios() {
    const dadosObrigatorios = ["cpf", "nascimento", "telefone", "cep", "nomeCompleto"];
    return dadosObrigatorios.filter(campo => {
      const valor = usuarioLogado[campo];
      return !valor || String(valor).trim() === "";
    });
  }

  const dadosFaltando = validarDadosObrigatorios();
  if (dadosFaltando.length > 0) {
    alert("Você precisa completar seus dados cadastrais antes de finalizar a compra.");
    window.location.href = "../perfil/completar-dados.html";
    return;
  }

  function carregarEndereco() {
    let endereco = getJSON(chaveEndereco(), null);

    if (!endereco && usuarioLogado.endereco) {
      endereco = usuarioLogado.endereco;
    }

    if (!endereco) {
      const antigo = getJSON("laMatteEndereco", null);
      if (antigo) endereco = antigo;
    }

    if (!endereco) return;

    const campos = {
      endRua: endereco.rua || "",
      endNumero: endereco.numero || "",
      endComplemento: endereco.complemento || "",
      endBairro: endereco.bairro || "",
      endCidade: endereco.cidade || "",
      endEstado: endereco.estado || ""
    };

    Object.entries(campos).forEach(([id, valor]) => {
      const campo = document.getElementById(id);
      if (campo) campo.value = valor;
    });
  }

  function obterEndereco() {
    return {
      rua: $("#endRua")?.value.trim() || "",
      numero: $("#endNumero")?.value.trim() || "",
      complemento: $("#endComplemento")?.value.trim() || "",
      bairro: $("#endBairro")?.value.trim() || "",
      cidade: $("#endCidade")?.value.trim() || "",
      estado: $("#endEstado")?.value.trim() || ""
    };
  }

  function salvarEndereco() {
    const endereco = obterEndereco();
    if (!Object.values(endereco).some(Boolean)) return;

    saveJSON(chaveEndereco(), endereco);
    usuarioLogado.endereco = endereco;
    saveJSON("usuarioLogado", usuarioLogado);

    let usuarios = getJSON("usuarios", []);
    const id = identificadorUsuario();
    const index = usuarios.findIndex(u =>
      String(u.usuario || u.email || "").trim().toLowerCase() === id
    );

    if (index >= 0) {
      usuarios[index] = { ...usuarios[index], endereco };
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }

  function renderizarProdutos() {
    const box = $("#itens");
    if (!box) return;

    const total = calcularTotal();
    box.innerHTML = carrinho.map(item => `
      <div class="item-checkout">
        <img src="${item.imagem || ""}" alt="${item.nome || "Produto"}" loading="lazy">
        <div class="item-info">
          <h4>${item.nome || "Produto"}</h4>
          <span class="qtd">Qtd: ${Number(item.quantidade || 1)}</span>
        </div>
        <div class="item-preco">
          <strong>${formatarMoeda(Number(item.preco || 0) * Number(item.quantidade || 1))}</strong>
        </div>
      </div>
    `).join("");

    $("#subtotal").textContent = formatarMoeda(total);
    $("#resumoSubtotal").textContent = formatarMoeda(total);
    $("#resumoTotal").textContent = formatarMoeda(total);
  }

  function exibirDadosUsuario() {
    const box = $("#dadosUsuario");
    if (!box) return;

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

  function finalizarCompra() {
    const msg = $("#msgAlerta");
    const erroEndereco = $("#msgEnderecoErro");
    const botao = $("#btnFinalizarCompra");
    const endereco = obterEndereco();

    if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado) {
      erroEndereco.textContent = "⚠️ Preencha todos os campos obrigatórios do endereço.";
      erroEndereco.classList.add("erro");
      return;
    }

    const pagamento = $("input[name=\"pagamento\"]:checked")?.value || "pix";
    const agora = new Date();
    const pedido = {
      id: "LM-" + Date.now(),
      data: agora.toLocaleDateString("pt-BR"),
      dataISO: agora.toISOString(),
      items: carrinho.map(item => ({
        id: item.id,
        nome: item.nome,
        preco: Number(item.preco || 0),
        imagem: item.imagem || "",
        quantidade: Number(item.quantidade || 1)
      })),
      subtotal: calcularTotal(),
      frete: 0,
      total: calcularTotal(),
      endereco: { ...endereco },
      pagamento,
      usuario: usuarioLogado.usuario || usuarioLogado.email || "",
      email: usuarioLogado.email || "",
      status: "pendente"
    };

    let pedidos = getJSON("pedidos", []);
    if (!Array.isArray(pedidos)) pedidos = [];
    pedidos.push(pedido);
    saveJSON("pedidos", pedidos);

    salvarEndereco();
    localStorage.removeItem("carrinho");
    localStorage.removeItem("laMatteCarrinho");

    if (botao) {
      botao.disabled = true;
      botao.textContent = "Pedido realizado ✓";
    }

    if (msg) {
      msg.textContent = "✓ Pedido realizado com sucesso! Abrindo seus pedidos...";
      msg.classList.remove("erro");
      msg.classList.add("sucesso");
    }

    setTimeout(() => {
      window.location.href = "../perfil/index.html?aba=pedidos&pedido=" + encodeURIComponent(pedido.id);
    }, 1200);
  }

  ["#endRua", "#endNumero", "#endComplemento", "#endBairro", "#endCidade", "#endEstado"].forEach(seletor => {
    $(seletor)?.addEventListener("input", () => {
      salvarEndereco();
      $("#msgEnderecoErro").textContent = "";
      $("#msgEnderecoErro").classList.remove("erro");
    });

    $(seletor)?.addEventListener("change", salvarEndereco);
  });

  $("#btnFinalizarCompra")?.addEventListener("click", finalizarCompra);

  $$("input[name=\"pagamento\"]").forEach(input => {
    input.addEventListener("change", event => {
      $$(".pagamento").forEach(p => p.classList.remove("ativo"));
      event.target.closest(".pagamento")?.classList.add("ativo");
    });
  });

  carregarEndereco();
  renderizarProdutos();
  exibirDadosUsuario();
});
