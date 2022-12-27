import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { CartServiceService } from 'src/app/main/services/context/cart-service.service';
import { UsersService } from 'src/app/main/services/context/users.service';
import { UserData } from 'src/app/main/services/interfaces/user.interface';
import { EditprofileModalComponent } from '../editprofile-modal/editprofile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id: any = '';
  user: UserData | null = null;
  constructor(
    public userService: UsersService,
    private route: ActivatedRoute,
    public cartService: CartServiceService,
    private dialog: DialogService
  ) {}

  getUserById() {
    this.userService.getUserById(this.id).subscribe({
      next: (res: any) => {
        this.user = res;
      },
    });
  }

  openModal(u: UserData) {
    const dialogRef = this.dialog.open(EditprofileModalComponent, {
      width: 700,
      data: u,
    });
    dialogRef.afterClosed$.subscribe((res) => {
      if (res) {
        this.getUserById();
      }
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUserById();
  }
}
