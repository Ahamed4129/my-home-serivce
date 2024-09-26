import { Component, EventEmitter, Inject,Output } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editstatic',
  templateUrl: './editstatic.component.html',
  styleUrls: ['./editstatic.component.css']
})
export class EditstaticComponent {
  pageForm: FormGroup;
  selectedFile: File | null = null;
  @Output() updatesucess =new EventEmitter<void>();
  constructor(private fb: FormBuilder, private allservice: AllServicesService,
    public dialogRef: MatDialogRef<EditstaticComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log("data",data)
    // Initialize form with validators
    this.pageForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      content: [this.data?.content || '', Validators.required],
      metaTitle: [this.data?.
        metaTile || '', Validators.required],
      metaDescription: [this.data?.metaDescription || '', Validators.required]
    });
  }

  // Handle file selection for the banner
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Submit form data
  onSubmit() {
    if (this.pageForm.valid) {
      const formData = new FormData();
      
      formData.append('Title', this.pageForm.get('title')?.value || ''); // Ensure value is not undefined
      formData.append('Content', this.pageForm.get('content')?.value || ''); // Ensure value is not undefined
      formData.append('MetaTile', this.pageForm.get('metaTitle')?.value || ''); // Ensure value is not undefined
      formData.append('MetaDescription', this.pageForm.get('metaDescription')?.value || ''); // Ensure value is not undefined
  
      if (this.selectedFile) {
        formData.append('File', this.selectedFile);  // Attach the file if it's selected
      }
  
      this.allservice.updateStatic(formData, this.data.id).subscribe(
        (response) => {
          console.log('Page updated successfully:', response);
          this.dialogRef.close(response);
          this.updatesucess.emit(response)
        },
        (error) => {
          console.error('Error updating page:', error);
        }
      );
    }
  }
  
}
