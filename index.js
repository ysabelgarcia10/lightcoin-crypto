
class Account {

  constructor() {
    this.transactions  = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

};


class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount1 = new Account("snow-patrol");

console.log('Starting balance:', myAccount1.balance, "\n")

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount1);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount1.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount1);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount1.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount1);
console.log('Commit result:', t3.commit(), "\n");

console.log('Ending Account Balance: ', myAccount1.balance, "\n");

console.log('Account Transaction History: ', myAccount1.transactions);
