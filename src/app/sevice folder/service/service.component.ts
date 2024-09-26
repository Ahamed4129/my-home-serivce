import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddserviceComponent } from '../addservice/addservice.component';
import { AllServicesService } from 'src/app/all-services.service';
interface Service {
  id: number;
  image: string;
  name: string;
  category: string;
  description: string;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent  {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number | undefined;
  dataSource = new MatTableDataSource<Service>([]);
  services: Service[] = [];
 
  

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialog: MatDialog,
    private allServicesService: AllServicesService // Inject the service
  ) {
    this.dataSource.filterPredicate = (data: Service, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(filterValue) ||
        data.category.toLowerCase().includes(filterValue) ||
        data.description.toLowerCase().includes(filterValue)
      );
    };
  }

 
  // searchTerm: string = '';

  // services = [
  //   { id: 1, image: 'assets/img1.png', name: 'Test Addon 2', category: 'Addon', description: 'Test Addon 2' },
  //   { id: 2, image: 'assets/img2.png', name: 'Test Addon 1', category: 'Addon', description: 'Test Addon 1' },
  //   { id: 3, image: 'assets/img3.png', name: 'Variation test service', category: 'Test', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean...' },
  //   { id: 4, image: 'assets/img4.png', name: 'Simple Test Service', category: 'Test', description: 'Simple Test Service' },
  //   { id: 5, image: 'assets/img5.png', name: 'Addon 1', category: 'Addon', description: 'Addon 2' },
  //   { id: 6, image: 'assets/img6.png', name: 'Addon 1', category: 'Addon', description: 'Addon 1Addon 1Addon 1Addon 1Addon 1...' },
  //   { id: 7, image: 'assets/img7.png', name: 'Balcony', category: 'Book by room', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean...' },
  //   { id: 8, image: 'assets/img8.png', name: 'Complete bathroom cleaning', category: 'Book by room', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean...' },
  //   { id: 9, image: 'assets/img9.png', name: 'Empty kitchen cleaning with chimney', category: 'Book by room', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean...' },
  // ];

  // filteredServices() {
  //   return this.services.filter(service =>
  //     service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //     service.category.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //     service.description.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  // createNewService() {
  //   const dialogRef = this.dialog.open(AddserviceComponent, {
  //     width: '400px',
  //     data: null
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.addServiceToTable(result);
  //     }
  //   });
  // }
  // addServiceToTable(result: any) {
  //   throw new Error('Method not implemented.');
  // }

  // editService(id: number) {
  //   // Logic to edit the service
  //   console.log('Editing service with id:', id);
  // }

  // deleteService(id: number) {
  //   // Logic to delete the service
  //   console.log('Deleting service with id:', id);
  // }
  ngOnInit(): void {
    this.loadServices(); // Load services on component initialization
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadServices(): void {
    this.allServicesService.getService().subscribe(
      (services: Service[]) => {
        this.services = services;
        this.dataSource.data = this.services; // Update data source
        this.totalPages = Math.ceil(this.services.length / this.itemsPerPage);
      },
      error => {
        console.error('Error loading services:', error);
      }
    );
  }

  editService(id: number) {
    const serviceToEdit = this.services.find(service => service.id === id);
    
    const dialogRef = this.dialog.open(AddserviceComponent, {
      width: '400px',
      data: serviceToEdit
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateService(result, id);
      }
    });
  }
  
  updateService(updatedService: Service, id: number) {
    const formData = new FormData();
    formData.append('name', updatedService.name);
    formData.append('category', updatedService.category);
    formData.append('description', updatedService.description);
    if (updatedService.image) {
      formData.append('file', updatedService.image);
    }
  
    this.allServicesService.updateService(formData, id).subscribe(
      (response: Service) => {
        const index = this.services.findIndex(service => service.id === updatedService.id);
        if (index > -1) {
          this.services[index] = response;
          this.dataSource.data = this.services;
        }
      },
      error => {
        console.error('Error updating service:', error);
      }
    );
    this.loadServices();
  }
  
  createNewService() {
    const dialogRef = this.dialog.open(AddserviceComponent, {
      width: '400px',
      data: null // Passing null since it's a new service
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addServiceToTable(result);
      }
    });
  }

  addServiceToTable(service: Service) {
    const formData = this.createFormDataFromService(service);
  
    this.allServicesService.addService(formData).subscribe(
      (newService: Service) => {
        this.services.push(newService);
        this.dataSource.data = this.services;
        this.totalPages = Math.ceil(this.services.length / this.itemsPerPage);
      },
      error => {
        console.error('Error adding service:', error);
      }
    );
    this.loadServices();
  }

  createFormDataFromService(service: Service): FormData {
    const formData = new FormData();
    formData.append('name', service.name);
    formData.append('category', service.category);
    formData.append('description', service.description);
    if (service.image) {
      formData.append('file', service.image);
    }
    return formData;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < (this.totalPages || 1)) {
      this.currentPage++;
    }
  }

  deleteService(id: number) {
    this.allServicesService.deleteService(id).subscribe(
      () => {
        this.services = this.services.filter(service => service.id !== id);
        this.dataSource.data = this.services;
        this.totalPages = Math.ceil(this.services.length / this.itemsPerPage);
      },
      error => {
        console.error('Error deleting service:', error);
      }
    );
  }
}