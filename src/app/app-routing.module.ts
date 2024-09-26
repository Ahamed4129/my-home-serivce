import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { BookingcalenderComponent } from './bookingcalender/bookingcalender.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { StaticpagesComponent } from './staticpages/staticpages.component';
import { SettingsComponent } from './settings/settings.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ServiceComponent } from './sevice folder/service/service.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', heading: 'Here is the overview of Dashboard.' } },
  { path: 'categories', component: CategoriesComponent, data: { title: 'Categories', heading: 'Here is the overview of all the categories.' } },
  { path: 'service', component: ServiceComponent, data: { title: 'Service', heading: 'Here is the overview of all the services.' } },
  { path: 'new-booking', component: NewBookingComponent, data: { title: 'New Booking', heading: 'Here you can add service info.' } },
  { path: 'booking-calendar', component: BookingcalenderComponent, data: { title: 'Booking Calendar', heading: 'Here is the overview of all the bookings.' } },
  { path: 'testimonials', component: TestimonialsComponent, data: { title: 'Testimonials', heading: 'Here is the overview of all the feedbacks.' } },
  { path: 'static-pages', component: StaticpagesComponent, data: { title: 'Static Pages', heading: 'Here is the overview of all the staticpages.' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings', heading: 'Here you can manage website setting.' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
  { path: 'add-category', component: AddcategoryComponent },
  { path: 'booking-details', component: BookingDetailsComponent },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
