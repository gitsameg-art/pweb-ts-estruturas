type Formatador = (valor: number) => string;
const formulario = document.querySelector<HTMLFormElement>("#formulario")!;
const resultado = document.querySelector<HTMLDivElement>("#resultado")!;
const formatarReal: Formatador = (valor: number): string =>
  `R$ ${valor.toFixed(2)}`;
function formatarMeses(meses: number): string {
  return `${meses} ${meses === 1 ? "mês" : "meses"}`;
}
function calcularMeses(meta: number, deposito: number, taxa: number = 0.5):
  { meses: number; saldo: number; depositado: number } | null {
  let saldo = 0;
  let meses = 0;
  let depositado = 0;
  let valorDeposito = deposito;
  while (meses < 600) {
    meses++;
    saldo = saldo * (1 + taxa / 100) + valorDeposito;
    depositado += valorDeposito;
    if (meses % 12 === 0) valorDeposito *= 2;
    if (saldo >= meta) break;
  }
  return saldo >= meta ? { meses, saldo, depositado } : null;
}
function exibirValor(rotulo: string, valor: number, formatar: Formatador): string {
  return `<strong>${rotulo}:</strong> ${formatar(valor)}`;
}
formulario.addEventListener("submit", (evento: SubmitEvent): void => {
  evento.preventDefault();
  const meta = Number(document.querySelector<HTMLInputElement>("#meta")!.value);
  const deposito = Number(document.querySelector<HTMLInputElement>("#deposito")!.value);
  const campoTaxa = document.querySelector<HTMLInputElement>("#taxa")!.value.trim();
  const taxa = campoTaxa === "" ? undefined : Number(campoTaxa);
  if (meta <= 0 || deposito <= 0 || (typeof taxa !== "undefined" && taxa < 0)) {
    resultado.textContent = "Informe uma meta e um depósito maiores que zero e uma taxa válida.";
    resultado.className = "resultado erro"; return;
  }
  const simulacao = typeof taxa === "undefined"
    ? calcularMeses(meta, deposito)
    : calcularMeses(meta, deposito, taxa);
  if (simulacao === null) {
    resultado.textContent = "A meta não foi alcançada dentro do limite de 600 meses.";
    resultado.className = "resultado erro"; return;
  }
  resultado.innerHTML = `<strong>Tempo estimado:</strong> ${formatarMeses(simulacao.meses)}<br>${exibirValor("Saldo final", simulacao.saldo, formatarReal)}<br>${exibirValor("Total depositado", simulacao.depositado, formatarReal)}`;
  resultado.className = "resultado sucesso";
});

export {};
