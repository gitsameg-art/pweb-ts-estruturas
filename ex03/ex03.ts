const formulario = document.querySelector<HTMLFormElement>("#formulario")!;
const resultado = document.querySelector<HTMLDivElement>("#resultado")!;
const corpoTabela = document.querySelector<HTMLTableSectionElement>("#parcelas")!;
function calcularTotal(valor: number, parcelas: number): number {
  return parcelas <= 3 ? valor : valor * (1.02 ** parcelas);
}
function simularParcelamento(preco: number, entrada?: number): void {
  corpoTabela.innerHTML = "";
  const valorEntrada = typeof entrada !== "undefined" ? entrada : 0;
  if (preco <= 0 || valorEntrada < 0 || valorEntrada >= preco) {
    resultado.textContent = "Informe um preço válido e uma entrada menor que o preço.";
    resultado.className = "resultado erro"; return;
  }
  const financiado = preco - valorEntrada;
  const indisponiveis: number[] = [7, 8, 9, 11];
  let opcoes = 0;
  for (let quantidade = 1; quantidade <= 12; quantidade++) {
    if (indisponiveis.includes(quantidade)) continue;
    const total = calcularTotal(financiado, quantidade);
    const valorParcela = total / quantidade;
    if (valorParcela < 50) break;
    const linha = document.createElement("tr");
    linha.innerHTML = `<td>${quantidade}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td>`;
    corpoTabela.appendChild(linha);
    opcoes++;
  }
  resultado.textContent = opcoes > 0 ? `Entrada: R$ ${valorEntrada.toFixed(2)}. Valor financiado: R$ ${financiado.toFixed(2)}. Opções disponíveis abaixo.` : "Não há opções de parcelamento que atendam ao valor mínimo de R$ 50,00 por parcela.";
  resultado.className = `resultado ${opcoes > 0 ? "sucesso" : "erro"}`;
}
formulario.addEventListener("submit", (evento: SubmitEvent): void => {
  evento.preventDefault();
  const preco = Number(document.querySelector<HTMLInputElement>("#preco")!.value);
  const campoEntrada = document.querySelector<HTMLInputElement>("#entrada")!.value;
  const entrada = campoEntrada.trim() === "" ? undefined : Number(campoEntrada);
  simularParcelamento(preco, entrada);
});

export {};
