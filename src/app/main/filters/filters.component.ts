import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

export interface TransactionFilters {
  name: string;
  minAmount: number;
  maxAmount: number;
  type: string;
  sort: string;
}

@Component({
  selector: 'df-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  filtersForm = new FormGroup({
    name: new FormControl('', []),
    minAmount: new FormControl(0, [Validators.min(0)]),
    maxAmount: new FormControl(100000, [Validators.max(100000)]),
    type: new FormControl(null, []),
    sort: new FormControl('date-asc', []),
  })
  formSubscription: Subscription;

  @Output() filtersChanged = new EventEmitter<TransactionFilters>();
  constructor() { }

  ngOnInit(): void {
    this.filtersForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.filtersChanged.emit(this.filtersForm.value as TransactionFilters);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
