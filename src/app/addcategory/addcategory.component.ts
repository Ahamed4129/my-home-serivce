import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AllServicesService } from '../all-services.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  newCategory = {
    id:null,
    name: '',
    description: '',
    image: null as File | null,
    imageUrl: ''
  };
  formTitle: string;

  constructor(
    public dialogRef: MatDialogRef<AddcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private allServicesService: AllServicesService
  ) {
    if (data) {
      this.newCategory = { ...data };
      this.formTitle = 'Update Category Form';
    } else {
      this.formTitle = 'New Category Form';
    } this.newCategory = this.data ? { ...this.data } : { name: '', description: '', image: null };
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newCategory.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.newCategory.image = file;
    }
  }
  onSubmit() {
  if (this.newCategory.name && this.newCategory.description) {
    // Create FormData object
    const formData = new FormData();
    console.log("formData:", formData);
    // formData.append('id', this.newCategory.id);
    formData.append('name', this.newCategory.name);
    formData.append('description', this.newCategory.description);
    
    if (this.newCategory.image) {
      formData.append('file', this.newCategory.image);
    }

    if (this.newCategory.id) {
      // If there's an ID, update the existing category
      this.allServicesService.updateCategory(formData, this.newCategory.id).subscribe(
        (response) => {
          console.log('Category updated successfully:', response);
          this.dialogRef.close(response); // Close dialog and pass response data
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    } else {
      // If there's no ID, add a new category
      this.allServicesService.addCategory(formData).subscribe(
        (response) => {
          console.log('Category added successfully:', response);
          this.dialogRef.close(response); // Close dialog and pass response data
        },
        (error) => {
          console.error('Error adding category:', error);
        }
      );
    }
  } else {
    this.dialogRef.close(this.newCategory);
  }
}

}
