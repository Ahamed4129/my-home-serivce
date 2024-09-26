import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';
interface Testimonal{
  id:number;
  image:string;
  title:string;
  rating:number;
  content:string;
  username:string;
  designation:string;
}
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  searchText: string = '';
reviews: Testimonal[] = [];
  dataSource: any;
 
  constructor(
    public dialog: MatDialog,
    private allServicesService: AllServicesService // Inject the service
  ){}
  // getImagePath(image: string): string {
  //   return image ? `/${image.replace(/\\/g, '/')}` : '';
  // }
  
  ngOnInit(): void {
    this.loadtestimonal(); // Load categories on component initialization
  }
  loadtestimonal(): void {
    this.allServicesService.getTestimonal().subscribe(
      (data: Testimonal[]) => {
        this.reviews = data;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }
  times(n: number) {
    return new Array(n);
  }
  editReview(id: number) {
    const testimonialToEdit = this.reviews.find(review => review.id === id);
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '4000px',
      height:'4000px',
      data: testimonialToEdit // Passing null since it's a new category
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.updateTestimonal(result,id);
      }
    });
  }

  deleteReview(id: number) {
    this.allServicesService.deleteTestimonal(id).subscribe(
      () => {
        this.reviews = this.reviews.filter(item => item.id !== id);
        
        
      },
      error => {
        console.error('Error deleting category:', error);
      }
    );
  }
  createNewTestimonal() {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      width: '4000px',
      height:'4000px',
      data: null // Passing null since it's a new category
    });
  }
  updateTestimonal(updateTestimonal: Testimonal,id:number) {
    const formData = new FormData();
     //formData.append('id', updatedCategory.id.toString());
    formData.append('title', updateTestimonal.title);
    formData.append('rating', updateTestimonal.rating.toString());
    formData.append('content',updateTestimonal.content);
    formData.append('username',updateTestimonal.username);
    formData.append('designation',updateTestimonal.designation)
    if (updateTestimonal.image) {
      formData.append('file', updateTestimonal.image);
    }
  
    this.allServicesService.updateCategory(formData,id).subscribe(
      (response: Testimonal) => {
        const index = this.reviews.findIndex(cat => cat.id === updateTestimonal.id);
        if (index > -1) {
          this.reviews[index] = response;
          this.dataSource.data = this.reviews;
        }
      },
      error => {
        console.error('Error updating category:', error);
      }
    );
    this.loadtestimonal();
  }
}
