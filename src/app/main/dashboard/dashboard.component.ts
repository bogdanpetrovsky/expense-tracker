import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../../../data-models/Transaction';
import { TransactionFilters } from '../filters/filters.component';

@Component({
  selector: 'df-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[];
  showForm: boolean;
  selectedTransaction: Transaction;
  creationErrors: string[];
  creationSuccess: boolean;
  constructor(private transactionService: TransactionService) {
  }
  ngOnInit(): void {
    this.transactions = this.transactionService.getAll();
    this.transactionService.transactionCreationError.subscribe((errors) => {
      console.log('errors', errors);
      this.creationErrors = errors;
      setTimeout(() => {
        this.creationErrors = [];
      }, 3000);
    });
    this.transactionService.transactionCreationSuccess.subscribe(() => {
      this.creationSuccess = true;
      setTimeout(() => {
        this.creationSuccess = false;
      }, 3000);
    });

  }

  idTrackBy(index, transaction: Transaction) {
    return transaction.id;
  }

  saveTransaction(transaction: Transaction) {
    if (!transaction) {
      this.showForm = false;
      return;
    }

    transaction.id ? this.transactionService.updateTransaction(transaction.id, transaction) : this.transactionService.createTransaction(transaction);
    this.showForm = false;
  }

  selectTransaction(transaction: Transaction) {
    this.showForm = false;
    this.selectedTransaction = transaction;
    this.showForm = true;
  }

  deleteTransaction($event: Transaction) {
    this.transactionService.deleteTransaction($event.id);
    this.showForm = false;
  }

  onCreateTransactionClicked() {
    this.showForm = true;
    setTimeout(() => {
      scrollTo(0, document.body.scrollHeight);
    }, 500);
  }

  getTotal() {
    return this.transactions.reduce((acc, transaction) => {
      return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
  }

  protected readonly event = event;

  filterTransactions(filters: TransactionFilters) {
    console.log(filters);
    this.transactions = this.transactionService.getAll();
    if (filters.type) { this.transactions = this.transactions.filter(t => t.type === filters.type); }
    if (filters.name) { this.transactions = this.transactions.filter(t => t.name.toLowerCase().includes(filters.name.toLowerCase())); }

    if (filters.sort) {
      if (filters.sort === 'amount-asc') {
        this.transactions = this.transactions.sort((a, b) => a.amount - b.amount);
      } else if (filters.sort === 'amount-desc') {
        this.transactions = this.transactions.sort((a, b) => b.amount - a.amount);
      } else if (filters.sort === 'date-asc') {
        this.transactions = this.transactions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      } else if (filters.sort === 'date-desc') {
        this.transactions = this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }
  }
}
