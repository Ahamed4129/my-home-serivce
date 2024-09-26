import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllServicesService } from '../all-services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  feedbackForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private allServicesService: AllServicesService,
    public dialogRef: MatDialogRef<FeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data; // Check if we are editing existing feedback
    this.feedbackForm = this.fb.group({
      feedbackTitle: [data?.title || '', Validators.required],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(5), this.maxRatingValidator]],
      review: [data?.content || '', Validators.required],
      username: [data?.username || '', Validators.required],
      designation: [data?.designation || '', Validators.required],
      image: [null]
    });
  }
  starsArray = [1, 2, 3, 4, 5];  // Array to loop through stars
  rating = 1;  // Default rating

  setRating(rating: number): void {
    this.rating = rating;
    this.feedbackForm.patchValue({ rating: rating });
  }
  maxRatingValidator(control: AbstractControl) {
    const value = control.value;
    return value > 5 ? { maxRatingExceeded: true } : null;
  }
  onRatingClick(rating: number) {
    this.feedbackForm.patchValue({ rating });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.feedbackForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      const formData = new FormData();
      
      // Append form data values
      formData.append('title', this.feedbackForm.get('feedbackTitle')?.value);
      formData.append('rating', this.feedbackForm.get('rating')?.value.toString()); // Convert to string
      formData.append('content', this.feedbackForm.get('review')?.value);
      formData.append('username', this.feedbackForm.get('username')?.value);
      formData.append('designation', this.feedbackForm.get('designation')?.value);

      // Append image file
      const imageFile = this.feedbackForm.get('image')?.value;
      if (imageFile) {
        formData.append('file', imageFile);
      }

      // Check if we are in edit mode
      if (this.isEditMode) {
        this.allServicesService.updateTestimonal(formData, this.data.id).subscribe(
          (response) => {
            console.log('Feedback updated successfully:', response);
            this.dialogRef.close(response); // Close dialog with updated feedback data
          },
          (error) => {
            console.error('Error updating feedback:', error);
          }
        );
      } else {
        this.allServicesService.addTestimonal(formData).subscribe(
          (response) => {
            console.log('Feedback added successfully:', response);
            this.dialogRef.close(response); // Close dialog with new feedback data
          },
          (error) => {
            console.error('Error adding feedback:', error);
          }
        );
      }
    }
  }
}
  

