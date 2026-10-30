const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
function tarifaCliente(tipo) {
    switch (tipo) {
        case "residencial":
        case "rural": return 0.80;
        case "comercial":
        case "industrial": return 0.95;
    }
}
function adicionalBandeira(consumo, bandeira = "verde") {
    let valorPorKwh;
    switch (bandeira) {
        case "verde":
            valorPorKwh = 0;
            break;
        case "amarela":
            valorPorKwh = 0.02;
            break;
        case "vermelha1":
            valorPorKwh = 0.04;
            break;
        case "vermelha2":
            valorPorKwh = 0.08;
            break;
        default: valorPorKwh = 0;
    }
    return consumo * valorPorKwh;
}
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case "verde": return "Bandeira verde: sem cobrança adicional.";
        case "amarela": return "Bandeira amarela: cobrança adicional aplicada.";
        case "vermelha1": return "Bandeira vermelha 1: cobrança adicional aplicada.";
        case "vermelha2": return "Bandeira vermelha 2: cobrança adicional aplicada.";
        default: return "Bandeira não reconhecida.";
    }
}
// Teste solicitado: adicionalBandeira(100) retorna 0, pois a bandeira padrão é verde.
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const consumo = Number(document.querySelector("#consumo").value);
    const tipo = document.querySelector("#cliente").value;
    const bandeira = document.querySelector("#bandeira").value;
    if (!Number.isFinite(consumo) || consumo <= 0) {
        resultado.textContent = "Consumo inválido. Informe um valor maior que zero.";
        resultado.className = "resultado erro";
        return;
    }
    const energia = consumo * tarifaCliente(tipo);
    const extra = adicionalBandeira(consumo, bandeira);
    const total = energia + extra;
    resultado.innerHTML = `<strong>Energia:</strong> R$ ${energia.toFixed(2)}<br><strong>Adicional da bandeira:</strong> R$ ${extra.toFixed(2)}<br><strong>Total:</strong> R$ ${total.toFixed(2)}<br>${mensagemBandeira(bandeira)}`;
    resultado.className = `resultado ${bandeira === "verde" ? "" : "alerta"}`;
});
export {};
//# sourceMappingURL=ex02.js.map