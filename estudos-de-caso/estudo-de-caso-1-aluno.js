const readline = require("readline-sync");

class Aluno {
  constructor(nome) {
    this.nome = nome;
    this.notaGrauA = 0;
    this.notaGrauB = 0;
  }

  calcularMediaFinal() {
    return (this.notaGrauA * 1 + this.notaGrauB * 2) / 3;
  }

  substituirGrau() {
    const grau = readline.question("Qual grau deseja substituir (A ou B)? ");

    if (grau.toUpperCase() === "A") {
      this.notaGrauA = readline.questionFloat("Informe a nova nota de Grau A: ");
    } else if (grau.toUpperCase() === "B") {
      this.notaGrauB = readline.questionFloat("Informe a nova nota de Grau B: ");
    } else {
      console.log("Opção inválida! Escolha apenas 'A' ou 'B'.");
    }
  }
}

const nomeAluno = readline.question("Digite o nome do aluno: ");
const aluno = new Aluno(nomeAluno);

// 2. Definindo as notas iniciais
aluno.notaGrauA = readline.questionFloat("Informe a nota de Grau A: ");
aluno.notaGrauB = readline.questionFloat("Informe a nota de Grau B: ");

aluno.substituirGrau();

console.log("\n--- Dados do Aluno ---");
console.log("Nome: " + aluno.nome);
console.log("Grau A: " + aluno.notaGrauA);
console.log("Grau B: " + aluno.notaGrauB);
console.log("Média Final: " + aluno.calcularMediaFinal());