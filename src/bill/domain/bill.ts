import Transaction from 'src/transaction/transaction.entity';
import BillStatus from '../enum/bill-status.enum';
import { differenceInMinutes, format, startOfMonth } from 'date-fns';
import { User } from 'src/user/user.entity';

class Bill {
  constructor(dueDate: string, transactions: Transaction[], user: User) {
    this.dueDate = format(
      startOfMonth(new Date(dueDate)),
      'yyyy-MM-dd HH:mm:ss',
    );
    this.transactions = transactions;
    this.user = user;
  }

  user: User;

  dueDate: string;

  paidDate: string;

  status: BillStatus;

  amount: number;

  minimal: number;

  transactions: Transaction[];

  setAmountByTransactions() {
    const initial = 0;

    const amount = this.transactions.reduce((acc, transaction) => {
      return transaction.value + acc;
    }, initial);

    this.amount = amount;

    return this;
  }

  setMinimalFromAmount() {
    const tenPercent = 0.1;

    this.minimal = this.amount * tenPercent;

    return this;
  }

  getStatus() {
    return this.status;
  }

  getAmount() {
    return this.amount;
  }

  getMinimal() {
    return this.minimal;
  }
}

export default Bill;
