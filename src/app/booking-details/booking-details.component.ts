import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  bookingDetails: any;
  serviceDetails: any[] | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const bookingId = params['id']; // Get booking id from route parameters
      // Mock Data (or fetch data from a service using bookingId)
      this.bookingDetails = {
        name: 'John Doe',
        addressLine1: '123 Main St',
        addressLine2: 'Apt 4B',
        addressLine3: 'New York, NY 10001',
        email: 'john@example.com',
        phone: '123-456-7890',
        bookingNumber: 'ABC123',
        bookingDate: '2024-09-01',
        appointmentDate: '2024-09-10',
        appointmentTime: '10:00 AM',
        totalAmount: 150
      };

      this.serviceDetails = [
        { name: 'Cleaning Service', quantity: 2, rate: 75 }
      ];
    });
  }

  // get subtotal() {
  //   return this.serviceDetails.reduce((acc, service) => acc + service.rate * service.quantity, 0);
  // }
}
