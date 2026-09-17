const readline = require("readline-sync");
readline.setDefaultOptions({ encoding: 'utf-8' });

class Livro{
    constructor(titulo,autor,anoPublicacao){
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicacao = anoPublicacao;
        this.disponivel = true;
    }

    emprestarLivro(){
        if(this.disponivel === true){
            this.disponivel = false
            console.log(`O livro "${this.titulo}" foi emprestado com sucesso! `);
        } else{
            throw new Error(`O livro "${this.titulo}" ja foi emprestado.`);
        }
    }

    devolverLivro(){
        if(this.disponivel === false){
            this.disponivel = true
            console.log(`O livro "${this.titulo}" foi devolvido com sucesso! `);
        } else{
            throw new Error(`O livro "${this.titulo}" ja está disponivel na biblioteca. `);
        }
    }

    statusLivro(){
        if(this.disponivel === true){
            console.log(`O livro "${this.titulo}" está disponivel na bilioteca.`)
        } else{
            console.log(`O livro "${this.titulo}" está emprestado no momento.`)
        }
    }

    exibirInformacoes(){
        let status = this.disponivel ? "Disponivel" : "Indisponivel"

        console.log("\n==== INFORMAÇÕES DO LIVRO ====");
        console.log("Título: " + this.titulo);
        console.log("Autor: " + this.autor);
        console.log("Ano da Publicação: " + this.anoPublicacao);
        console.log("Status: " + status );
    }
}

let titulo;
let autor;
let anoPublicacao;
let cadastroValido = false;

while(cadastroValido === false){
    try{
        console.log("\n==== CADASTRO DO LIVRO ====");
        titulo = readline.question("Digite o título do livro: ");
        if(titulo.trim() === ""){
            throw new Error("O campo título não pode ficar vazio. ");
        }
        autor = readline.question("Digite o nome do autor: ")
        if (autor.trim() === ""){
            throw new Error("O campo autor não pode ficar vazio. ");
        }
        anoPublicacao = readline.questionInt("Informe o ano da publicação do Livro: ");
        if (anoPublicacao <= 0){
            throw new Error("Informe um ano válido. ");
        }
        cadastroValido = true;
    } catch(erro){
        console.log(`[ERRO CAPTURADO]: ${erro.message}`);
    }
}

const meuLivro = new Livro(titulo,autor,anoPublicacao)

let opcao = -1

while(opcao !== 0){
    console.log("\n==== OPÇÕES ====");
    console.log("1- Emprestar Livro: ");
    console.log("2- Devolver Livro: ");
    console.log("3- Status do Livro: ");
    console.log("4- Informações do Livro: ")
    console.log("0- Sair")


    opcao = readline.questionInt("Escolha uma opção: ")
    try{
        if(opcao === 1){
            meuLivro.emprestarLivro();
        }else if(opcao === 2){
            meuLivro.devolverLivro();
        }else if(opcao === 3){
            meuLivro.statusLivro();
        }else if(opcao === 4){
            meuLivro.exibirInformacoes();
        }else if(opcao === 0){
            console.log("Encerrando o sistema. ");
        }else{
            throw new Error("Opção Inválida. Escolha uma das opções disponiveis: (1 a 4) e (0 Para Sair)");
        }
    } catch(erro){
        console.log(`[ERRO CAPTURADO]: ${erro.message} `);
    } finally{
        console.log("Opção Processada. ")
    }
}

