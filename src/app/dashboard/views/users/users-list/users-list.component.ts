import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminUsersService } from 'src/app/dashboard/context/services/admin-users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  theades: string[] = ['User', 'Email', 'Created At', 'Status', 'Actions'];
  page: number = 1;
  pages: any = 1;
  search: string = '';
  timeOutId: any;
  array: number[] = [];
  users: any;

  constructor(
    private userService: AdminUsersService,
    private toast: ToastrService
  ) {}

  getAllUsers() {
    this.userService
      .getUsersList({ search: this.search, page: this.page })
      .subscribe({
        next: (res: any) => {
          this.users = res.users;
          this.setPages(res.pages);
        },
      });
  }

  deleteUser(id: string) {
    if (window.confirm('are you sure?')) {
      this.userService.deleteUser(id).subscribe({
        complete: () => {
          this.toast.success('user has been deleted');
          this.getAllUsers();
        },
      });
    }
  }

  setPage(p: number) {
    this.page = p;
    this.getAllUsers();
  }

  setPages(p: number) {
    this.array = [...Array(p).keys()];
    return (this.pages = p);
  }

  setSearch(event: any) {
    this.search = event.target.value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllUsers();
    }, 1000);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}
