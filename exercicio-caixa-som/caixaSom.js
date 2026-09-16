const readline = require("readline-sync");

class CaixaSom{
    constructor(marca){
        this.marca = marca;
        this.ligada = false;
        this.volume = 10
    }

    ligarSom(){
        if(this.ligada === true){
            console.log(`A caixa de som "${this.marca}" já esta ligada. `);
        } else{
            this.ligada = true
            console.log(`Caixa de som "${this.marca}" foi ligada com sucesso! `);
        }
    }

    desligarSom(){
        if(this.ligada === false){
            console.log(`A caixa de som "${this.marca}" já esta desligada. `);
        } else{
            this.ligada = false
            console.log(`Caixa de som "${this.marca}" foi desligada com sucesso! `);
        }
    }

    aumentarVolume(){
        if(this.ligada === false){
            throw new Error (`A caixa de som "${this.marca}" precisa estar ligada para aumentar o volume. `);
        } else{
            if(this.volume >= 100){
                throw new Error ("Volume não pode ultrapassar 100 ")
            } else{
                this.volume++
                console.log(`Volume atual é: "${this.volume}" `);
            }
        }
    }

    diminuirVolume(){
        if(this.ligada === false){
            throw new Error (`A caixa de som "${this.marca}" precisa estar ligada para diminuir o volume. `);
        } else{
            if(this.volume <= 0){
                throw new Error ("Volume não pode ser inferior a 0 ")
            } else{
                this.volume--
                console.log(`Volume atual é: "${this.volume}" `);
            }
        }
    }

    statusCaixa(){
        let status = this.ligada ? "Ligada" : "Desligada"
        
        console.log("\n==== DESCRIÇÃO DA CAIXA ====")
        console.log("Marca: " + this.marca);
        console.log("Volume: " + this.volume);
        console.log("Status:" + status);
    }

}

console.log("\n==== CADASTRE A CAIXA DE SOM: ====")
const marca = readline.question("Digite a marca da caixa: ");
const minhaCaixa = new CaixaSom(marca)

let opcao = -1

while(opcao !== 0){
    console.log("1- Ligar");
    console.log("2- Desligar");
    console.log("3- Aumentar");
    console.log("4- Diminuir");
    console.log("5- Status");
    console.log("0- SAIR")

    opcao = readline.questionInt("Escolha uma opção: ")
    try{
        if(opcao === 1){
            minhaCaixa.ligarSom();
        } else if(opcao === 2){
            minhaCaixa.desligarSom();
        } else if(opcao === 3){
            minhaCaixa.aumentarVolume();
        } else if(opcao === 4){
            minhaCaixa.diminuirVolume();
        } else if(opcao === 5){
            minhaCaixa.statusCaixa();
        } else if(opcao === 0){
            console.log("Encerrando o sistema. ");
        } else{
            throw new Error("Opção inválida")
        }
    } catch(erro){
        console.log(`[Erro CAPITURADO]: ${erro.message}`);
    } finally{
        console.log("Opção processada.")
    }
}