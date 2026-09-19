# 🏦 Projeto: Conta Bancária com Tratamento de Exceções

Este repositório contém um sistema simples de simulação de conta bancária desenvolvido em JavaScript, utilizando Programação Orientada a Objetos (POO) e tratamento de erros. *(Nota: O projeto foi construído com foco na interatividade direta com o utilizador via terminal).*

---

## 📝 O que foi feito (Passo a Passo)

1. **Importação da Biblioteca:** No início do código, adicionei a biblioteca `readline-sync` para permitir a interação direta com o utilizador pelo terminal.
2. **Criação da Classe (`ContaBancaria`):** Criei a classe e estruturei o `constructor()` recebendo as variáveis pedidas no exercício: `titular` e `saldoInicial`.
3. **Método de Depósito (`depositar`):** Criei a função `depositar(valor)` com uma validação `if` para garantir que, se o valor for menor ou igual a zero, o sistema lance um erro usando `throw new Error`. Caso contrário, o valor é somado ao saldo atual e o resultado é exibido no console.
4. **Método de Saque (`sacar`):** Criei o método `sacar(valor)` com validações completas:
   * Verifica se o valor é maior que o saldo atual (lançando um erro se for).
   * Verifica se o valor é menor ou igual a zero (lançando um erro caso seja um valor inválido).
   * Se passar nas validações, subtrai o valor do saldo e mostra o saldo atualizado no console.
5. **Instanciação da Conta:** Fora da classe e dos métodos, pedi para o utilizador digitar o nome do titular e o saldo inicial. Em seguida, criei uma constante `conta` para instanciar a classe ` ContaBancaria` com esses dados.
6. **Bloco de Execução Segura (`try...catch...finally`):** 
   * No bloco `try`, criei as interações para o utilizador digitar os valores que deseja depositar e sacar, chamando os respetivos métodos.
   * No bloco `catch`, capturei qualquer erro gerado pelas validações anteriores e exibi a mensagem amigável no console.
   * No bloco `finally`, adicionei a mensagem informando que a operação bancária foi finalizada.

---

## 💡 Observação
* **Interatividade:** Acrescentei a interação dinâmica com o utilizador através do terminal (`readline-sync`), tornando a simulação mais prática e realista para testar os cenários de sucesso e os erros.