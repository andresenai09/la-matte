document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id") || 1;
  const p = encontrarProduto(id);

  if (!p) {
    location.href = "../principal/index.html";
    return;
  }

  const $ = s => document.querySelector(s);

  $("#nome").textContent = p.nome;
  $("#crumb").textContent = p.nome;
  $("#categoria").textContent = p.categoria;
  
  const imagemEl = $("#imagemProduto");
  imagemEl.src = p.imagem;
  imagemEl.alt = p.nome;
  imagemEl.onerror = () => {
    imagemEl.onerror = null;
    imagemEl.src = "#";
  };

  $("#preco").textContent = formatarMoeda(p.preco);
  $("#descricao").textContent = p.descricao;
  $("#descricaoLonga").innerHTML = p.descricaoLonga;
  $("#nota").textContent = p.avaliacao.toFixed(1);
  $("#estrelas").textContent = "★★★★★";
  $("#qtdAvaliacoes").textContent = `(${p.avaliacoes} avaliações)`;

  let qtd = 1;

  $("#menos").onclick = () => {
    qtd = Math.max(1, qtd - 1);
    $("#quantidade").textContent = qtd;
  };

  $("#mais").onclick = () => {
    qtd++;
    $("#quantidade").textContent = qtd;
  };

  const atualizarContador = (carrinhoArray) => {
    $("#contador").textContent = carrinhoArray.reduce((acc, item) => acc + item.quantidade, 0);
  };

  let carrinhoAtual;
  try {
    carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
  } catch {
    carrinhoAtual = [];
  }
  atualizarContador(carrinhoAtual);

  $("#adicionar").onclick = () => {
    let carrinho;
    try {
      carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    } catch {
      carrinho = [];
    }

    const itemExistente = carrinho.find(x => x.id === p.id);
    
    if (itemExistente) {
      itemExistente.quantidade += qtd;
    } else {
      carrinho.push({
        id: p.id,
        nome: p.nome,
        preco: p.preco,
        imagem: p.imagem,
        quantidade: qtd
      });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    
    const btn = $("#adicionar");
    btn.textContent = "Adicionado ✓";
    setTimeout(() => {
      btn.textContent = "Adicionar ao carrinho";
    }, 1200);

    atualizarContador(carrinho);
  };

  const nomes = ["Mariana", "Lucas", "Beatriz", "Rafael"];
  const depoimentos = [
    "Produto excelente, muito bem embalado e com ótimo aroma.",
    "Gostei bastante do sabor. Voltarei a comprar.",
    "Entrega da demonstração muito organizada e página fácil de usar.",
    "Qualidade e apresentação impecáveis."
  ];

  $("#listaAvaliacoes").innerHTML = nomes.map((nome, index) => `
    <article class="review">
      <strong>${nome}</strong>
      <div>★★★★★</div>
      <p>${depoimentos[index]}</p>
    </article>
  `).join("");
});