import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[dfFormValidationErrors]',
  providers: [],
})
export class FormValidationErrorsDirective implements OnInit {

  @Input() group: FormGroup;
  constructor(
    private el: ElementRef) {
  }

  ngOnInit() {
    this.group.valueChanges.subscribe(() => {
      this.el.nativeElement.innerHTML = '';
      if (this.group.get('name').hasError('required') && this.group.get('name').touched) {
        this.el.nativeElement.innerHTML += '<div>Transaction name is required</div>';
      }
      if (this.group.get('amount').hasError('required') && this.group.get('amount').touched) {
        this.el.nativeElement.innerHTML += '<div>Amount is required</div>';
      }
      if (this.group.get('amount').hasError('min') && this.group.get('amount').touched) {
        this.el.nativeElement.innerHTML += '<div>Amount must be greater than zero</div>';
      }
      if (this.group.get('amount').hasError('pattern') && this.group.get('amount').touched) {
        this.el.nativeElement.innerHTML += '<div>Amount must be a valid number with up to two decimal places</div>';
      }
      if (this.group.get('type').hasError('required') && this.group.get('type').touched) {
        this.el.nativeElement.innerHTML += '<div>Transaction type is required</div>';
      }
      if (this.group.get('category').hasError('required') && this.group.get('category').touched) {
        this.el.nativeElement.innerHTML += '<div>Transaction category is required</div>';
      }
      if (this.group.get('date').hasError('required') && this.group.get('date').touched) {
        this.el.nativeElement.innerHTML += '<div>Transaction date is required</div>';
      }
    });
  }
}
