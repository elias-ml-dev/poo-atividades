const readline = require("readline-sync");

class CaixaSom{
    constructor(marca){
        this.marca = marca;
        this.ligada = false;
        this.volume = 10
    }

    ligarSom() {
        if (this.ligada === true) {
            console.log(`A caixa de som "${this.marca}" já está ligada!`);
        } else {
            this.ligada = true;
            console.log(`A caixa de som "${this.marca}" foi ligada com sucesso!`);
        }
    }

    desligarSom() {
        if (this.ligada === false) {
            console.log(`A caixa de som "${this.marca}" já está desligada!`);
        } else {
            this.ligada = false;
            console.log(`A caixa de som "${this.marca}" foi desligada com sucesso!`);
        }
    }   

    aumentarVolume(){
        if(this.ligada === false){
            console.log("Não é possivel alterar o volume com o aparelho desligado! ")
        } else{
            this.volume++
            console.log(`O volume atual é: "${this.volume}"`)
        }
    }

    exibirStatus() {
        const status = this.ligada ? "Ligada" : "Desligada";

        console.log(`\n--- Informações da caixa de som ---`);
        console.log(`Marca: ${this.marca}`);
        console.log(`Volume: ${this.volume}`);
        console.log(`Status: ${status}`);
    }
}

console.log("=== CADASTRO DA CAIXA DE SOM ===")
const marca = readline.question("Digite a marca da caixa de som: ")

const minhaCaixa = new CaixaSom(marca);

let opcao = 0;

while (opcao!== 5){
    console.log("\n--- MENU DA CAIXA DE SOM ---");
    console.log("1. Ligar");
    console.log("2. Desligar");
    console.log("3. Aumentar Volume");
    console.log("4. Exibir Status");
    console.log("5. Sair");

    opcao = readline.questionInt("Escolha uma opção: ");
    if (opcao === 1) {
        minhaCaixa.ligarSom();
    } else if (opcao === 2) {
        minhaCaixa.desligarSom();
    } else if (opcao === 3) {
        minhaCaixa.aumentarVolume();
    } else if (opcao === 4) {
        minhaCaixa.exibirStatus();
    } else if (opcao === 5){
        console.log("Encerrando o sistema...");
    } else {
        console.log("Opção inválida! Escolha um número de 1 a 5")
    }
}