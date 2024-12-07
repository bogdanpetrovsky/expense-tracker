import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { mockTransactions } from '../../../data-models/mocks/DATASET_MOCK';
import { Transaction } from '../../../data-models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionDataset = localStorage.getItem('transactions') ? JSON.parse(localStorage.getItem('transactions')) : JSON.parse(JSON.stringify(mockTransactions));
  transactionCreationError = new Subject<string[]>();
  transactionCreationSuccess = new Subject<boolean>();
  constructor() {}

  saveLatestUpdates() {
    localStorage.setItem('transactions', JSON.stringify(this.transactionDataset));
  }

  public getAll(): Transaction[] {
    return this.transactionDataset;
  }

  public getById(id: string): Transaction | null {
    return this.transactionDataset.find((transaction) => transaction.id === id) || null;
  }

  public createTransaction(data: Transaction): void {
    data.id = this.transactionDataset.length + 1;
    this.transactionDataset.push(data);
    this.saveLatestUpdates();
  }

  public updateTransaction(id: string, data: Transaction): void {
    const index = this.transactionDataset.findIndex((transaction) => transaction.id === id);
    if (index !== -1) {
      this.transactionDataset[index] = data;
    }
    this.saveLatestUpdates();
  }

  public deleteTransaction(id: string): void {
    const index = this.transactionDataset.findIndex((transaction) => transaction.id === id);
    if (index !== -1) {
      this.transactionDataset.splice(index, 1);
    }
    this.saveLatestUpdates();
  }

  validateTransaction(value: Transaction, transactionId?: string): {result: boolean, message: string} {
    const errors: string[] = [];

    if (value.amount <= 0) {
      errors.push('Amount must be greater than zero');
    }

    if (!value.name || value.name.trim().length === 0) {
      errors.push('Transaction name is required');
    }

    if (!['income', 'expense'].includes(value.type)) {
      errors.push('Transaction type must be either "income" or "expense"');
    }

    if (this.transactionDataset.find(
      (transaction) => transaction.name === value.name && transaction.id !== transactionId
    )) {
      errors.push('A transaction with this name already exists');
    }

    if (errors.length) {
      this.transactionCreationError.next(errors);
      return { result: false, message: errors.join(', ') };
    } else {
      this.transactionCreationSuccess.next(true);
      return { result: true, message: 'Transaction created successfully' };
    }
  }
}
