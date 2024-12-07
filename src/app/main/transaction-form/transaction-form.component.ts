import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../../data-models/Transaction';

@Component({
  selector: 'df-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnChanges {
  public readonly transactionForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [
      Validators.required,
      Validators.min(0.01),
      Validators.pattern(/^\d+(\.\d{1,2})?$/),
    ]),
    type: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    date: new FormControl(new Date(), [Validators.required]),
  });

  @Input() transaction?: Transaction;
  @Output() transactionCreated = new EventEmitter<Transaction>();
  @Output() transactionDeleted = new EventEmitter<Transaction>();
  @Output() transactionCreateError = new EventEmitter<Transaction>();
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.transaction) {
      this.transactionForm.reset();
      this.transactionForm.patchValue(this.transaction);
    }
  }

  close() {
    this.transactionCreated.emit();
  }

  createTransaction() {
    if (this.transactionForm.invalid) {
      console.log('invalid form');
      this.transactionForm.markAllAsTouched();
      return;
    }

    const validation = this.transaction ?
      this.transactionService.validateTransaction(this.transactionForm.value, this.transaction.id) :
      this.transactionService.validateTransaction(this.transactionForm.value);
    if (!validation.result) {

      return;
    }
    const validatedTransaction = this.transactionForm.value;
    if (this.transaction) { validatedTransaction.id = this.transaction.id; }

    this.transactionCreated.emit(validatedTransaction);
  }

  deleteTransaction() {
    this.transactionDeleted.emit(this.transaction);
  }
}
