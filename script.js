
/* ACORDEÃO */
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.classList.toggle("aberto");

        const simbolo = botao.querySelector("span");
        if (simbolo) {
            simbolo.textContent = aberto ? "−" : "+";
        }

        botao.setAttribute("aria-expanded", aberto);
    });
});

/* LINHA DO TEMPO */
function mostrarAno(id, botao) {
    document.querySelectorAll(".evento").forEach(evento => {
        evento.classList.remove("ativo");
    });

    document.querySelectorAll(".anos button").forEach(btn => {
        btn.classList.remove("ativo");
    });

    const evento = document.getElementById(id);

    if (evento) {
        evento.classList.add("ativo");
        botao.classList.add("ativo");
    }
}

/* QUIZ */
const perguntas = [
    {
        pergunta: "Segundo Arrhenius, o que um ácido aumenta em água?",
        alternativas: [
            "A concentração de OH⁻",
            "A concentração de H₃O⁺",
            "A concentração de elétrons livres",
            "A concentração de átomos de sódio"
        ],
        correta: 1,
        explicacao:
            "Ácidos de Arrhenius aumentam a concentração de H₃O⁺ em solução aquosa."
    },
    {
        pergunta: "Qual íon caracteriza uma base de Arrhenius?",
        alternativas: ["H₃O⁺", "Cl⁻", "OH⁻", "Na⁺"],
        correta: 2,
        explicacao:
            "Uma base de Arrhenius aumenta a concentração de íons OH⁻ em água."
    },
    {
        pergunta: "Qual destas substâncias é um ácido?",
        alternativas: ["NaOH", "KOH", "HCl", "Ca(OH)₂"],
        correta: 2,
        explicacao:
            "HCl é o ácido clorídrico. Em água, ele ioniza e forma H₃O⁺ e Cl⁻."
    },
    {
        pergunta: "Qual é um exemplo de base de Arrhenius?",
        alternativas: ["HNO₃", "H₂SO₄", "NaOH", "HCl"],
        correta: 2,
        explicacao:
            "O hidróxido de sódio libera íons OH⁻ ao se dissociar em água."
    },
    {
        pergunta: "O que ocorre na neutralização entre ácido e base?",
        alternativas: [
            "Forma-se somente oxigênio",
            "H₃O⁺ e OH⁻ reagem, formando água",
            "Todos os íons desaparecem",
            "Forma-se sempre um gás"
        ],
        correta: 1,
        explicacao:
            "A reação H₃O⁺ + OH⁻ → 2 H₂O representa a neutralização iônica."
    },
    {
        pergunta: "Quem desenvolveu a teoria da dissociação eletrolítica?",
        alternativas: [
            "Svante Arrhenius",
            "Isaac Newton",
            "Charles Darwin",
            "Niels Bohr"
        ],
        correta: 0,
        explicacao:
            "Svante Arrhenius foi um cientista sueco que contribuiu para a teoria da dissociação eletrolítica."
    }
];

let indice = 0;
let pontos = 0;
let respondida = false;

function iniciarQuiz() {
    const pergunta = document.getElementById("pergunta");

    if (!pergunta) return;

    indice = 0;
    pontos = 0;
    mostrarPergunta();
}

function mostrarPergunta() {
    const pergunta = perguntas[indice];

    document.getElementById("progresso").textContent =
        `Pergunta ${indice + 1} de ${perguntas.length}`;

    document.getElementById("pergunta").textContent =
        pergunta.pergunta;

    document.getElementById("feedback").textContent = "";

    const alternativas = document.getElementById("alternativas");
    alternativas.innerHTML = "";

    document.getElementById("proxima").style.display = "none";
    respondida = false;

    pergunta.alternativas.forEach((texto, i) => {
        const botao = document.createElement("button");

        botao.className = "opcao";
        botao.textContent = texto;

        botao.addEventListener("click", () => responder(i));

        alternativas.appendChild(botao);
    });
}

function responder(escolha) {
    if (respondida) return;

    respondida = true;

    const pergunta = perguntas[indice];
    const botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach((botao, i) => {
        botao.disabled = true;

        if (i === pergunta.correta) {
            botao.classList.add("correta");
        } else if (i === escolha) {
            botao.classList.add("errada");
        }
    });

    if (escolha === pergunta.correta) {
        pontos++;
        document.getElementById("feedback").textContent =
            "Correto! " + pergunta.explicacao;
    } else {
        document.getElementById("feedback").textContent =
            "Não foi dessa vez. " + pergunta.explicacao;
    }

    const proxima = document.getElementById("proxima");
    proxima.textContent =
        indice === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";

    proxima.style.display = "inline-block";
}

function proximaPergunta() {
    if (!respondida) return;

    indice++;

    if (indice < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("progresso").textContent =
        "Quiz concluído!";

    document.getElementById("pergunta").textContent =
        `Você acertou ${pontos} de ${perguntas.length} questões!`;

    document.getElementById("alternativas").innerHTML = "";

    document.getElementById("feedback").textContent =
        pontos === perguntas.length
            ? "Excelente! Você domina os conceitos fundamentais."
            : pontos >= 4
                ? "Muito bem! Revise os conceitos para melhorar ainda mais."
                : "Continue estudando e tente novamente!";

    const proxima = document.getElementById("proxima");
    proxima.textContent = "Refazer quiz";
    proxima.style.display = "inline-block";
    proxima.onclick = () => {
        proxima.onclick = proximaPergunta;
        iniciarQuiz();
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const proxima = document.getElementById("proxima");

    if (proxima) {
        proxima.onclick = proximaPergunta;
        iniciarQuiz();
    }

    const pagina = location.pathname.split("/").pop();

    document.querySelectorAll(".menu a").forEach(link => {
        if (link.getAttribute("href") === pagina) {
            link.classList.add("ativo");
        }
    });
});
