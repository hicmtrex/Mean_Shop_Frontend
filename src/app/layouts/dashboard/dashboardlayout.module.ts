import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardlayoutRoutingModule } from './dashboardlayout-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { TopbarComponent } from 'src/app/dashboard/components/topbar/topbar.component';
import { HomeDashboardComponent } from 'src/app/dashboard/views/home-dashboard/home-dashboard.component';
import { SidebarComponent } from 'src/app/dashboard/components/sidebar/sidebar.component';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BarChartComponent } from 'src/app/dashboard/components/bar-chart/bar-chart.component';
import { LineChartComponent } from 'src/app/dashboard/components/line-chart/line-chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    TopbarComponent,
    HomeDashboardComponent,
    SidebarComponent,
    BarChartComponent,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardlayoutRoutingModule,
    NgIconsModule.withIcons({ heroUsers, featherAirplay }),
    FontAwesomeModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot(), // ToastrModule added
  ],
})
export class DashboardlayoutModule {}
