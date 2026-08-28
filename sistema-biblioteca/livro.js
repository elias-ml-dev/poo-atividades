const readline = require("readline-sync")
readline.setDefaultOptions({ encoding: 'utf-8' });

class Livro {
    constructor(titulo, autor, anoPublicacao) {
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = true;
    }

    emprestarLivro() {
        if (this.disponivel === true) {
            this.disponivel = false;
            console.log(`O livro "${this.titulo}" foi emprestado com sucesso!`);
        } else {
            console.log(`O livro "${this.titulo}" não está disponível para empréstimo.`);
        }
    }

    devolverLivro() {
        if (this.disponivel=== false){
            this.disponivel = true;
            console.log(`O livro "${this.titulo}" foi devolvido com sucesso!`);
        } else {
            console.log(`O livro "${this.titulo}" já está disponível na biblioteca.`);
        }
    }

    verificarDisponibilidade(){
        if(this.disponivel === true){
            console.log(`O livro "${this.titulo}" está disponivel`)
        } else{
            console.log(`O livro "${this.titulo}" não está disponivel no momento`)
        }
    }

    exibirInformacoes() {
        const status = this.disponivel ? "Disponível" : "Emprestado";

        console.log(`\n--- Informações do Livro ---`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Ano: ${this.anoPublicacao}`);
        console.log(`Status: ${status}`);
    }
}

console.log("=== CADASTRO DO NOVO LIVRO ===");
const titulo = readline.question("Digite o título do livro: ");
const autor = readline.question("Digite o autor do livro: ");
const anoPublicacao = readline.questionInt("Digite o ano de publicação: ");

const meuLivro = new Livro(titulo, autor, anoPublicacao);

let opcao = 0;

while (opcao !== 5){
    console.log("\n--- MENU DA BIBLIOTECA ---");
    console.log("1. Emprestar livro");
    console.log("2. Devolver livro");
    console.log("3. Verificar disponibilidade");
    console.log("4. Exibir informações completas");
    console.log("5. Sair");

    opcao = readline.questionInt("Escolha uma opção: ");

    if (opcao === 1) {
        meuLivro.emprestarLivro();
    } else if (opcao === 2) {
        meuLivro.devolverLivro();
    } else if (opcao === 3) {
        meuLivro.verificarDisponibilidade();
    } else if (opcao === 4) {
        meuLivro.exibirInformacoes();
    } else if (opcao === 5){
        console.log("Encerrando o sistema...");
    } else {
        console.log("Opção inválida! Escolha um número de 1 a 5")
    }
}