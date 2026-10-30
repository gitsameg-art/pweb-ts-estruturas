const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
function dadosValidos(n1, n2, frequencia) {
    return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 &&
        frequencia >= 0 && frequencia <= 100;
}
function situacao(media, frequencia) {
    if (frequencia < 75)
        return "Reprovado por frequência";
    if (media >= 7)
        return "Aprovado";
    if (media >= 4)
        return `Exame final (precisa de ${(10 - media).toFixed(1)} pontos)`;
    return "Reprovado por nota";
}
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = document.querySelector("#nome").value.trim();
    const n1 = Number(document.querySelector("#n1").value);
    const n2 = Number(document.querySelector("#n2").value);
    const frequencia = Number(document.querySelector("#frequencia").value);
    if (!nome || !dadosValidos(n1, n2, frequencia)) {
        resultado.textContent = "Dados inválidos. Confira os campos informados.";
        resultado.className = "resultado erro";
        return;
    }
    const media = calcularMedia(n1, n2);
    const status = situacao(media, frequencia);
    resultado.innerHTML = `<strong>Aluno:</strong> ${nome}<br><strong>Média:</strong> ${media.toFixed(1)}<br><strong>Situação:</strong> ${status}`;
    resultado.className = `resultado ${status === "Aprovado" ? "sucesso" : "erro"}`;
});
export {};
//# sourceMappingURL=ex01.js.map