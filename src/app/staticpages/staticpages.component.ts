import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { EditstaticComponent } from '../editstatic/editstatic.component';
import { MatDialog } from '@angular/material/dialog';

interface Statics {
  id: number;
  banner: string;
  title: string;
  content:string;
  metaTitle:string;
  metaDescription:string;
}

@Component({
  selector: 'app-staticpages',
  templateUrl: './staticpages.component.html',
  styleUrls: ['./staticpages.component.css']
})
export class StaticpagesComponent implements OnInit {
  items: Statics[] = [];
  currentPage = 1;
  itemsPerPage = 4;
  totalPages: number = 0;

  constructor(private allService: AllServicesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadStaticPages(); // Load static pages on component initialization
  }

  loadStaticPages(): void {
    this.allService.getStatic().subscribe(
      (data: Statics[]) => {
        console.log('loadItems')
        this.items = data;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
      },
      error => {
        console.error('Error fetching static pages:', error);
      }
    );
  }

  editItem(id: number) {
    const staticItemToEdit = this.items.find(item => item.id === id);
    const dialogRef = this.dialog.open(EditstaticComponent, {
      width: '4000px',
      height:'4000px',
      data: staticItemToEdit 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("clicked")
        this.loadStaticPages()
      }
    });
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
