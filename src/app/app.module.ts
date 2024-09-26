import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { CategoriesComponent } from './categories/categories.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { BookingcalenderComponent } from './bookingcalender/bookingcalender.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { StaticpagesComponent } from './staticpages/staticpages.component';
import { SettingsComponent } from './settings/settings.component'; // Import MatDrawerMode
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { ServiceComponent } from './sevice folder/service/service.component';
import { AddserviceComponent } from './sevice folder/addservice/addservice.component';
import { HttpClientModule } from '@angular/common/http';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { EditstaticComponent } from './editstatic/editstatic.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    CategoriesComponent,
    ServiceComponent,
    NewBookingComponent,
    BookingcalenderComponent,
    TestimonialsComponent,
    StaticpagesComponent,
    AddcategoryComponent,
    SettingsComponent,
    AddserviceComponent,
    BookingDetailsComponent,
    FeedbackComponent,
    EditstaticComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
