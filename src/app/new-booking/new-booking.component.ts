import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';

interface Service {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Booking {
  price: any;
  quantity: any;
  id: number;
  user: string;
  date: Date;
  time: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  service: string;
}

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {
  singleSelectedService: any = null;
  total: number = 0;
  sendPaymentLink: boolean = false;
  searchTerm: string = '';
  selectedServices: any[] = [];  // Initialize as an empty array

  services: Service[] = [
    { id: 1, name: 'Furnished Apartment', price: 220, quantity: 1 },
    { id: 2, name: 'Unfurnished Apartment', price: 220, quantity: 1 },
    { id: 3, name: 'Book by Room', price: 22, quantity: 1 },
    { id: 4, name: 'Furnished Bungalow', price: 220, quantity: 1 },
    { id: 5, name: 'Unfurnished Bungalow', price: 101, quantity: 1 },
    { id: 6, name: 'Addon', price: 110, quantity: 1 },
    { id: 7, name: 'Test', price: 10, quantity: 1 }
  ];

  booking: Booking = {
    id: 0,
    user: '',
    date: new Date(),
    time: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    service: '',
    quantity: 0,
    price: 0
  };

  constructor(private allServicesService: AllServicesService) { }

  ngOnInit(): void {
    //this.loadServices(); // Ensure this method is called to load services from the server
  }
  
  loadServices(): void {
    this.allServicesService.getBooking().subscribe(
      (services: Service[]) => {
        this.services = services;
        console.log(this.services); 
      },
      error => {
        console.error('Error loading services:', error);
      }
    );
  }
  

  addService() {
  
    console.log(typeof this.singleSelectedService,this.singleSelectedService)
    if (!this.singleSelectedService) {
      alert('Please select a service');
      return;
  }

  // Check if the service has already been added
  console.log("errro thiruppathi",this.selectedServices)
  const selectedItem = this.selectedServices.find((s:any )=> (s.id === this.singleSelectedService))
  console.log("selectdItne",selectedItem)
  if (selectedItem!=undefined) {
      alert('Service already added');
      return;
  }

  // Add the selected service to the list
  console.log(this.services)
  const service = this.services.find(item=>item.id===this.singleSelectedService)
  console.log(service,"service")
  this.selectedServices.push(service);
  console.log("slectedService",this.selectedServices)
  this.updateTotal();
  this.singleSelectedService = null; // Clear selection after adding


  // if (this.singleSelectedService && !this.selectedServices.some(s => s.id === this.singleSelectedService.id)) {
  //   this.selectedServices.push({ ...this.singleSelectedService });
  //   this.updateTotal();
  // }
}



  removeService(service: any) {
    const index = this.selectedServices.indexOf(service);
    if (index > -1) {
      this.selectedServices.splice(index, 1);
      this.updateTotal();
    }
  }

  updateTotal(): void {
    this.total = this.selectedServices.reduce((sum, service) => sum + (service.price * service.quantity), 0);
  }

  submitBooking(event: Event): void {
    event.preventDefault(); // Prevent the default form submission

    // Constructing the booking data object
    const bookingData = {
      User: this.booking.user,
      AppointmentDate: this.booking.date instanceof Date
        ? this.booking.date.toISOString()
        : new Date(this.booking.date).toISOString(),
      AppointmentTime: this.booking.time,
      Address1: this.booking.address1,
      Address2: this.booking.address2,
      City: this.booking.city,
      State: this.booking.state,
      Pincode: this.booking.pincode,
      Services: JSON.stringify(this.selectedServices),
      SendPaymentLink: this.sendPaymentLink, // Boolean
      Total: this.total // Decimal
    };

    // Logging the booking data to ensure correct structure
    console.log('Booking Data:', bookingData);

    this.allServicesService.addBooking(bookingData).subscribe(
      response => {
        console.log('Booking submitted successfully:', response);
      },
      error => {
        console.error('Error submitting booking:', error);
        if (error.error && error.error.errors) {
          console.log('Validation Errors:', error.error.errors);
        }
      }
    );
  }


}
