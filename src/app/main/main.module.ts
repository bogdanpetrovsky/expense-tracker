import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionThumbnailComponent } from './transaction-thumbnail/transaction-thumbnail.component';
import { CommonModule } from '@angular/common';
import { BlocksModule } from '../blocks/blocks.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FiltersComponent } from './filters/filters.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormValidationErrorsDirective } from './directives/form-validation-errors.directive';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    DashboardComponent, TransactionThumbnailComponent, FiltersComponent, TransactionFormComponent, NotFoundComponent, FormValidationErrorsDirective
  ],
  imports: [MainRoutingModule, CommonModule, BlocksModule, InfiniteScrollModule, MatSliderModule, CommonModule],
  providers: []
})
export class MainModule { }
