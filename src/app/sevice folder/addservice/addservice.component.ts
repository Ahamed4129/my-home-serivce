import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllServicesService } from 'src/app/all-services.service';

interface Variation {
  name: string;
  price: string;
}

interface NewService {
  id:null,
  category: string;
  serviceName: string;
  description: string;
  image: File | null;
  imageUrl: string;
  type: string;
  price: string;
  variations: Variation[];
}

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent {
  categories = ['Furnished Apartment', 'Unfurnished Apartment', 'Book by Room', 'Furnished Bungalow', 'Unfurnished Bungalow', 'Addon', 'Test'];
  types = ['Simple', 'Variation'];

  newService: NewService = {
    id:null,
    category: '',
    serviceName: '',
    description: '',
    image: null,
    imageUrl: '',
    type: '',
    price: '',
    variations: []
  };
  formTitle: string;

  constructor(
    public dialogRef: MatDialogRef<AddserviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private allServicesService: AllServicesService
  ) {
    if (data) {
      this.newService = { ...data, variations: data.variations || [] };
      this.formTitle = 'Update Service Form';
    } else {
      this.formTitle = 'New Service Form';
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newService.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.newService.image = file;
    }
  }

  addVariation() {
    this.newService.variations.push({ name: '', price: '' });
  }

  removeVariation(index: number) {
    this.newService.variations.splice(index, 1);
  }

  onSubmit() {
    if (this.newService.category && this.newService.serviceName && this.newService.description && this.newService.type) {
      // Create FormData object
      const formData = new FormData();
      formData.append('name', this.newService.category);
      formData.append('category', this.newService.serviceName);
      formData.append('description', this.newService.description);
      formData.append('type', this.newService.type);

      if (this.newService.type === 'Simple' && this.newService.price) {
        formData.append('price', this.newService.price);
      } else if (this.newService.type === 'Variation' && this.newService.variations.length > 0) {
        this.newService.variations.forEach((variation, index) => {
          formData.append(`variations[${index}].name`, variation.name);
          formData.append(`variations[${index}].price`, variation.price);
        });
      }

      if (this.newService.image) {
        formData.append('file', this.newService.image);
      }

      if (this.newService.id) {
        // Update existing service
        this.allServicesService.updateService(formData, this.newService.id).subscribe(
          (response) => {
            console.log('Service updated successfully:', response);
            this.dialogRef.close(response); // Close dialog and pass response data
          },
          (error) => {
            console.error('Error updating service:', error);
          }
        );
      } else {
        // Add new service
        this.allServicesService.addService(formData).subscribe(
          (response) => {
            console.log('Service added successfully:', response);
            this.dialogRef.close(response); // Close dialog and pass response data
          },
          (error) => {
            console.error('Error adding service:', error);
          }
        );
      }
    } else {
      alert('Please fill all required fields');
    }
  }
}