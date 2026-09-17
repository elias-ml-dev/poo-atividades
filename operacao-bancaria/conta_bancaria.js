const readline = require("readline-sync");

class ContaBancaria{
    constructor(titular,saldoInicial){
        this.titular = titular;
        this.saldoInicial = saldoInicial
    }
    

    depositarValor(valor){
        if(valor <= 0){
            throw new Error("O valor do depósito deve ser maior que zero.");
        }else{
            this.saldoInicial = this.saldoInicial + valor;
            console.log(`Depósito de R$ ${valor} realizado com sucesso!`);
            console.log(`O saldo atual é de R$ ${this.saldoInicial}`);
        }
    }

    sacarValor(valor){
        if(valor > this.saldoInicial){
            throw new Error("Saldo insuficiente para realizar o saque.");
        }else if(valor <= 0){
            throw new Error("O valor do saque deve ser maior que zero.");
        }else{
            this.saldoInicial = this.saldoInicial - valor
            console.log(`O saldo atual é de R$ ${this.saldoInicial}`);
        }
    }
}
const titular = readline.question("Digite o nome do titular: ");
const conta = new ContaBancaria(titular,100)

try {
    conta.depositarValor(50);
    conta.sacarValor(20);

    conta.sacarValor(500);

} catch (erro) {
    console.log(`[ERRO CAPTURADO]: ${erro.message}`);
} finally {
    console.log("Operação bancária finalizada.");
}