import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardlayoutModule } from './layouts/dashboard/dashboardlayout.module';
import { MainlayoutModule } from './layouts/main/mainlayout.module';
import { LoginComponent } from './main/views/authentication/login/login.component';
import { RegisterComponent } from './main/views/authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CoreModule } from './core/core.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsModule } from './dashboard/views/products/products.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardlayoutModule,
    MainlayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    CoreModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgIconsModule.withIcons({ heroUsers }),
    FontAwesomeModule,
    ProductsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
