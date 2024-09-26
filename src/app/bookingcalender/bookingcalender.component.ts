import { Component } from '@angular/core';
import { AllServicesService } from '../all-services.service';

@Component({
  selector: 'app-bookingcalender',
  templateUrl: './bookingcalender.component.html',
  styleUrls: ['./bookingcalender.component.css']
})
export class BookingcalenderComponent {
  // bookings = [
  //   {
  //     id: 33,
  //     dateTime: '2024-08-16 16:00:00',
  //     user: {
  //       name: 'Mohana',
  //       email: 'mona.azhagesan45@gmail.com',
  //       phone: '09876543210'
  //     },
  //     services: [
  //       { name: 'Furnished bedroom cleaning', price: 799 }
  //     ],
  //     subTotal: 799,
  //     status: 'Booked'
  //   },
  //   {
  //     id: 32,
  //     dateTime: '2024-08-07 18:33:00',
  //     user: {
  //       name: 'Mona Azhagesan',
  //       email: 'mona.azhagesan1@gmail.com',
  //       phone: '9080842066'
  //     },
  //     services: [
  //       { name: 'Classic full home cleaning', price: 3499 },
  //       { name: 'Premium full home cleaning', price: 5799 },
  //       { name: 'Addon 1', price: 100 },
  //       { name: 'Variation test service', price: 50 }
  //     ],
  //     subTotal: 9498,
  //     status: 'Booked'
  //   },
  //   {
  //     id: 31,
  //     dateTime: '2024-08-06 20:00:00',
  //     user: {
  //       name: 'Adminde',
  //       email: 'testuser11@gmail.com'
  //     },
  //     services: [
  //       { name: 'Furnished bedroom cleaning', price: 799 },
  //       { name: 'Unfurnished bedroom cleaning', price: 799 },
  //       { name: 'Occupied kitchen cleaning', price: 1398 },
  //       { name: 'Classic full home cleaning', price: 3499 },
  //       { name: 'Classic full home cleaning', price: 5899 },
  //       { name: 'Classic full home cleaning', price: 4499 }
  //     ],
  //     subTotal: 27291,
  //     status: 'Cancelled'
  //   },
  //   {
  //     id: 30,
  //     dateTime: '2024-07-22 20:30:00',
  //     user: {
  //       name: 'Adminde',
  //       email: 'testuser11@gmail.com'
  //     },
  //     services: [
  //       { name: 'Classic full home cleaning', price: 5199 }
  //     ],
  //     subTotal: 5199,
  //     status: 'Booked'
  //   },
  //   {
  //     id: 29,
  //     dateTime: '2024-07-23 09:00:00',
  //     user: {
  //       name: 'Adminde',
  //       email: 'testuser11@gmail.com'
  //     },
  //     services: [
  //       { name: 'Classic full home cleaning', price: 2999 }
  //     ],
  //     subTotal: 2999,
  //     status: 'Booked'
  //   }
  // ];
  bookings: any[] = [];

  selectedBooking: any =null;
  constructor(private allServicesService: AllServicesService) {}

   
  ngOnInit(): void {
    this.allServicesService.getBooking().subscribe(
      (data: any[]) => {
        this.bookings = data.map(item => ({
          ...item,
          services: JSON.parse(item.services)
        }));
        
      },
      (error) => {
        console.error('Error fetching bookings:', error);
      }
    );
 
  }
  convertStringofList(service:any){
    console.log(service)
  }
  isBookingContainerVisible: boolean = false;
  toggleBookingContainer(booking: any): void {
    
    this.selectedBooking = booking;
    this.isBookingContainerVisible = !this.isBookingContainerVisible;
  }
  
  // bookingDetails = {
  //   name: 'Mona',
  //   addressLine1: 'dfgh, fcf',
  //   addressLine2: 'fcvg',
  //   addressLine3: 'cv',
  //   email: 'mohana.rayaz@gmail.com',
  //   phone: '8072403631',
  //   bookingNumber: '51',
  //   bookingDate: '31-08-2024',
  //   appointmentDate: '03-08-2024',
  //   appointmentTime: '06:30 PM',
  //   totalAmount: 2999
  // };

  // serviceDetails = [
  //   { name: 'Classic full home cleaning (1 BHK)', quantity: 1, rate: 2999 }
  // ];

  // get subtotal() {
  //   return this.serviceDetails.reduce((acc, service) => acc + service.rate * service.quantity, 0);
  // }
}
