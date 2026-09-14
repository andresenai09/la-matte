```javascript
document.addEventListener("DOMContentLoaded", () => {
  const $ = (seletor) => document.querySelector(seletor);
  const $$ = (seletor) => document.querySelectorAll(seletor);

  const get = (chave, padrao) => {
    try {
      const valor = localStorage.getItem(chave);
      return valor === null ? padrao : JSON.parse(valor);
    } catch {
      return padrao;
    }
  };

  const save = (chave, valor) => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {}
  };

  const moeda = (valor) => {
    return Number(valor || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  };

  const encontrarProduto = (id) => {
    if (!Array.isArray(window.produtos)) return null;
    return window.produtos.find((produto) => Number(produto.id) === Number(id));
  };

  let carrinho = get("carrinho", []);
  let favoritos = get("favoritos", []);
  let categoriaAtual = "Todos";
  let slideAtual = 0;
  let intervaloBanner = null;

  const gridProdutos = $("#gridProdutos");
  const semResultados = $("#semResultados");
  const campoPesquisa = $("#campoPesquisa");

  const bannerContainer = $("#bannerContainer");
  const banners = $$(".banner");
  const dots = $$(".dots button");

  function normalizarDados() {
    if (!Array.isArray(carrinho)) {
      carrinho = [];
    }

    if (!Array.isArray(favoritos)) {
      favoritos = [];
    }

    carrinho = carrinho
      .filter((item) => item && item.id != null)
      .map((item) => ({
        ...item,
        id: Number(item.id),
        preco: Number(item.preco) || 0,
        quantidade: Math.max(1, Number(item.quantidade) || 1)
      }));

    favoritos = favoritos
      .map(Number)
      .filter((id) => encontrarProduto(id));

    save("carrinho", carrinho);
    save("favoritos", favoritos);
  }

  function totalCarrinho() {
    return carrinho.reduce((total, item) => {
      return total + Number(item.preco) * Number(item.quantidade);
    }, 0);
  }

  function quantidadeCarrinho() {
    return carrinho.reduce((total, item) => {
      return total + Number(item.quantidade);
    }, 0);
  }

  function atualizarContadores() {
    const contadorCarrinho = $("#contadorCarrinho");
    const contadorFavoritos = $("#contadorFavoritos");

    if (contadorCarrinho) {
      contadorCarrinho.textContent = quantidadeCarrinho();
    }

    if (contadorFavoritos) {
      contadorFavoritos.textContent = favoritos.length;
    }
  }

  function criarCardProduto(produto) {
    const favorito = favoritos.includes(Number(produto.id));

    return `
      <article class="produto-card" data-id="${produto.id}">

        <button
          class="fav-card ${favorito ? "ativo" : ""}"
          data-fav="${produto.id}"
          aria-label="${favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
          type="button"
        >
          ${favorito ? "♥" : "♡"}
        </button>

        <a
          href="../produto/index.html?id=${produto.id}"
          class="produto-link"
        >
          <div class="produto-img">
            <img
              src="${produto.imagem}"
              alt="${produto.nome}"
              loading="lazy"
              onerror="this.style.display='none'"
            >
          </div>

          <div class="produto-info">
            <span>${produto.categoria || "Produto"}</span>

            <h3>${produto.nome}</h3>

            <p>${produto.descricao || ""}</p>

            <div class="produto-detalhes">
              <strong>${moeda(produto.preco)}</strong>

              ${
                produto.avaliacao
                  ? `<em>★ ${produto.avaliacao}</em>`
                  : ""
              }
            </div>
          </div>
        </a>

        <button
          class="add-card"
          data-add="${produto.id}"
          type="button"
        >
          Adicionar ao carrinho
        </button>

      </article>
    `;
  }

  function renderProdutos() {
    if (!gridProdutos) return;

    if (!Array.isArray(window.produtos)) {
      gridProdutos.innerHTML = "";
      if (semResultados) {
        semResultados.textContent = "Não foi possível carregar os produtos.";
        semResultados.style.display = "block";
      }
      return;
    }

    const termo = campoPesquisa
      ? campoPesquisa.value.toLowerCase().trim()
      : "";

    const lista = window.produtos.filter((produto) => {
      const categoriaProduto = produto.categoria || "";

      const correspondeCategoria =
        categoriaAtual === "Todos" ||
        categoriaProduto === categoriaAtual;

      const textoProduto = `
        ${produto.nome || ""}
        ${produto.descricao || ""}
        ${categoriaProduto}
      `.toLowerCase();

      const correspondePesquisa =
        !termo || textoProduto.includes(termo);

      return correspondeCategoria && correspondePesquisa;
    });

    gridProdutos.innerHTML = lista
      .map(criarCardProduto)
      .join("");

    if (semResultados) {
      semResultados.style.display =
        lista.length === 0 ? "block" : "none";
    }

    $$(".fav-card").forEach((botao) => {
      botao.addEventListener("click", (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        toggleFavorito(Number(botao.dataset.fav));
      });
    });

    $$(".add-card").forEach((botao) => {
      botao.addEventListener("click", (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        adicionarAoCarrinho(
          Number(botao.dataset.add)
        );
      });
    });
  }

  function adicionarAoCarrinho(id, quantidade = 1) {
    const produto = encontrarProduto(id);

    if (!produto) return;

    const existente = carrinho.find(
      (item) => Number(item.id) === Number(id)
    );

    if (existente) {
      existente.quantidade += quantidade;
    } else {
      carrinho.push({
        id: Number(produto.id),
        nome: produto.nome,
        preco: Number(produto.preco) || 0,
        imagem: produto.imagem,
        quantidade
      });
    }

    save("carrinho", carrinho);

    renderCarrinho();
    atualizarContadores();

    abrirPainel($("#carrinhoPainel"));
  }

  function alterarQuantidade(id, quantidade) {
    const item = carrinho.find(
      (produto) => Number(produto.id) === Number(id)
    );

    if (!item) return;

    if (quantidade <= 0) {
      carrinho = carrinho.filter(
        (produto) => Number(produto.id) !== Number(id)
      );
    } else {
      item.quantidade = quantidade;
    }

    save("carrinho", carrinho);

    renderCarrinho();
    atualizarContadores();
  }

  function removerDoCarrinho(id) {
    carrinho = carrinho.filter(
      (item) => Number(item.id) !== Number(id)
    );

    save("carrinho", carrinho);

    renderCarrinho();
    atualizarContadores();
  }

  function toggleFavorito(id) {
    const numeroId = Number(id);

    if (favoritos.includes(numeroId)) {
      favoritos = favoritos.filter(
        (favoritoId) => favoritoId !== numeroId
      );
    } else {
      favoritos.push(numeroId);
    }

    save("favoritos", favoritos);

    renderProdutos();
    renderFavoritos();
    atualizarContadores();
  }

  function renderCarrinho() {
    const conteudo = $("#carrinhoConteudo");

    if (!conteudo) return;

    if (carrinho.length === 0) {
      conteudo.innerHTML = `
        <div class="vazio">
          <span>🛒</span>
          <h3>Seu carrinho está vazio</h3>
          <p>Adicione produtos para começar.</p>
        </div>
      `;
    } else {
      conteudo.innerHTML = carrinho
        .map((item) => {
          return `
            <div class="item-painel">

              <img
                src="${item.imagem}"
                alt="${item.nome}"
                loading="lazy"
              >

              <div class="item-info">
                <h4>${item.nome}</h4>

                <strong>
                  ${moeda(item.preco)}
                </strong>

                <div class="quantidade">

                  <button
                    type="button"
                    data-minus="${item.id}"
                    aria-label="Diminuir quantidade"
                  >
                    −
                  </button>

                  <span>${item.quantidade}</span>

                  <button
                    type="button"
                    data-plus="${item.id}"
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>

                </div>
              </div>

              <button
                class="remover"
                type="button"
                data-remove="${item.id}"
                aria-label="Remover produto"
              >
                ×
              </button>

            </div>
          `;
        })
        .join("");
    }

    const subtotal = $("#subtotalCarrinho");

    if (subtotal) {
      subtotal.textContent = moeda(totalCarrinho());
    }

    $$("[data-minus]").forEach((botao) => {
      botao.addEventListener("click", () => {
        const id = Number(botao.dataset.minus);

        const item = carrinho.find(
          (produto) => Number(produto.id) === id
        );

        if (!item) return;

        alterarQuantidade(
          id,
          item.quantidade - 1
        );
      });
    });

    $$("[data-plus]").forEach((botao) => {
      botao.addEventListener("click", () => {
        const id = Number(botao.dataset.plus);

        const item = carrinho.find(
          (produto) => Number(produto.id) === id
        );

        if (!item) return;

        alterarQuantidade(
          id,
          item.quantidade + 1
        );
      });
    });

    $$("[data-remove]").forEach((botao) => {
      botao.addEventListener("click", () => {
        removerDoCarrinho(
          Number(botao.dataset.remove)
        );
      });
    });
  }

  function renderFavoritos() {
    const conteudo = $("#favoritosConteudo");

    if (!conteudo) return;

    const lista = Array.isArray(window.produtos)
      ? window.produtos.filter((produto) =>
          favoritos.includes(Number(produto.id))
        )
      : [];

    if (lista.length === 0) {
      conteudo.innerHTML = `
        <div class="vazio">
          <span>♡</span>
          <h3>Nenhum favorito</h3>
          <p>
            Toque no coração de um produto
            para salvá-lo.
          </p>
        </div>
      `;

      return;
    }

    conteudo.innerHTML = lista
      .map((produto) => {
        return `
          <div class="item-painel">

            <img
              src="${produto.imagem}"
              alt="${produto.nome}"
              loading="lazy"
            >

            <div class="item-info">
              <h4>${produto.nome}</h4>

              <strong>
                ${moeda(produto.preco)}
              </strong>

              <a
                href="../produto/index.html?id=${produto.id}"
                class="mini-link"
              >
                Ver produto
              </a>
            </div>

            <button
              class="remover"
              type="button"
              data-remove-fav="${produto.id}"
              aria-label="Remover dos favoritos"
            >
              ×
            </button>

          </div>
        `;
      })
      .join("");

    $$("[data-remove-fav]").forEach((botao) => {
      botao.addEventListener("click", () => {
        toggleFavorito(
          Number(botao.dataset.removeFav)
        );
      });
    });
  }

  function fecharTodos() {
    $$(".painel-lateral").forEach((painel) => {
      painel.classList.remove("aberto");
    });

    $("#perfilPopup")?.classList.remove("aberto");
    $("#painelFundo")?.classList.remove("ativo");

    document.body.classList.remove("painel-aberto");

    $("#menuBtn")?.classList.remove("active");
  }

  function abrirPainel(painel) {
    if (!painel) return;

    fecharTodos();

    painel.classList.add("aberto");

    $("#painelFundo")?.classList.add("ativo");

    document.body.classList.add("painel-aberto");

    if (painel.id === "menuOverlay") {
      $("#menuBtn")?.classList.add("active");
    }
  }

  function atualizarUsuario() {
    const usuario = get("usuarioLogado", null);
    const links = $("#perfilLinks");

    const nome = $("#perfilNomeMenu");
    const subtitulo = $("#perfilSubMenu");

    if (!links) return;

    if (usuario) {
      if (nome) {
        nome.textContent =
          usuario.nomeCompleto ||
          usuario.nome ||
          usuario.usuario ||
          "Cliente La Matte";
      }

      if (subtitulo) {
        subtitulo.textContent =
          usuario.telefone ||
          usuario.email ||
          "Cliente La Matte";
      }

      links.innerHTML = `
        <a href="../perfil/index.html">
          Meu Perfil / Editar Dados
          <b>›</b>
        </a>

        <a href="#produtos">
          Fazer compras
          <b>›</b>
        </a>

        <button
          type="button"
          id="btnSairConta"
        >
          Sair da conta
          <b>›</b>
        </button>
      `;

      $("#btnSairConta")?.addEventListener(
        "click",
        sairDaConta
      );
    } else {
      if (nome) {
        nome.textContent = "Visitante";
      }

      if (subtitulo) {
        subtitulo.textContent =
          "Faça login para acessar sua conta";
      }

      links.innerHTML = `
        <a href="../login/login.html">
          Entrar na conta
          <b>›</b>
        </a>

        <a href="../cadastro/cadastro.html">
          Criar cadastro
          <b>›</b>
        </a>
      `;
    }
  }

  function sairDaConta() {
    localStorage.removeItem("usuarioLogado");

    fecharTodos();
    atualizarUsuario();
  }

  function mostrarSlide(indice) {
    if (!bannerContainer || banners.length === 0) {
      return;
    }

    const total = banners.length;

    slideAtual =
      ((indice % total) + total) % total;

    bannerContainer.style.transform =
      `translateX(-${slideAtual * (100 / total)}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle(
        "ativo",
        index === slideAtual
      );
    });
  }

  function proximoSlide() {
    mostrarSlide(slideAtual + 1);
  }

  function slideAnterior() {
    mostrarSlide(slideAtual - 1);
  }

  function iniciarBanner() {
    if (banners.length <= 1) return;

    pararBanner();

    intervaloBanner = setInterval(() => {
      proximoSlide();
    }, 6000);
  }

  function pararBanner() {
    if (intervaloBanner) {
      clearInterval(intervaloBanner);
      intervaloBanner = null;
    }
  }

  function reiniciarBanner() {
    pararBanner();

    intervaloBanner = setTimeout(() => {
      iniciarBanner();
    }, 9000);
  }

  const carrinhoBtn = $("#carrinhoBtn");
  const favoritosBtn = $("#favoritosBtn");
  const menuBtn = $("#menuBtn");
  const perfilBtn = $("#perfilBtn");

  carrinhoBtn?.addEventListener("click", () => {
    abrirPainel($("#carrinhoPainel"));
  });

  favoritosBtn?.addEventListener("click", () => {
    abrirPainel($("#favoritosPainel"));
  });

  menuBtn?.addEventListener("click", () => {
    const menu = $("#menuOverlay");

    if (!menu) return;

    if (menu.classList.contains("aberto")) {
      fecharTodos();
    } else {
      abrirPainel(menu);
    }
  });

  $("#fecharCarrinho")?.addEventListener(
    "click",
    fecharTodos
  );

  $("#fecharFavoritos")?.addEventListener(
    "click",
    fecharTodos
  );

  $("#fecharMenu")?.addEventListener(
    "click",
    fecharTodos
  );

  $("#painelFundo")?.addEventListener(
    "click",
    fecharTodos
  );

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharTodos();
    }
  });

  perfilBtn?.addEventListener("click", () => {
    const usuario = get("usuarioLogado", null);
    const popup = $("#perfilPopup");

    if (!popup) return;

    if (usuario) {
      window.location.href =
        "../perfil/index.html";
      return;
    }

    fecharTodos();

    popup.classList.add("aberto");

    $("#painelFundo")?.classList.add("ativo");

    document.body.classList.add("painel-aberto");
  });

  $$(".filtros button").forEach((botao) => {
    botao.addEventListener("click", () => {
      $$(".filtros button").forEach((item) => {
        item.classList.remove("ativo");
      });

      botao.classList.add("ativo");

      categoriaAtual =
        botao.dataset.categoria || "Todos";

      renderProdutos();
    });
  });

  campoPesquisa?.addEventListener(
    "input",
    renderProdutos
  );

  $("#limparPesquisa")?.addEventListener(
    "click",
    () => {
      if (campoPesquisa) {
        campoPesquisa.value = "";
      }

      renderProdutos();
      campoPesquisa?.focus();
    }
  );

  $("#bannerNext")?.addEventListener(
    "click",
    () => {
      proximoSlide();
      reiniciarBanner();
    }
  );

  $("#bannerPrev")?.addEventListener(
    "click",
    () => {
      slideAnterior();
      reiniciarBanner();
    }
  );

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      mostrarSlide(
        Number(dot.dataset.slide) || 0
      );

      reiniciarBanner();
    });
  });

  bannerContainer?.addEventListener(
    "mouseenter",
    pararBanner
  );

  bannerContainer?.addEventListener(
    "mouseleave",
    iniciarBanner
  );

  bannerContainer?.addEventListener(
    "touchstart",
    pararBanner,
    { passive: true }
  );

  bannerContainer?.addEventListener(
    "touchend",
    iniciarBanner,
    { passive: true }
  );

  const suporteForm = $("#suporteForm");

  suporteForm?.addEventListener(
    "submit",
    (evento) => {
      evento.preventDefault();

      const sucesso = $("#suporteSucesso");

      if (sucesso) {
        sucesso.textContent =
          "Mensagem registrada nesta demonstração. Obrigado!";
      }

      suporteForm.reset();
    }
  );

  const newsletterForm = $("#formNewsletter");

  newsletterForm?.addEventListener(
    "submit",
    (evento) => {
      evento.preventDefault();

      const sucesso =
        $("#newsletterSucesso");

      if (sucesso) {
        sucesso.textContent =
          "Inscrição realizada!";
      }

      newsletterForm.reset();
    }
  );

  $$(".menu-links a").forEach((link) => {
    link.addEventListener("click", () => {
      fecharTodos();
    });
  });

  document.addEventListener("click", (evento) => {
    const popup = $("#perfilPopup");
    const perfil = $("#perfilBtn");

    if (!popup || !popup.classList.contains("aberto")) {
      return;
    }

    if (
      !popup.contains(evento.target) &&
      !perfil?.contains(evento.target)
    ) {
      fecharTodos();
    }
  });

  normalizarDados();
  atualizarUsuario();
  renderProdutos();
  renderCarrinho();
  renderFavoritos();
  atualizarContadores();

  mostrarSlide(0);
  iniciarBanner();
});
```
