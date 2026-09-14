const produtos = [
  {
    "id": 1,
    "nome": "Erva-Mate Tradicional Barão a Vácuo 500g",
    "categoria": "Erva-Mate",
    "preco": 21.90,
    "descricao": "Embalada a vácuo, de moagem média e sabor tradicional equilibrado.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A Erva-Mate Tradicional Barão a Vácuo é a escolha definitiva para quem não abre mão do verdadeiro chimarrão gaúcho. O seu processo de embalagem a vácuo é um diferencial que garante a preservação absoluta da cor verde vibrante, do frescor recém-colhido e de todas as propriedades antioxidantes da folha por muito mais tempo. Com uma moagem média perfeitamente balanceada, ela oferece um sabor tradicional que mescla um amargor suave e uma doçura herbácea natural.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Embalagem:</strong> A vácuo (alta preservação de frescor e cor)</li>
        <li><strong>Moagem:</strong> Média (equilíbrio entre folha e palito)</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Indicação de Uso:</strong> Chimarrão diário tradicional</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/1364894/erva_mate_baro_tradicional_a_vcuo_500g_1_20260302090905_02bd7dd8e68f.jpg",
    "avaliacao": 4.8,
    "avaliacoes": 142
  },
  {
    "id": 2,
    "nome": "Erva-Mate Premium Seleção de Brotos 500g",
    "categoria": "Erva-Mate",
    "preco": 28.50,
    "descricao": "Folhas jovens selecionadas para um chimarrão intenso e aveludado.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Produzida exclusivamente com as folhas mais jovens e tenras, colhidas no auge do seu desenvolvimento, a Erva-Mate Premium Seleção de Brotos entrega uma experiência de degustação de alto nível. Este cuidado extremo na seleção resulta em uma textura incrivelmente aveludada na cuia e um sabor encorpado que preenche o paladar sem causar adstringência. É uma erva que "rende" excepcionalmente bem.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Matéria-prima:</strong> Brotos e folhas jovens selecionadas</li>
        <li><strong>Padrão:</strong> Premium Exportação</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Perfil de Sabor:</strong> Encorpado, aveludado e prolongado</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/674270/erva_mate_premium_33_1_20190402140613.jpg",
    "avaliacao": 4.9,
    "avaliacoes": 98
  },
  {
    "id": 3,
    "nome": "Erva-Mate Suave Blend Especial 500g",
    "categoria": "Erva-Mate",
    "preco": 23.90,
    "descricao": "Blend suave e aromático com menor amargor, ideal para o dia a dia.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Se você é iniciante no mundo do chimarrão ou simplesmente prefere uma bebida mais delicada, o Blend Especial Suave é a sua melhor opção. Esta erva passa por um processo de secagem e moagem que reduz significativamente o amargor natural, criando um perfil aromático levemente adocicado e altamente palatável. A mistura cuidadosa garante uma infusão relaxante para qualquer momento do dia.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Composição:</strong> Blend especial de folhas de menor amargor</li>
        <li><strong>Intensidade:</strong> Suave (Ideal para iniciantes)</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Diferencial:</strong> Aroma adocicado natural e leveza estomacal</li>
      </ul>
    </div>`,
    "imagem": "https://acdn-us.mitiendanube.com/stores/003/772/584/products/erva_mate_suave_500g-1-1433ee51e8fb54c9fc17006685361136-1024-1024.webp",
    "avaliacao": 4.5,
    "avaliacoes": 85
  },
  {
    "id": 4,
    "nome": "Erva-Mate Defumada Cancheada Rústica 1kg",
    "categoria": "Erva-Mate",
    "preco": 39.90,
    "descricao": "Moagem rústica cancheada com sabor encorpado e notas defumadas.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A Erva-Mate Defumada Cancheada resgata os primórdios da preparação do mate. O estilo "cancheado" mantém pedaços maiores de folhas e palitos, evitando o entupimento da bomba e conferindo uma textura rústica inconfundível. O processo de secagem ancestral ao calor do fogo de lenha impregna as folhas com notas aromáticas profundamente defumadas e amadeiradas.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Moagem:</strong> Cancheada (rústica, folhas grossas)</li>
        <li><strong>Secagem:</strong> Artesanal com defumação à lenha</li>
        <li><strong>Peso Líquido:</strong> 1kg</li>
        <li><strong>Perfil de Sabor:</strong> Intenso, amadeirado e defumado</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/861887/erva_mate_1kg_45_1_a8fe94c31097433928aef1a90275ac02.jpg",
    "avaliacao": 4.7,
    "avaliacoes": 64
  },
  {
    "id": 5,
    "nome": "Erva-Mate Nativa de Moinho de Pedra 1kg",
    "categoria": "Erva-Mate",
    "preco": 34.90,
    "descricao": "Erva nativa moída em pedra, com alto frescor e sabor selvagem.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Cultivada à sombra das matas (sistema nativo), esta erva preserva o sabor original e selvagem da planta. O diferencial absoluto está na sua moagem artesanal em moinhos de pedra tradicionais, uma técnica que evita o superaquecimento das folhas durante o atrito, garantindo a retenção máxima de óleos essenciais, frescor e clorofila pura.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Cultivo:</strong> Sistema nativo sombreado</li>
        <li><strong>Processamento:</strong> Moída em moinho de pedra tradicional</li>
        <li><strong>Peso Líquido:</strong> 1kg</li>
        <li><strong>Diferencial:</strong> Coloração verde-esmeralda extrema e alto frescor</li>
      </ul>
    </div>`,
    "imagem": "https://ssis.nyc3.cdn.digitaloceanspaces.com/fd/215/produto/media/erva-mate-nativa-1kg-0.webp?_=1659616985",
    "avaliacao": 4.6,
    "avaliacoes": 112
  },
  {
    "id": 6,
    "nome": "Erva-Mate para Tereré Uhde Limão & Hortelã 500g",
    "categoria": "Tereré",
    "preco": 22.90,
    "descricao": "Corte grosso super refrescante com toque cítrico de limão e hortelã.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>O calor pede uma bebida à altura, e a Erva-Mate Uhde com Limão e Hortelã é a rainha do frescor. Com uma granulometria especialmente desenvolvida para não entupir a bomba com a água gelada, esta erva recebe uma infusão natural de óleos essenciais de limão cítrico e folhas secas de hortelã. A cada gole, a temperatura despenca e uma explosão de sabor mentolado e cítrico invade o paladar.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Granulometria:</strong> Corte grosso especial para Tereré</li>
        <li><strong>Saborização:</strong> Ingredientes naturais (Limão e Hortelã)</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Benefícios:</strong> Altamente hidratante e estimulante térmico</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/983438/erva_mate_uhde_terere_sabor_limao_500g_1409_1_10a88f30a69a71f1ce423df08306d941.jpg",
    "avaliacao": 4.8,
    "avaliacoes": 175
  },
  {
    "id": 7,
    "nome": "Erva-Mate para Tereré Trots Boldo e Menta 500g",
    "categoria": "Tereré",
    "preco": 25.90,
    "descricao": "Mistura com cristais de menta e boldo para máxima refrescância.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A Trots elevou o nível do tereré com este blend terapêutico e ultra-refrescante. A combinação clássica ganha vida ao unir as propriedades digestivas e curativas do boldo com o efeito 'ice' dos cristais concentrados de menta. Ao bater a água gelada, os cristais ativam uma sensação gélida na garganta, enquanto o amargor do boldo equilibra o perfil de sabor.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Composição Adicional:</strong> Folhas de boldo e cristais de menta</li>
        <li><strong>Efeito Funcional:</strong> Ação digestiva e refrescância extrema (Ice)</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Preparo:</strong> Ideal para consumo com água extra-gelada</li>
      </ul>
    </div>`,
    "imagem": "https://agrosolo.fbitsstatic.net/img/p/erva-mate-para-terere-trots-sabor-boldo-e-menta-500-g-84419/279828-1.jpg?w=1000&h=1000&v=no-value",
    "avaliacao": 4.9,
    "avaliacoes": 210
  },
  {
    "id": 8,
    "nome": "Erva-Mate para Tereré Pura Folha Argentina 500g",
    "categoria": "Tereré",
    "preco": 27.90,
    "descricao": "100% folhas selecionadas no estilo argentino com sabor intenso.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Para os puristas que buscam a potência máxima do mate gelado sem adições de sabores. O estilo argentino 'Pura Folha' (sem palitos ou poeira) exige uma maturação de até 12 meses antes do envase. Esse processo intensifica os taninos, gerando uma bebida encorpada, de cor verde-oliva, com um amargor elegante e persistente, que não 'lava' fácil nas reposições de água.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Estilo de Corte:</strong> Pura Folha Argentina (Despalada)</li>
        <li><strong>Estacionamento:</strong> Maturada naturalmente por até 12 meses</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Diferencial:</strong> Alto rendimento e retenção prolongada de sabor</li>
      </ul>
    </div>`,
    "imagem": "https://cdn.awsli.com.br/2500x2500/348/348119/produto/34311587/1c8b8048de.jpg",
    "avaliacao": 4.4,
    "avaliacoes": 89
  },
  {
    "id": 9,
    "nome": "Erva-Mate para Tereré Mega Menta Extreme 500g",
    "categoria": "Tereré",
    "preco": 26.50,
    "descricao": "Sabor mentolado potente para uma experiência térmica bem gelada.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Prepare-se para o nível máximo de frescor. A Mega Menta Extreme não economiza na potência: além das folhas selecionadas de erva-mate de corte grosso, ela recebe uma tripla dosagem de extrato de hortelã-pimenta e mentol puro. O resultado é uma bebida que engana os sentidos, parecendo estar muitos graus abaixo do ponto de congelamento.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Saborização:</strong> Tripla carga de mentol e extrato de hortelã</li>
        <li><strong>Granulometria:</strong> Corte grosso, ideal para fluxo livre de água</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Efeito:</strong> Limpeza de paladar e refrescância de longa duração</li>
      </ul>
    </div>`,
    "imagem": "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m5rckn6vv92qb4",
    "avaliacao": 4.7,
    "avaliacoes": 156
  },
  {
    "id": 10,
    "nome": "Erva-Mate para Tereré Barão Black Menta 500g",
    "categoria": "Tereré",
    "preco": 24.90,
    "descricao": "Corte ideal para guampa com sabor marcante de menta preta.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A linha Black da Barão inova ao trazer o sabor sofisticado e ligeiramente mais picante da menta preta (peppermint) combinada à erva de excelente procedência. O corte possui a proporção exata de palitos para assegurar a passagem livre da água pela bomba, criando uma sucção macia. Seu sabor começa com as notas herbáceas e finaliza com um hálito fresco.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Linha:</strong> Premium Black</li>
        <li><strong>Adição Aromática:</strong> Menta Preta (Peppermint)</li>
        <li><strong>Peso Líquido:</strong> 500g</li>
        <li><strong>Embalagem:</strong> Tecnologia de vedação anti-perda de óleos voláteis</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/1364894/terer_black_menta_baro_500g_1_20260302084937_336428c07a31.jpg",
    "avaliacao": 4.6,
    "avaliacoes": 134
  },
  {
    "id": 11,
    "nome": "Chá de Camomila Dr. Oetker com 10 Sachês",
    "categoria": "Chás",
    "preco": 10.90,
    "descricao": "Infusão floral delicada e relaxante para momentos de descanso.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>O Chá de Camomila Dr. Oetker é um abraço em forma de bebida, extraído exclusivamente dos delicados botões das flores de camomila. Conhecido secularmente por suas poderosas propriedades calmantes e ansiolíticas, é o aliado perfeito para a sua rotina noturna, preparando o corpo e a mente para um sono profundo e reparador. Aroma doce, frutal e reconfortante.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Formato:</strong> Caixa com 10 sachês envelopados individualmente</li>
        <li><strong>Propriedades:</strong> Calmante, relaxante e livre de cafeína</li>
        <li><strong>Ingrediente:</strong> 100% capítulos florais de Camomila (Matricaria recutita)</li>
        <li><strong>Preparo:</strong> Infusão em água quente por 3 a 5 minutos</li>
      </ul>
    </div>`,
    "imagem": "https://supermercadobomdemais.com.br/wp-content/uploads/2020/05/Ch%C3%A1-de-Camomila-Dr.-Oetker-10g.jpg",
    "avaliacao": 4.3,
    "avaliacoes": 78
  },
  {
    "id": 12,
    "nome": "Chá Verde Solúvel e Natural Folhas Selecionadas",
    "categoria": "Chás",
    "preco": 16.90,
    "descricao": "Chá verde rico em antioxidantes, com sabor leve e revigorante.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Combinando a sabedoria milenar asiática com a conveniência moderna, este Chá Verde Solúvel entrega todos os benefícios bioativos da planta Camellia sinensis sem a complicação da infusão demorada. Carregado com polifenóis e catequinas, é um escudo antioxidante. Seu processo de secagem especial elimina aquele retrogosto amargo, resultando em um perfil herbáceo e brilhante.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Formato:</strong> Pó solúvel instantâneo</li>
        <li><strong>Ação Funcional:</strong> Termogênico leve e alto poder antioxidante</li>
        <li><strong>Consumo:</strong> Pode ser preparado instantaneamente a quente ou gelado</li>
        <li><strong>Sabor:</strong> Leve, purificador e sem adstringência excessiva</li>
      </ul>
    </div>`,
    "imagem": "https://www.contabilista.com.br/media/catalog/product/cache/32a75d45db07776be517e442979756d0/0/0/003801A.jpg",
    "avaliacao": 4.5,
    "avaliacoes": 92
  },
  {
    "id": 13,
    "nome": "Chá Preto Encorpado Gourmet Premium",
    "categoria": "Chás",
    "preco": 18.90,
    "descricao": "Bebida encorpada e estimulante com sabor amadeirado marcante.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Extraído das mais nobres colheitas e submetido a um rigoroso processo de oxidação total, o Chá Preto Gourmet Premium é uma obra-prima de intensidade. De coloração âmbar escura e brilhante, ele apresenta notas maltadas complexas e um sutil aroma de especiarias. É uma saudável alternativa ao café matinal, possuindo cafeína de absorção gradual e harmonizando bem com leite.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Classificação:</strong> Gourmet Premium (Alta oxidação)</li>
        <li><strong>Perfil Sensorial:</strong> Encorpado, maltado e levemente amadeirado</li>
        <li><strong>Propriedades:</strong> Estimulante natural rico em cafeína</li>
        <li><strong>Sugestão de Consumo:</strong> Matinal, puro ou com um toque de leite</li>
      </ul>
    </div>`,
    "imagem": "https://santaluzia.vtexassets.com/arquivos/ids/1001558/586579--26-.png?v=638887230517670000",
    "avaliacao": 4.7,
    "avaliacoes": 61
  },
  {
    "id": 14,
    "nome": "Chá de Hibisco Flor Inteira Selecionada 100g",
    "categoria": "Chás",
    "preco": 15.90,
    "descricao": "Flores secas de hibisco com sabor acidulado e tom rubi vívido.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Um verdadeiro espetáculo de cor e sabor. Este produto contém apenas as sépalas inteiras e preservadas da flor de hibisco (Hibiscus sabdariffa). Ao ser infuso, libera um líquido vermelho-rubi estonteante e um aroma de frutas vermelhas silvestres. Seu sabor caracteristicamente ácido é refrescante gelado e confortante quente, reverenciado por seu forte efeito diurético.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Apresentação:</strong> Sépalas (flores) inteiras desidratadas (100g)</li>
        <li><strong>Propriedades:</strong> Ação diurética e auxiliar na regulação da pressão</li>
        <li><strong>Perfil de Sabor:</strong> Cítrico, acidulado e frutado</li>
        <li><strong>Versatilidade:</strong> Excelente base para chás gelados e drinks sem álcool</li>
      </ul>
    </div>`,
    "imagem": "https://cdn.awsli.com.br/446/446822/produto/205090469/cha-de-hibisco-mzwkro.jpg",
    "avaliacao": 4.8,
    "avaliacoes": 115
  },
  {
    "id": 15,
    "nome": "Chá de Erva-Doce Matte Leão com 10 Sachês",
    "categoria": "Chás",
    "preco": 9.90,
    "descricao": "Sabor adocicado e reconfortante, perfeito para após as refeições.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A tradição e confiança da marca Leão refletidas no mais clássico dos chás caseiros. O chá de erva-doce possui um sabor peculiarmente doce, notas de anis e um aroma que remete à infância. Os óleos voláteis da erva-doce são excelentes para reduzir a distensão abdominal e facilitar a digestão após refeições pesadas. Aquece o corpo e traz conforto imediato.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Formato:</strong> Caixa com 10 sachês práticos</li>
        <li><strong>Ingrediente:</strong> Sementes puras de Erva-Doce (Pimpinella anisum)</li>
        <li><strong>Indicação Terapêutica:</strong> Alívio digestivo e antiespasmódico leve</li>
        <li><strong>Preparo:</strong> Rápida liberação de sabor e cor em água quente</li>
      </ul>
    </div>`,
    "imagem": "https://www.drogariaminasbrasil.com.br/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/image/971097d5f/cha-de-leao-erva-doce-com-10-saquinhos.jpg",
    "avaliacao": 4.4,
    "avaliacoes": 143
  },
  {
    "id": 16,
    "nome": "Chá de Capim-Limão Orgânico Kampo de Ervas",
    "categoria": "Chás",
    "preco": 17.50,
    "descricao": "Capim-santo orgânico com aroma cítrico leve e relaxante.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Cultivado sob estritas diretrizes orgânicas, sem fertilizantes químicos, este Capim-Limão (ou capim-santo) entrega uma xícara límpida e sedosa. O perfume cítrico radiante se espalha pelo ambiente antes mesmo do primeiro gole. Atua como um poderoso relaxante do sistema nervoso central, sendo um aliado indispensável para aliviar a tensão muscular e estresse diário.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Certificação:</strong> Cultivo 100% Orgânico</li>
        <li><strong>Formato:</strong> Sachês/Folhas picadas prontas para infusão</li>
        <li><strong>Ação Funcional:</strong> Relaxante, analgésico leve e ansiolítico natural</li>
        <li><strong>Perfil de Sabor:</strong> Cítrico suave com toque rústico de gramínea</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/909151/cha_de_capim_limao_organico_10_saches_kampo_de_ervas_377_1_aca1a790b9a329e8dd4123797f48cebe.jpg",
    "avaliacao": 4.9,
    "avaliacoes": 88
  },
  {
    "id": 17,
    "nome": "Chá de Frutas Tropicais e Ervas Aromáticas",
    "categoria": "Chás",
    "preco": 21.90,
    "descricao": "Blend frutado e aromático com notas de maçã, laranja e maracujá.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Uma verdadeira viagem a um pomar exótico em cada xícara. Este blend é uma sinfonia harmoniosa entre pedaços desidratados de maçã doce, cascas de laranja aromáticas, maracujá vibrante e um toque de flores silvestres. Por ser livre de cafeína, permite que adultos e crianças desfrutem da sua doçura natural a qualquer hora. Gelado, transforma-se em um ponche refrescante.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Composição:</strong> Maçã, Casca de Laranja, Maracujá e Flores</li>
        <li><strong>Vantagem:</strong> Livre de cafeína (Adequado para todas as idades)</li>
        <li><strong>Preparo Especial:</strong> Dispensa açúcar devido à doçura das frutas maduras</li>
        <li><strong>Consumo:</strong> Incrível tanto em infusão quente quanto como Iced Tea</li>
      </ul>
    </div>`,
    "imagem": "https://www.qvita.com.br/img/site/1795/b/10990837.jpg",
    "avaliacao": 4.6,
    "avaliacoes": 104
  },
  {
    "id": 18,
    "nome": "Chá de Gengibre com Especiarias e Limão",
    "categoria": "Chás",
    "preco": 18.50,
    "descricao": "Infusão quente e picante que estimula a imunidade e o metabolismo.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Formulado para despertar, aquecer e proteger. O gengibre de alta pureza traz uma pungência deliciosa que aquece a garganta logo no primeiro contato. Especiarias como canela e cravo ampliam as camadas amadeiradas, enquanto o limão fecha o ciclo com frescor. É a bebida definitiva para atuar como expectorante, estimular a imunidade e acelerar o metabolismo suavemente.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Ingredientes Chave:</strong> Gengibre, Canela, Cravo e Limão</li>
        <li><strong>Propriedades:</strong> Termogênico, Imunológico e Expectorante</li>
        <li><strong>Perfil Sensorial:</strong> Picante, aquecido e levemente cítrico</li>
        <li><strong>Indicação:</strong> Ideal para dias frios e rotinas de bem-estar/emagrecimento</li>
      </ul>
    </div>`,
    "imagem": "https://cdn.awsli.com.br/800x800/321/321767/produto/150220257/8b5d8a50bd.jpg",
    "avaliacao": 4.5,
    "avaliacoes": 76
  },
  {
    "id": 19,
    "nome": "Chá de Boldo do Chile Folhas Selecionadas 50g",
    "categoria": "Chás",
    "preco": 13.50,
    "descricao": "Folhas puras de boldo chileno para auxílio na digestão.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>O verdadeiro Boldo do Chile (Peumus boldus) importado. Diferente dos boldos rasteiros cultivados domesticamente, as folhas desta árvore andina possuem uma concentração singular de alcaloides e óleos essenciais. É o remédio natural mais eficaz e conhecido para desconfortos hepáticos, ressacas e má digestão. Poucas folhas bastam para uma infusão rápida e poderosa.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Apresentação:</strong> Folhas inteiras chilenas desidratadas (50g)</li>
        <li><strong>Ação Terapêutica:</strong> Hepatoprotetor e digestivo intensivo</li>
        <li><strong>Perfil Sensorial:</strong> Amadeirado, amargo e levemente mentolado</li>
        <li><strong>Rendimento:</strong> Alta concentração exige poucas folhas por xícara</li>
      </ul>
    </div>`,
    "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeImBNMrDRGBeqgzckFHt2FHjAyqlBnuxgm2o018rqZi9bfo93TXd595k&s=10",
    "avaliacao": 4.2,
    "avaliacoes": 95
  },
  {
    "id": 20,
    "nome": "Chá de Canela em Pau Solnatus Selecionada 100g",
    "categoria": "Chás",
    "preco": 14.90,
    "descricao": "Canela em pau altamente aromática para infusões e receitas.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Cascas espessas, doces e picantes compõem este pacote Premium de Canela em Pau. A qualidade da secagem destas lascas garante que elas liberem lentamente os seus ricos óleos essenciais na água ou no leite. A canela domina o paladar com calor aconchegante, doçura natural e notas de madeira envelhecida. Excelente para o preparo de quentões, cappuccinos e chás funcionais.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Apresentação:</strong> Lascas em casca grossa natural (100g)</li>
        <li><strong>Uso Culinário e Funcional:</strong> Chás, marinadas aromáticas e doces</li>
        <li><strong>Propriedades:</strong> Auxilia na regulação glicêmica e promove circulação</li>
        <li><strong>Reutilização:</strong> Cada pau de canela pode ser infuso múltiplas vezes</li>
      </ul>
    </div>`,
    "imagem": "https://www.solnatus.com.br/wp-content/uploads/2022/02/cha-canela-pau.jpg",
    "avaliacao": 4.8,
    "avaliacoes": 118
  },
  {
    "id": 21,
    "nome": "Cuia Tradicional de Porongo Lisa para Chimarrão",
    "categoria": "Cuias",
    "preco": 39.90,
    "descricao": "Cuia clássica de porongo natural para o chimarrão do dia a dia.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>O berço de um bom chimarrão está na sua cuia, e este modelo liso de porongo é a representação máxima da tradição. Feita a partir da cabaça (Lagenaria siceraria) seca e polida, cada peça é anatomicamente única, possuindo uma base larga de sustentação e um bojo perfeito para moldar a erva. O porongo natural "respira", absorvendo óleos e enriquecendo as infusões futuras com o processo de curtimento.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Material:</strong> Porongo Natural Genuíno de parede grossa</li>
        <li><strong>Acabamento:</strong> Liso envernizado/polido por fora e natural por dentro</li>
        <li><strong>Design:</strong> Bocal tradicional anatômico com base estável</li>
        <li><strong>Processo:</strong> Requer curtimento prévio antes do primeiro uso</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/1238226/cuia_tradicional_lisa_631_1_33432cff649588198e094adba4f63857.jpg",
    "avaliacao": 4.9,
    "avaliacoes": 215
  },
  {
    "id": 22,
    "nome": "Cuia Coquinho de Porongo com Base Trabalhada",
    "categoria": "Cuias",
    "preco": 45.90,
    "descricao": "Modelo individual compacto, ideal para consumir menos erva.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Para quem mora sozinho, trabalha no escritório ou prefere mates mais curtos e rápidos, a Cuia formato 'Coquinho' é a solução inteligente. Seu diâmetro interno menor exige menos quantidade de erva-mate, evitando desperdícios ao longo do mês. Conta com uma base elegantemente esculpida e trabalhada à mão, garantindo estabilidade e evitando acidentes sobre a mesa.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Tamanho:</strong> Compacto (Modelo Coquinho)</li>
        <li><strong>Economia:</strong> Baixo consumo de erva por montagem</li>
        <li><strong>Acabamento:</strong> Base rústica fixa, trabalhada em resina/massa artesanal</li>
        <li><strong>Indicação:</strong> Ideal para mates solitários e ambientes corporativos</li>
      </ul>
    </div>`,
    "imagem": "https://cdn.awsli.com.br/600x450/647/647493/produto/58670477/888e68c69f.jpg",
    "avaliacao": 4.7,
    "avaliacoes": 167
  },
  {
    "id": 23,
    "nome": "Cuia Gajeta Uruguaia de Porongo Bocal Largo",
    "categoria": "Cuias",
    "preco": 52.90,
    "descricao": "Bocal amplo no estilo uruguaio, perfeita para erva cancheada.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Inspirada na milenar cultura matera uruguaia e argentina, a Cuia tipo Gajeta (ou Torpedo) se destaca pelo seu bocal amplamente aberto e paredes grossas de porongo selecionado. Este design facilita enormemente a preparação e o consumo de ervas de moagem grossa (pura folha), permitindo a visualização impecável do montinho. Mantém o calor concentrado no interior, protegendo as mãos.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Estilo:</strong> Gajeta/Torpedo Uruguaia</li>
        <li><strong>Característica Especial:</strong> Bocal largo reforçado em aço inox ou alpaca</li>
        <li><strong>Harmonização:</strong> Perfeita para ervas de moagem grossa/despalada</li>
        <li><strong>Estrutura:</strong> Porongo de casca grossa e durabilidade extrema</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/769607/gajeta_chimarro_uruguaia_rs_1_20260821115448_5bbf6e250a6f.png",
    "avaliacao": 4.8,
    "avaliacoes": 182
  },
  {
    "id": 24,
    "nome": "Bomba de Inox Torcida para Chimarrão com Rosca",
    "categoria": "Bombas",
    "preco": 42.00,
    "descricao": "Aço inox higiênico com bojo rosqueável para fácil limpeza.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A higiene e a durabilidade encontram o design nesta Bomba Torcida. Fabricada em aço inoxidável cirúrgico, ela não enferruja e não transfere sabor metálico à infusão. O grande salto tecnológico é o seu bojo rosqueável: com uma simples torção, você desmonta o filtro para acessar o tubo interno com a escovinha, evitando acúmulo de resíduos. O detalhe 'torcido' atua dissipando o calor da água.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Material:</strong> Aço Inox 304 cirúrgico antiferrugem</li>
        <li><strong>Diferencial Técnico:</strong> Bojo com rosca e sistema desmontável</li>
        <li><strong>Design:</strong> Corpo torcido para controle e dissipação de temperatura</li>
        <li><strong>Acompanha:</strong> Escovinha de higienização interna</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/873814/bomba_chimarrao_inox_torcida_rosqueavel_pequena_5049_1_04fed8e9272b7f334ce1a0bb0b02e99a.jpg",
    "avaliacao": 4.6,
    "avaliacoes": 194
  },
  {
    "id": 25,
    "nome": "Guampa de Chifre de Boi Artesanal para Tereré",
    "categoria": "Guampas",
    "preco": 32.90,
    "descricao": "Recipiente artesanal de chifre bovino com excelente isolamento.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A experiência histórica do Tereré só está completa servida na autêntica Guampa de Chifre de Boi. Produzida artesanalmente a partir de chifres bovinos polidos e higienizados, cada unidade é exclusiva nos padrões de cores. A queratina do chifre age como um isolante térmico fenomenal, garantindo que o gelo não derreta rápido e o suor não molhe suas mãos. Beleza rústica com fundo selado perfeitamente.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Material:</strong> Chifre Bovino Natural (Queratina maciça)</li>
        <li><strong>Processo:</strong> Higienizado, polido e selado artesanalmente</li>
        <li><strong>Isolamento:</strong> Térmico natural de alto desempenho para gelo</li>
        <li><strong>Design:</strong> Peça com coloração orgânica exclusiva em cada unidade</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/631288/guampa_cuia_para_terere_chifre_de_boi_bomba_10591_2_f6e96d2a2363e1eca5f8388f20573348.jpg",
    "avaliacao": 4.5,
    "avaliacoes": 138
  },
  {
    "id": 26,
    "nome": "Guampa Copo de Inox Térmico para Tereré",
    "categoria": "Guampas",
    "preco": 48.90,
    "descricao": "Copo térmico de inox que mantém o tereré trincando de gelado.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A evolução tecnológica chegou às rodas de tereré. Este copo simula a guampa tradicional, porém é construído com parede dupla de aço inoxidável e isolamento a vácuo entre as camadas. O gelo que você coloca de manhã ainda estará presente à tarde. A parede externa não transpira, evitando marcas nas mesas. Altamente resistente, é perfeito para rotinas intensas e viagens sob o sol escaldante.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Material:</strong> Aço Inox com Parede Dupla e Isolamento a Vácuo</li>
        <li><strong>Benefício:</strong> Conservação de gelo prolongada (Não transpira por fora)</li>
        <li><strong>Resistência:</strong> Suporta fortes impactos e quedas sem quebrar</li>
        <li><strong>Formato:</strong> Anatômico, inspirado no perfil da guampa clássica</li>
      </ul>
    </div>`,
    "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0bvv5ZHXTEmX0bxsV45cPaMNQRnV-GrdD_-XBXPpPKOrGkMPLoQXXb_4&s=10",
    "avaliacao": 4.8,
    "avaliacoes": 162
  },
  {
    "id": 27,
    "nome": "Guampa Revestida em Couro Kurupí para Tereré",
    "categoria": "Guampas",
    "preco": 39.90,
    "descricao": "Copo revestido em couro trabalhado ao estilo artesanal.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Unindo a tradição paraguaia ao design funcional, este copo possui interior liso (fácil de lavar e não retém odores) e um exterior imponente revestido em couro sintético trançado, com a gravação estilo Kurupí. O couro age conferindo excelente aderência (grip) às mãos e adiciona uma camada de isolamento térmico macio. Conta com boca larga ideal para abrigar grandes pedras de gelo e limão.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Revestimento:</strong> Couro sintético trabalhado com costuras artesanais</li>
        <li><strong>Interior:</strong> Liso higiênico, de fácil lavagem (não mofa)</li>
        <li><strong>Ergonomia:</strong> Excelente pegada tátil, evitando escorregões</li>
        <li><strong>Estética:</strong> Identidade visual campeira e tradicional (Gravação Kurupí)</li>
      </ul>
    </div>`,
    "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLb1oG8eB9xmK_OQ3KPTQREeOy7pPc3a284D-poSictA_VCUzZhIIkUV6&s=10",
    "avaliacao": 4.4,
    "avaliacoes": 91
  },
  {
    "id": 28,
    "nome": "Bomba de Alpaca Artesanal Torcida com Anel Trabalhado",
    "categoria": "Bombas",
    "preco": 249.00,
    "descricao": "Bomba nobre em alpaca artesanal com alta durabilidade e brilho.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Um verdadeiro artefato para os apaixonados pela cultura mateira. A Alpaca (liga nobre de metais brancos) é reverenciada por seu brilho estonteante, durabilidade quase eterna e ação bacteriostática natural. Esta bomba possui o corpo magistralmente torcido e é coroada por um anel central (passador) cinzelado à mão. Com filtro 'mil furos', proporciona um fluxo de água macio e purificado, elevando a degustação.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Material Base:</strong> Alpaca legítima (Prata Alemã)</li>
        <li><strong>Adornos:</strong> Corpo torcido artesanalmente e passador cinzelado detalhado</li>
        <li><strong>Tipo de Filtro:</strong> Tradicional modelo Pera/Bojo cego com mil furos</li>
        <li><strong>Durabilidade:</strong> Qualidade vitalícia de herança familiar</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/873814/180_bomba_de_alpaca_torcida_com_anel_1_20260422144919_4dd2e7ba4e02.jpg",
    "avaliacao": 5.0,
    "avaliacoes": 73
  },
  {
    "id": 29,
    "nome": "Bomba de Prata e Ouro Trabalhada Rústica",
    "categoria": "Bombas",
    "preco": 449.00,
    "descricao": "Peça de luxo em prata de lei com apliques folheados a ouro 12k.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>O suprassumo do luxo e da ourivesaria focada no seu chimarrão. Fabricada em Prata de Lei genuína e sólida, a estrutura ostenta um peso agradável e um brilho impecável. Os detalhes magnéticos ficam por conta dos apliques florais em alto relevo e o bocal maciço folheados a Ouro 12k. A prata é um poderoso condutor térmico, entregando a melhor pureza de sabor da erva. Uma joia funcional para presentear.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Construção:</strong> Prata de Lei maciça com alto padrão de brilho</li>
        <li><strong>Detalhes de Luxo:</strong> Apliques em relevo e bocal folheados a Ouro 12k</li>
        <li><strong>Desempenho:</strong> Zero interferência metálica no sabor da erva-mate</li>
        <li><strong>Exclusividade:</strong> Design rústico de luxo, focado em colecionadores</li>
      </ul>
    </div>`,
    "imagem": "https://images.tcdn.com.br/img/img_prod/873814/bomba_chimarrao_prata_e_ouro_trabalhada_8440_1_eff5a0d4b36d13a49c495e23b2840998.jpg",
    "avaliacao": 4.9,
    "avaliacoes": 45
  },
  {
    "id": 30,
    "nome": "Garrafa Térmica Termolar Magic Pump 1.8L Inox",
    "categoria": "Garrafas",
    "preco": 129.90,
    "descricao": "Alta conservação térmica com sistema prático de bombeamento.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>A Termolar Magic Pump de 1.8 Litros é a favorita das grandes famílias e escritórios. Seu corpo externo em aço inox escovado evita marcas de dedos e confere estética contemporânea. A ampola de vidro com espelhamento duplo a vácuo mantém a água quente (70°C a 80°C) por mais de 12 horas. O sistema de bomba mecânica com mola reforçada ejeta um fluxo contínuo de água, direto no bocal da sua cuia, sem respingos.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Capacidade Volumétrica:</strong> 1.8 Litros (Alta autonomia de consumo)</li>
        <li><strong>Isolamento:</strong> Ampola de vidro dupla espelhada a vácuo</li>
        <li><strong>Mecanismo:</strong> Magic Pump (Jato forte, preciso e antipingos)</li>
        <li><strong>Revestimento Externo:</strong> Aço Inox escovado de alta resistência</li>
      </ul>
    </div>`,
    "imagem": "https://cdn.awsli.com.br/600x700/987/987576/produto/150818255/154faca022.jpg",
    "avaliacao": 4.8,
    "avaliacoes": 310
  },
  {
    "id": 31,
    "nome": "Garrafa Térmica Mokha Inox de Pressão para Tereré",
    "categoria": "Garrafas",
    "preco": 159.90,
    "descricao": "Inox resistente com parede dupla a vácuo para manter o gelo.",
    "descricaoLonga": `<div style="text-align: justify;">
      <h4>Detalhes da Experiência</h4>
      <p>Desenvolvida para a brutalidade climática. A Garrafa Térmica Mokha abandona a ampola de vidro e adota um corpo íntegro em aço inox 18/8 (interno e externo), suportando impactos, trepidações e quedas sem quebrar. O vácuo profundo preserva líquidos estupidamente gelados por até 24 horas. Possui um bocal de enchimento extra largo, pensado para a facilidade de colocar pedras grandes de gelo, frutas e ervas.</p>
      <h4>Especificações</h4>
      <ul>
        <li><strong>Corpo de Construção:</strong> 100% Aço Inox inquebrável (Parede Dupla)</li>
        <li><strong>Conservação Térmica:</strong> Até 24h para bebidas geladas/com gelo</li>
        <li><strong>Design Inteligente:</strong> Bocal largo para inserção facilitada de pedras de gelo e chás</li>
        <li><strong>Durabilidade:</strong> Extrema, modelo anti-queda ideal para trabalho de campo/agro</li>
      </ul>
    </div>`,
    "imagem": "https://cdn.awsli.com.br/1225/1225595/arquivos/photo-2024-07-31-16-18-29.jpg",
    "avaliacao": 4.7,
    "avaliacoes": 128
  }
];

const formatarMoeda = valor => Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const encontrarProduto = id => produtos.find(p => p.id === Number(id));