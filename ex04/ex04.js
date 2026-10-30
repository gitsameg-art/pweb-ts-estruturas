const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
function formatarMeses(meses) {
    return `${meses} ${meses === 1 ? "mês" : "meses"}`;
}
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let meses = 0;
    let depositado = 0;
    let valorDeposito = deposito;
    while (meses < 600) {
        meses++;
        saldo = saldo * (1 + taxa / 100) + valorDeposito;
        depositado += valorDeposito;
        if (meses % 12 === 0)
            valorDeposito *= 2;
        if (saldo >= meta)
            break;
    }
    return saldo >= meta ? { meses, saldo, depositado } : null;
}
function exibirValor(rotulo, valor, formatar) {
    return `<strong>${rotulo}:</strong> ${formatar(valor)}`;
}
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const meta = Number(document.querySelector("#meta").value);
    const deposito = Number(document.querySelector("#deposito").value);
    const campoTaxa = document.querySelector("#taxa").value.trim();
    const taxa = campoTaxa === "" ? undefined : Number(campoTaxa);
    if (meta <= 0 || deposito <= 0 || (typeof taxa !== "undefined" && taxa < 0)) {
        resultado.textContent = "Informe uma meta e um depósito maiores que zero e uma taxa válida.";
        resultado.className = "resultado erro";
        return;
    }
    const simulacao = typeof taxa === "undefined"
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, taxa);
    if (simulacao === null) {
        resultado.textContent = "A meta não foi alcançada dentro do limite de 600 meses.";
        resultado.className = "resultado erro";
        return;
    }
    resultado.innerHTML = `<strong>Tempo estimado:</strong> ${formatarMeses(simulacao.meses)}<br>${exibirValor("Saldo final", simulacao.saldo, formatarReal)}<br>${exibirValor("Total depositado", simulacao.depositado, formatarReal)}`;
    resultado.className = "resultado sucesso";
});
export {};
//# sourceMappingURL=ex04.js.map