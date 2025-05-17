import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { EventGridComponent } from "../event-grid/event-grid.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,  // <--- This is necessary
  imports: [NavBarComponent, EventGridComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchQuery: string = '';
  selectedTab: string = '';

  onSearch(event: string) {
    this.searchQuery = event;
  }

  onTabChanged(event: string) {
    this.selectedTab = event;
  }
}
