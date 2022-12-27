import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from 'src/app/dashboard/context/services/product-service.service';

@Component({
  selector: 'app-updateproduct-modal',
  templateUrl: './updateproduct-modal.component.html',
  styleUrls: ['./updateproduct-modal.component.css'],
})
export class UpdateproductModalComponent {
  formData!: FormGroup;
  product!: any;
  specification: string[] = [];

  constructor(
    private dialog: DialogRef<UpdateproductModalComponent>,
    private builder: FormBuilder,
    private productService: ProductServiceService,
    public toast: ToastrService
  ) {
    this.product = this.dialog.data;
    this.specification = this.product.specifications;
  }

  createForm() {
    this.formData = this.builder.group({
      name: [this.product?.name, [Validators.required]],
      price: [this.product?.price, [Validators.required]],
      image: [this.product?.image, [Validators.required]],
      brand: [this.product?.brand, [Validators.required]],
      category: [this.product?.brand, [Validators.required]],
      description: [this.product?.description, [Validators.required]],
      specifications: [''],
    });
  }

  prepereFormData() {
    const formD = new FormData();
    Object.entries(this.formData.value).forEach(([key, value]: any) => {
      formD.append(key, value);
    });
    return formD;
  }

  selectImage(event: any) {
    const image = event.target.files[0];
    this.formData.get('image')?.setValue(image);
  }

  setSpecifications() {
    this.specification = [
      ...this.specification,
      this.formData.value.specifications,
    ];
    this.formData.get('specifications')?.setValue('');
  }

  submit() {
    if (!this.specification.length) return;
    const model = {
      _id: this.product._id,
      ...this.formData.value,
      specifications: this.specification,
    };
    this.productService.updateProduct(model).subscribe({
      complete: () => {
        this.toast.success('Product has been created');
        this.dialog.close(true);
      },
    });
  }
  removeSpec(index: number) {
    this.specification.splice(index, 1);
  }
  ngOnInit(): void {
    this.createForm();
  }
}
