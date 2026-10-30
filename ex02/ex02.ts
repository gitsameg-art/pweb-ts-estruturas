type TipoCliente = "residencial" | "rural" | "comercial" | "industrial";
type Bandeira = "verde" | "amarela" | "vermelha1" | "vermelha2";
const formulario = document.querySelector<HTMLFormElement>("#formulario")!;
const resultado = document.querySelector<HTMLDivElement>("#resultado")!;

function tarifaCliente(tipo: TipoCliente): number {
  switch (tipo) {
    case "residencial": case "rural": return 0.80;
    case "comercial": case "industrial": return 0.95;
  }
}
function adicionalBandeira(consumo: number, bandeira: Bandeira = "verde"): number {
  let valorPorKwh: number;
  switch (bandeira) {
    case "verde": valorPorKwh = 0; break;
    case "amarela": valorPorKwh = 0.02; break;
    case "vermelha1": valorPorKwh = 0.04; break;
    case "vermelha2": valorPorKwh = 0.08; break;
    default: valorPorKwh = 0;
  }
  return consumo * valorPorKwh;
}
function mensagemBandeira(bandeira: Bandeira): string {
  switch (bandeira) {
    case "verde": return "Bandeira verde: sem cobrança adicional.";
    case "amarela": return "Bandeira amarela: cobrança adicional aplicada.";
    case "vermelha1": return "Bandeira vermelha 1: cobrança adicional aplicada.";
    case "vermelha2": return "Bandeira vermelha 2: cobrança adicional aplicada.";
    default: return "Bandeira não reconhecida.";
  }
}
// Teste solicitado: adicionalBandeira(100) retorna 0, pois a bandeira padrão é verde.
formulario.addEventListener("submit", (evento: SubmitEvent): void => {
  evento.preventDefault();
  const consumo = Number(document.querySelector<HTMLInputElement>("#consumo")!.value);
  const tipo = document.querySelector<HTMLSelectElement>("#cliente")!.value as TipoCliente;
  const bandeira = document.querySelector<HTMLSelectElement>("#bandeira")!.value as Bandeira;
  if (!Number.isFinite(consumo) || consumo <= 0) {
    resultado.textContent = "Consumo inválido. Informe um valor maior que zero.";
    resultado.className = "resultado erro"; return;
  }
  const energia = consumo * tarifaCliente(tipo);
  const extra = adicionalBandeira(consumo, bandeira);
  const total = energia + extra;
  resultado.innerHTML = `<strong>Energia:</strong> R$ ${energia.toFixed(2)}<br><strong>Adicional da bandeira:</strong> R$ ${extra.toFixed(2)}<br><strong>Total:</strong> R$ ${total.toFixed(2)}<br>${mensagemBandeira(bandeira)}`;
  resultado.className = `resultado ${bandeira === "verde" ? "" : "alerta"}`;
});

export {};
