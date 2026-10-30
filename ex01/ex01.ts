const formulario = document.querySelector<HTMLFormElement>("#formulario")!;
const resultado = document.querySelector<HTMLDivElement>("#resultado")!;

function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}
function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return n1 >= 0 && n1 <= 10 && n2 >= 0 && n2 <= 10 &&
    frequencia >= 0 && frequencia <= 100;
}
function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) return "Reprovado por frequência";
  if (media >= 7) return "Aprovado";
  if (media >= 4) return `Exame final (precisa de ${(10 - media).toFixed(1)} pontos)`;
  return "Reprovado por nota";
}
formulario.addEventListener("submit", (evento: SubmitEvent): void => {
  evento.preventDefault();
  const nome = document.querySelector<HTMLInputElement>("#nome")!.value.trim();
  const n1 = Number(document.querySelector<HTMLInputElement>("#n1")!.value);
  const n2 = Number(document.querySelector<HTMLInputElement>("#n2")!.value);
  const frequencia = Number(document.querySelector<HTMLInputElement>("#frequencia")!.value);
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
