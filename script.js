// MENU RESPONSIVO DO CATÁLOGO

const menuBtn = document.getElementById("menuBtn");

const menu = document.getElementById("menu");


// ABRIR E FECHAR MENU

menuBtn.addEventListener("click", () => {

    const estaAberto = menu.classList.toggle("aberto");

    menuBtn.setAttribute("aria-expanded", estaAberto);

    menuBtn.textContent = estaAberto ? "×" : "☰";
    menuBtn.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");

});


// FECHAR MENU AO CLICAR EM UMA OPÇÃO

menu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        menu.classList.remove("aberto");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-label", "Abrir menu");

    });
});


// CONTROLES DO CARROSSEL DE OBRAS

const obrasFaixa = document.getElementById("obrasFaixa");
const obraAnterior = document.getElementById("obraAnterior");
const proximaObra = document.getElementById("proximaObra");
const contadorObras = document.getElementById("contadorObras");

if (obrasFaixa && obraAnterior && proximaObra) {
    const obras = Array.from(obrasFaixa.querySelectorAll(".obra-imagem"));

    const atualizarControlesObras = () => {
        const indiceAtual = Math.round(obrasFaixa.scrollLeft / obrasFaixa.clientWidth);

        obraAnterior.disabled = indiceAtual <= 0;
        proximaObra.disabled = indiceAtual >= obras.length - 1;
        if (contadorObras) {
            contadorObras.textContent = `Obra ${indiceAtual + 1} de ${obras.length}`;
        }
    };

    const moverCarrossel = (direcao) => {
        const indiceAtual = Math.round(obrasFaixa.scrollLeft / obrasFaixa.clientWidth);
        const proximoIndice = Math.max(0, Math.min(indiceAtual + direcao, obras.length - 1));

        obrasFaixa.scrollTo({
            left: proximoIndice * obrasFaixa.clientWidth,
            behavior: "smooth"
        });
    };

    obraAnterior.addEventListener("click", () => moverCarrossel(-1));
    proximaObra.addEventListener("click", () => moverCarrossel(1));
    obrasFaixa.addEventListener("scroll", atualizarControlesObras, { passive: true });
    window.addEventListener("resize", atualizarControlesObras);
    atualizarControlesObras();
}
