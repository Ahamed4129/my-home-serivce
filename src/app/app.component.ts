import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-home-service';
  pageTitle: string = 'Dashboard';
  pageHeading: string = 'Overview of Dashboard';
  sidenavMode: MatDrawerMode = 'side';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    });
  }

  updatePageTitle() {
    let child = this.activatedRoute.firstChild;
    while (child) {
      if (child.snapshot.data['title']) {
        this.pageTitle = child.snapshot.data['title'];
        this.pageHeading = child.snapshot.data['heading'] || '';
        break;
      }
      child = child.firstChild;
    }
  }

  onRouteChange(event: any) {
    this.updatePageTitle();
  }
}
