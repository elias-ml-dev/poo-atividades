const readline = require("readline-sync");

class ContaBancaria{
    constructor(titular,saldoInicial){
        this.titular = titular;
        this.saldoInicial = saldoInicial
    }
    

    depositar(valor){
        if(valor <= 0){
            throw new Error("O valor do depósito deve ser maior que zero.");
        }else{
            this.saldoInicial = this.saldoInicial + valor;
            console.log(`Depósito de R$ ${valor} realizado com sucesso!`);
            console.log(`O saldo atual é de R$ ${this.saldoInicial}`);
        }
    }

    sacar(valor){
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
const saldoInicial = readline.questionFloat("Digite o saldo Inicial: Ex: ");
const conta = new ContaBancaria(titular, saldoInicial)

try {

    console.log(`\nTitular: ${conta.titular}`);
    
    const valorDeposito = readline.questionFloat("Digite o valor que deseja depositar: ");
    conta.depositar(valorDeposito);

    const valorSaque = readline.questionFloat("Digite o valor que deseja sacar: ");
    conta.sacar(valorSaque);

} catch (erro) {
    console.log(`[ERRO CAPTURADO]: ${erro.message}`);
} finally {
    console.log("Operação bancária finalizada.");
}