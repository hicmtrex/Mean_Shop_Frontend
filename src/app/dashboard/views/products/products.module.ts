import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductBodyComponent } from '../../components/products/product-body/product-body.component';
import { TableContainerComponent } from '../../containers/table-container/table-container.component';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { ProductModalComponent } from '../../containers/modals/product-modal/product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateproductModalComponent } from '../../containers/modals/updateproduct-modal/updateproduct-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductBodyComponent,
    TableContainerComponent,
    PaginationComponent,
    ProductModalComponent,
    UpdateproductModalComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot(), // ToastrModule added
  ],
})
export class ProductsModule {}
