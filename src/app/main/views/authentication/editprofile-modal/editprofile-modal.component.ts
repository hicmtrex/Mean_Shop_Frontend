import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/main/services/context/users.service';

@Component({
  selector: 'app-editprofile-modal',
  templateUrl: './editprofile-modal.component.html',
  styleUrls: ['./editprofile-modal.component.css'],
})
export class EditprofileModalComponent {
  formData!: FormGroup;
  user!: any;
  specification: string[] = [];
  togglePassword: boolean = false;

  constructor(
    private dialog: DialogRef<EditprofileModalComponent>,
    private builder: FormBuilder,
    private userService: UsersService,
    public toast: ToastrService
  ) {
    this.user = this.dialog.data;
  }

  createForm() {
    this.formData = this.builder.group({
      username: [this.user?.username, [Validators.required]],
      email: [this.user?.email, [Validators.required]],
      password: [''],
    });
  }

  submit() {
    this.userService
      .updateUser({ ...this.formData.value, id: this.user._id })
      .subscribe({
        complete: () => {
          this.toast.success('user has been updated');
          this.dialog.close(true);
        },
      });
  }

  setTogglePassword() {
    this.togglePassword = !this.togglePassword;
  }
  ngOnInit(): void {
    this.createForm();
  }
}
