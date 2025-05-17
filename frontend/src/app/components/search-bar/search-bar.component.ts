import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  @Output() searchChanged = new EventEmitter<string>();

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchChanged.emit(value);  // Make sure to emit the string here!
  }
}
