// Import necessary Angular modules
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { AllServicesService } from '../all-services.service';


interface Category {
  id: number;
  image: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number | undefined;
  dataSource = new MatTableDataSource<Category>([]);
  items: Category[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    public dialog: MatDialog,
    private allServicesService: AllServicesService // Inject the service
  ) {
    this.dataSource.filterPredicate = (data: Category, filter: string) => {
      const filterValue = filter.trim().toLowerCase();
      return (
        data.id.toString().includes(filterValue) ||
        data.name.toLowerCase().includes(filterValue)
      );
    };
  }

  ngOnInit(): void {
    this.loadCategories(); // Load categories on component initialization
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadCategories(): void {
    
    this.allServicesService.getCategories().subscribe(
      (categories: Category[]) => {
        this.items = categories;
        this.dataSource.data = this.items; // Update data source
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  editItem(id: number) {
    const categoryToEdit = this.items.find(item => item.id === id);
    
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
      data: categoryToEdit
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(result,id);
      }
    });
  }
  
  updateCategory(updatedCategory: Category,id:number) {
    const formData = new FormData();
     //formData.append('id', updatedCategory.id.toString());
    formData.append('name', updatedCategory.name);
    formData.append('description', updatedCategory.description);
    if (updatedCategory.image) {
      formData.append('file', updatedCategory.image);
    }
  
    this.allServicesService.updateCategory(formData,id).subscribe(
      (response: Category) => {
        const index = this.items.findIndex(cat => cat.id === updatedCategory.id);
        if (index > -1) {
          this.items[index] = response;
          this.dataSource.data = this.items;
        }
      },
      error => {
        console.error('Error updating category:', error);
      }
    );
    this.loadCategories();
  }
  

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  createNewCategory() {
    const dialogRef = this.dialog.open(AddcategoryComponent, {
      width: '400px',
      data: null // Passing null since it's a new category
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategoryToTable(result); // Add new category to table
      }
    });
  }

  addCategoryToTable(category: Category) {
    const formData = this.createFormDataFromCategory(category);
  
    this.allServicesService.addCategory(formData).subscribe(
      (newCategory: Category) => {
        this.items.push(newCategory);
        this.dataSource.data = this.items;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      },
      error => {
        console.error('Error adding category:', error);
      }
    );
    this.loadCategories();
  }
  createFormDataFromCategory(category: Category): FormData {
  const formData = new FormData();
  formData.append('name', category.name);
  formData.append('description', category.description);
  if (category.image) {
    formData.append('file', category.image);
  }
  return formData;
}
  nextPage() {

  }
  deleteItem(id: number) {
    this.allServicesService.deleteCategory(id).subscribe(
      () => {
        this.items = this.items.filter(item => item.id !== id);
        this.dataSource.data = this.items;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      },
      error => {
        console.error('Error deleting category:', error);
      }
    );
  }
  
}
