# 🏦 Sistema Bancário Interativo em JavaScript (Versão 2.0)

Este repositório apresenta a evolução do sistema de simulação de conta bancária, aplicando Programação Orientada a Objetos (POO), tratamento de erros avançado (`try...catch...finally`) e interatividade contínua via terminal.

---

## 📝 O que foi feito (Passo a Passo)

1. **Importação da Biblioteca:** Importei o `readline-sync` para capturar entradas do usuário pelo terminal.
2. **Criação da Classe (`ContaBancaria`):** Estruturei a classe com o método `constructor(titular)` definindo o nome e o `saldoAtual` inicial fixado em R$ 100.
3. **Método de Depósito (`depositarValor`):** Solicita o valor diretamente ao usuário. Contém uma validação `if` que dispara um erro (`throw new Error`) caso o valor seja menor ou igual a zero; caso contrário, soma ao saldo.
4. **Método de Saque (`sacarValor`):** Pergunta o valor a retirar e aplica dupla validação:
   * Verifica se o saque é maior que o saldo atual (lançando um erro de saldo insuficiente).
   * Verifica se o valor é menor ou igual a zero (lançando um erro de valor inválido).
   * Se aprovado, subtrae o valor do saldo.
5. **Método de Consulta (`consultarSaldo`):** Exibe de forma limpa o nome do titular e o saldo atual no console.
6. **Validação do Nome do Titular:** Utilizei um loop `while` em conjunto com `try...catch` e o método `.trim()` para impedir nomes vazios ou preenchidos apenas com espaços, obrigando uma entrada válida antes de avançar.
7. **Instanciação da Conta:** Após validar o nome, instanciei o objeto com `const conta = new ContaBancaria(titular)`.
8. **Menu Interativo (`while` e `try...catch...finally`):** Criei um menu dinâmico em loop com as opções de depósito, saque, consulta e saída (`0`). Cada escolha é processada de forma segura com tratamento de erros e o bloco `finally` para indicar o fim de cada processamento.

---

## 💡 Conclusão
Este projeto evoluiu significativamente em relação à versão inicial, consolidando o uso de:
* Classes, objetos e o operador `this`.
* Métodos, laços de repetição (`while`) e condicionais (`if/else`).
* Tratamento robusto de exceções (`try...catch...finally`).
* Validação de dados do usuário e menus interativos.