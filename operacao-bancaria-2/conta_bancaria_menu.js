const readline = require("readline-sync");

class ContaBancaria{
    constructor(titular){
        this.titular = titular;
        this.saldoAtual = 100;
    }

    depositarValor(){
        let depositar = readline.questionFloat("Digite o valor que deseja depositar: ");
        if(depositar <= 0){
            throw new Error("O valor do depósito deve ser maior que zero.");
        } else{
            this.saldoAtual += depositar;
            console.log(`Saldo atual: ${this.saldoAtual}`);
        }
    }

    sacarValor(){
        let sacar = readline.questionFloat("Digite o valor que deseja sacar: ");
        if(sacar > this.saldoAtual){
            throw new Error("Saldo insuficiente para realizar o saque.");
        }else if(sacar <= 0){
            throw new Error("O valor do saque deve ser maior que zero.");
        }else{
            this.saldoAtual -= sacar;
            console.log(`Saldo atual: ${this.saldoAtual}`)
        }
    }

    consultarSaldo(){
        console.log("\n=== SALDO ===");
        console.log(`Nome: ${this.titular}`);
        console.log(`Saldo atual: ${this.saldoAtual}`);
    }
}

class ContaEspecial extends ContaBancaria{
    constructor(titular, limiteCredito){
        super(titular);
        this.limiteCredito = limiteCredito;
    }

    sacarValor(){
        let sacar = readline.questionFloat(`Informe o valor que deseja sacar (Limite Extra de R$ ${this.limiteCredito}:)`);
        if(sacar > (this.saldoAtual + this.limiteCredito)){
            throw new Error("Saldo e limite insuficientes para realizar o saque.");
        }else if(sacar <= 0){
            throw new Error("O valor do saque deve ser maior que zero.");
        } else{
            this.saldoAtual -= sacar;
            console.log(`Saque realizado. Saldo atual: R$ ${this.saldoAtual}`);
        }
    }

    consultarSaldo() {
    super.consultarSaldo();

    let limiteDisponivel = this.limiteCredito + this.saldoAtual;

    if (limiteDisponivel > this.limiteCredito) {
        limiteDisponivel = this.limiteCredito;
    }

    if (limiteDisponivel < 0) {
        limiteDisponivel = 0;
    }

    console.log(`Limite de crédito disponível: R$ ${limiteDisponivel}`);
}
}

class ContaPoupanca extends ContaBancaria {
    constructor(titular, taxaRendimento) {
        super(titular);
        this.taxaRendimento = taxaRendimento;
    }

  
    renderJuros() {
        let rendimento = this.saldoAtual * this.taxaRendimento;
        this.saldoAtual += rendimento;
        console.log(`Juros de ${(this.taxaRendimento * 100)}% aplicados!`);
        console.log(`Rendimento: R$ ${rendimento}. Saldo atualizado: R$ ${this.saldoAtual}`);
    }
}


let titular
let validacaoTitular = false

while(!validacaoTitular){
    try{
        titular = readline.question("Digite o nome do titular: ");
        if(titular.trim() === ""){
            throw new Error("Nome do titular não pode ficar vazio. ")
        }
        validacaoTitular = true
    } catch(erro){
        console.error(`[ERRO CAPTURADO] ${erro.message}`);
    }
}


let tipoConta;
let conta;
let contaValida = false;

while (!contaValida) {
    try {
        console.log("\n==== TIPO DE CONTA ====");
        console.log("1- Conta Corrente Padrao");
        console.log("2- Conta Especial (Escolha o Limite)");
        console.log("3- Conta Poupanca (Com Rendimento)");

        tipoConta = readline.questionInt("Escolha o tipo de conta que deseja abrir: ");

        if (tipoConta === 1) {
            conta = new ContaBancaria(titular);
            console.log("Conta Corrente Padrao criada!");
            contaValida = true;
        } else if (tipoConta === 2) {
            let limiteDesejado;
            let validacaoLimite = false;

            while (!validacaoLimite) {
                try {
                    limiteDesejado = readline.questionFloat("Informe o limite de credito desejado: ");
                    if (limiteDesejado < 0) {
                        throw new Error("O limite de crédito não pode ser negativo.");
                    }
                    validacaoLimite = true;
                } catch (erro) {
                    console.error(`[ERRO CAPTURADO] ${erro.message}`);
                }
            }

            conta = new ContaEspecial(titular, limiteDesejado);
            console.log(`Conta Especial criada com R$ ${limiteDesejado.toFixed(2)} de limite!`);
            contaValida = true;
        } else if (tipoConta === 3) {
            conta = new ContaPoupanca(titular, 0.05);
            console.log("Conta Poupanca criada com taxa de rendimento de 5%!");
            contaValida = true;
        } else {
            throw new Error("Opção Inválida. Escolha um dos 3 tipos de conta.");
        }
    } catch (erro) {
        console.error(`[ERRO CAPITURADO] ${erro.message}`);
    }
}



let opcao = -1

while(opcao !== 0){
    console.log("\n==== MENU ====");
    console.log("1- Depositar Valor: ");
    console.log("2- Sacar Valor: ");
    console.log("3- Consultar Saldo: ");
    if (conta instanceof ContaPoupanca) {
        console.log("4- Render Juros (Exclusivo Poupanca)");
    }
    console.log("0- Sair ");

    opcao = readline.questionInt("Escolha uma opção: ");
    if(opcao === 0){
        console.log("Encerrando o programa.");
    }else{
        try{
            if(opcao === 1){
                conta.depositarValor();
            }else if(opcao === 2){
                conta.sacarValor();
            }else if(opcao === 3){
                conta.consultarSaldo();
            }else if (opcao === 4 && conta instanceof ContaPoupanca) {
                conta.renderJuros();
            }else{
                throw new Error(`Opção inválida... Escolha apenas as opções do "MENU" `);
            }
        } catch(erro){
            console.error(`[ERRO CAPITURADO] ${erro.message}`);
        }finally{
            console.log("Opção processada...")
        }
    }
}