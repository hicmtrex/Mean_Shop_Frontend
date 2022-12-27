import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css'],
})
export class MainlayoutComponent implements OnInit, DoCheck {
  isHome: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.isHome = this.router.url === '/' ? true : false;
  }

  ngDoCheck(): void {
    this.isHome = this.router.url === '/' ? true : false;
  }
}
