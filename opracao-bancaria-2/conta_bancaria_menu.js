const readline = require("readline-sync");

class ContaBancaria{
    constructor(titular){
        this.titular = titular;
        this.saldoAtual = 100;
    }

    depositarValor(){
        let depositar = readline.questionFloat("Informe o valor que deseja depositar: ");
        if(depositar <= 0){
            throw new Error("O valor do depósito deve ser maior que zero.");
        } else{
            this.saldoAtual = this.saldoAtual + depositar;
            console.log(`Saldo atual: R$ ${this.saldoAtual}`);
        }
    }

    sacarValor(){
        let sacar = readline.questionFloat("Informe o valor que deseja sacar: ");
        if(sacar > this.saldoAtual){
            throw new Error("Saldo insuficiente para realizar o saque.");
        }else if(sacar <= 0){
            throw new Error("O valor do saque deve ser maior que zero.");
        }else{
            this.saldoAtual = this.saldoAtual - sacar;
            console.log(`Saldo atual: R$ ${this.saldoAtual}`);
        }
    }

    consultarSaldo(){
        console.log("\n==== SALDO ====");
        console.log("Nome: " + this.titular);
        console.log(`Seu saldo atual é de: R$ ${this.saldoAtual}`);
    }
}

const titular = readline.question("Digite o nome do titular: ");
const conta = new ContaBancaria(titular);

let opcao = -1

while(opcao !== 0){
    console.log("\n==== MENU ====");
    console.log("1- Depositar Valor: ");
    console.log("2- Sacar Valor: ");
    console.log("3- Consultar Saldo: ");
    console.log("0- Sair")

    opcao = readline.questionInt("Escolha uma opção: ");
    if(opcao === 0){
        console.log("Encerrando Programa...");
    } else{
        try{
            if(opcao === 1){
                conta.depositarValor();
            }else if(opcao === 2){
                conta.sacarValor();
            }else if(opcao === 3){
                conta.consultarSaldo();
            }else{
                throw new Error(`Opção inválida... Escolha apenas as opções do "MENU" `);
            }
        } catch(erro){
            console.log(`[ERRO CAPTURADO]: ${erro.message}`);
        } finally{
            console.log("Opção Processada.")
        }
    }
}
