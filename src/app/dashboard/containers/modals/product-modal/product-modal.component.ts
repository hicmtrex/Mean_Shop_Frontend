import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductServiceService } from 'src/app/dashboard/context/services/product-service.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent implements OnInit {
  formData!: FormGroup;
  specification: string[] = [];
  constructor(
    private dialog: DialogRef<ProductModalComponent>,
    private builder: FormBuilder,
    private productService: ProductServiceService,
    public toast: ToastrService
  ) {}

  createForm() {
    this.formData = this.builder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
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
      ...this.formData.value,
      specifications: this.specification,
    };
    this.productService.createProduct(model).subscribe({
      complete: () => {
        this.toast.success('Product has been created');
        this.dialog.close(true);
      },
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
}
