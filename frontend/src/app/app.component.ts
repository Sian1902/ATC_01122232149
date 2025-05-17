import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EventGridComponent } from './components/event-grid/event-grid.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  title: any;

 
}
