import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../../data-models/Transaction';

@Component({
  selector: 'df-transaction-thumbnail',
  templateUrl: './transaction-thumbnail.component.html',
  styleUrls: ['./transaction-thumbnail.component.scss']
})
export class TransactionThumbnailComponent implements OnInit {

  @Input() transaction!: Transaction;
  constructor() { }

  ngOnInit(): void {
  }
}
