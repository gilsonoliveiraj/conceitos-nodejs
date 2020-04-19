import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionSTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const initialValue: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const reducer = (
      accumulator: Balance,
      currentValue: Transaction,
    ): Balance => {
      // eslint-disable-next-line default-case
      switch (currentValue.type) {
        case 'income':
          accumulator.income += currentValue.value;
          break;
        case 'outcome':
          accumulator.outcome += currentValue.value;
      }
      accumulator.total = accumulator.income - accumulator.outcome;
      return accumulator;
    };

    return this.transactions.reduce(reducer, initialValue);
  }

  public create({ title, type, value }: TransactionSTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
