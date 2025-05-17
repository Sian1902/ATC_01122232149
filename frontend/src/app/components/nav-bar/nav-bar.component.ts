import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
  selectedTab: 'saved' | 'booked' = 'saved';

  @Output() searchChanged = new EventEmitter<string>();

  onSearchChanged(query: string) {
    this.searchChanged.emit(query);  // Emit the search string here
  }

  @Output() tabClicked = new EventEmitter<string>();
  activeTab: string = 'home';

  onTabClick(tab: string): void {
    this.activeTab = tab;
    this.tabClicked.emit(tab);
  }
}
