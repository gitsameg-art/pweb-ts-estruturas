type Formatador = (valor: number) => string;
const formulario = document.querySelector<HTMLFormElement>("#formulario")!;
const resultado = document.querySelector<HTMLDivElement>("#resultado")!;
function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const precos: number[] = [];
  let ignorados = 0;
  const linhas = texto.split("\n");
  for (const linha of linhas) {
    if (linha.trim() === "") continue;
    const valor = Number(linha.trim().replace(",", "."));
    if (!Number.isFinite(valor) || valor <= 0) { ignorados++; continue; }
    if (precos.length >= 20) break;
    precos.push(valor);
  }
  return { precos, ignorados };
}
function somarItens(...precos: number[]): number {
  return precos.reduce((soma: number, preco: number) => soma + preco, 0);
}
function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, desconto: number | string): number {
  if (typeof desconto === "number") return total * (desconto / 100);
  switch (desconto.toUpperCase()) {
    case "BEMVINDO": return total * 0.10;
    case "PROMO20": return total * 0.20;
    case "MENOS15": return total >= 100 ? 15 : 0;
    default: return 0;
  }
}
const formatarReal: Formatador = (valor: number): string => `R$ ${valor.toFixed(2)}`;
formulario.addEventListener("submit", (evento: SubmitEvent): void => {
  evento.preventDefault();
  const leitura = lerPrecos(document.querySelector<HTMLTextAreaElement>("#precos")!.value);
  const cupom = document.querySelector<HTMLInputElement>("#cupom")!.value.trim();
  const fidelidade = document.querySelector<HTMLInputElement>("#fidelidade")!.checked;
  if (leitura.precos.length === 0) {
    resultado.textContent = `Nenhum item válido. Linhas ignoradas: ${leitura.ignorados}.`;
    resultado.className = "resultado erro"; return;
  }
  const subtotal = somarItens(...leitura.precos);
  const cupomValido = ["BEMVINDO", "PROMO20"].includes(cupom.toUpperCase()) ||
    (cupom.toUpperCase() === "MENOS15" && subtotal >= 100);
  const descontoCupom = cupomValido ? calcularDesconto(subtotal, cupom) : 0;
  const aposCupom = subtotal - descontoCupom;
  const descontoFidelidade = fidelidade ? calcularDesconto(aposCupom, 5) : 0;
  const total = aposCupom - descontoFidelidade;
  const mensagemCupom = cupom === "" ? "Nenhum cupom informado." :
    cupomValido ? `Cupom ${cupom.toUpperCase()} aplicado.` : "Cupom inválido ou não aplicável.";
  resultado.innerHTML = `<strong>Itens válidos:</strong> ${leitura.precos.length}<br><strong>Linhas ignoradas:</strong> ${leitura.ignorados}<br>${`<strong>Subtotal:</strong> ${formatarReal(subtotal)}`}<br><strong>Desconto do cupom:</strong> ${formatarReal(descontoCupom)}<br><strong>Desconto fidelidade:</strong> ${formatarReal(descontoFidelidade)}<br><strong>Total a pagar:</strong> ${formatarReal(total)}<br>${mensagemCupom}`;
  resultado.className = "resultado sucesso";
});

export {};
