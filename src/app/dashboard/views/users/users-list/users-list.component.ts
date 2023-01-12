import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, takeUntil } from 'rxjs';
import { AdminUsersService } from 'src/app/dashboard/context/services/admin-users.service';
import { UserData } from 'src/app/main/services/interfaces/user.interface';
import { Unsub } from 'src/app/shared/unsub';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent extends Unsub implements OnInit {
  theades: string[] = ['User', 'Email', 'Created At', 'Status', 'Actions'];
  page: number = 1;
  pages: any = 1;
  search: string = '';
  timeOutId: any;
  array: number[] = [];
  users$!: Observable<UserData[]>;

  constructor(
    private userService: AdminUsersService,
    private toast: ToastrService
  ) {
    super();
  }

  getAllUsers() {
    this.users$ = this.userService
      .getUsersList({
        search: this.search,
        page: this.page,
      })
      .pipe(
        takeUntil(this.unsubscribe$),
        map((res: any) => {
          this.setPages(res.pages);
          return res.users;
        })
      );
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

  setSearch(event: Event): void {
    this.search = (<HTMLInputElement>event.target).value;
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(() => {
      this.getAllUsers();
    }, 1000);
  }

  ngOnInit(): void {
    this.getAllUsers();
  }
}
