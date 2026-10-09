
document.addEventListener("DOMContentLoaded", function () {
    // Procura os cartões dos cantores existentes no seu site.
    const areaCantores = document.querySelector(".cantores");
    const cards = document.querySelectorAll(".cantores .card");

    // Cria os estilos dos novos recursos sem substituir seu CSS.
    const estilos = document.createElement("style");

    estilos.textContent = `
        .pesquisa-musica-raizes {
            display: block;
            width: 90%;
            max-width: 500px;
            box-sizing: border-box;
            margin: 25px auto;
            padding: 14px 18px;
            border: 2px solid #8b5a35;
            border-radius: 25px;
            background: #fffaf3;
            color: #3d2414;
            font-size: 16px;
        }

        .favorito-musica-raizes {
            display: inline-block;
            margin: 8px;
            padding: 7px 12px;
            border: 1px solid #8b5a35;
            border-radius: 20px;
            background: #fffaf3;
            color: #3d2414;
            cursor: pointer;
            font-size: 14px;
        }

        .favorito-musica-raizes:hover {
            background: #f0dfc9;
        }

        #voltarTopoMusicaRaizes {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 999;
            padding: 12px 16px;
            border: none;
            border-radius: 50%;
            background: #3b1f0d;
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 3px 10px #0003;
        }

        #voltarTopoMusicaRaizes:hover {
            transform: translateY(-3px);
        }

        .favoritos-titulo-musica-raizes {
            text-align: center;
            margin: 20px auto;
        }
    `;

    document.head.appendChild(estilos);

    // Cria a pesquisa sem exigir mudanças nos cartões.
    if (areaCantores && !document.getElementById("pesquisaCantores")) {
        const pesquisa = document.createElement("input");

        pesquisa.type = "search";
        pesquisa.id = "pesquisaCantores";
        pesquisa.className = "pesquisa-musica-raizes";
        pesquisa.placeholder = "🔎 Pesquisar cantor ou dupla...";
        pesquisa.setAttribute("aria-label", "Pesquisar cantor ou dupla");

        areaCantores.parentNode.insertBefore(pesquisa, areaCantores);
    }

    const campoPesquisa = document.getElementById("pesquisaCantores");

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    if (campoPesquisa) {
        campoPesquisa.addEventListener("input", function () {
            const termo = normalizar(this.value);

            cards.forEach(function (card) {
                const nome = normalizar(card.textContent);
                card.style.display = nome.includes(termo) ? "" : "none";
            });
        });
    }

    // Recupera os favoritos salvos neste navegador.
    let favoritos = [];

    try {
        const salvos = localStorage.getItem("musicaRaizesFavoritos");
        const dados = salvos ? JSON.parse(salvos) : [];

        if (Array.isArray(dados)) {
            favoritos = dados.filter(function (item) {
                return typeof item === "string";
            });
        }
    } catch (erro) {
        favoritos = [];
    }

    function salvarFavoritos() {
        try {
            localStorage.setItem(
                "musicaRaizesFavoritos",
                JSON.stringify(favoritos)
            );
        } catch (erro) {
            // O site continua funcionando se o navegador bloquear o armazenamento.
        }
    }


    // Cria o botão de voltar ao topo.
    const voltarTopo = document.createElement("button");

    voltarTopo.id = "voltarTopoMusicaRaizes";
    voltarTopo.type = "button";
    voltarTopo.textContent = "↑";
    voltarTopo.title = "Voltar ao topo";
    voltarTopo.setAttribute("aria-label", "Voltar ao topo");

    document.body.appendChild(voltarTopo);

    voltarTopo.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Não altera a função de modo escuro que você já possui.
});


document.addEventListener("DOMContentLoaded", function () {
    // LUPA: cria a pesquisa dos cantores
    let pesquisa = document.getElementById("pesquisaCantores");

    const area = document.querySelector(".cantores");
    const cards = document.querySelectorAll(".cantores .card");

    if (!pesquisa && area) {
        pesquisa = document.createElement("input");
        pesquisa.id = "pesquisaCantores";
        pesquisa.type = "search";
        pesquisa.placeholder = "🔎 Pesquisar cantor ou dupla...";
        pesquisa.className = "pesquisa-musica-raizes";
        pesquisa.setAttribute("aria-label", "Pesquisar cantores");

        area.parentNode.insertBefore(pesquisa, area);
    }

    if (pesquisa) {
        pesquisa.addEventListener("input", function () {
            const termo = this.value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

            cards.forEach(function (card) {
                const texto = card.textContent
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase();

                card.style.display = texto.includes(termo) ? "" : "none";
            });
        });
    }

    // MODO ESCURO: cria o botão no cabeçalho
    let botaoModo = document.getElementById("botaoModo");

    if (!botaoModo) {
        const cabecalho = document.querySelector("header");

        if (cabecalho) {
            botaoModo = document.createElement("button");
            botaoModo.id = "botaoModo";
            botaoModo.type = "button";
            botaoModo.textContent = "🌙 Modo escuro";
            cabecalho.appendChild(botaoModo);
        }
    }

    if (botaoModo) {
        function atualizarModo() {
            const escuro = document.body.classList.contains("escuro");
            botaoModo.textContent = escuro
                ? "☀️ Modo claro"
                : "🌙 Modo escuro";
        }

        botaoModo.addEventListener("click", function () {
            document.body.classList.toggle("escuro");
            atualizarModo();
        });

        atualizarModo();
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const areaCantores = document.querySelector(".cantores");

    // Criar a lupa de pesquisa
    if (areaCantores && !document.getElementById("pesquisaCantores")) {
        const pesquisa = document.createElement("input");
        pesquisa.id = "pesquisaCantores";
        pesquisa.type = "search";
        pesquisa.placeholder = "🔎 Pesquisar cantor ou dupla...";
        pesquisa.className = "pesquisa-musica-raizes";

        areaCantores.parentNode.insertBefore(pesquisa, areaCantores);

        pesquisa.addEventListener("input", function () {
            const normalizar = texto => texto
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();

            document.querySelectorAll(".cantores .card").forEach(card => {
                card.style.display = normalizar(card.textContent)
                    .includes(normalizar(pesquisa.value)) ? "" : "none";
            });
        });
    }

    // Criar o botão de modo claro/escuro
    let botaoModo = document.getElementById("botaoModo");

    if (!botaoModo && document.querySelector("header")) {
        botaoModo = document.createElement("button");
        botaoModo.id = "botaoModo";
        botaoModo.type = "button";
        document.querySelector("header").appendChild(botaoModo);
    }

    if (botaoModo) {
        botaoModo.addEventListener("click", function () {
            document.body.classList.toggle("escuro");
            botaoModo.textContent = document.body.classList.contains("escuro")
                ? "☀️ Modo claro"
                : "🌙 Modo escuro";
        });

        botaoModo.textContent = document.body.classList.contains("escuro")
            ? "☀️ Modo claro"
            : "🌙 Modo escuro";
    }

    // Criar a seta para voltar ao topo
    if (!document.getElementById("voltarTopoMusicaRaizes")) {
        const voltarTopo = document.createElement("button");
        voltarTopo.id = "voltarTopoMusicaRaizes";
        voltarTopo.type = "button";
        voltarTopo.textContent = "↑";
        voltarTopo.title = "Voltar ao topo";
        document.body.appendChild(voltarTopo);

        voltarTopo.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
