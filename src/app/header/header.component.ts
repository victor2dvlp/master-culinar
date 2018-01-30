import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  title = 'I\'m header';
  @Output() navSelectEvent = new EventEmitter<string>();

  onSelect(selectItem: string) {
    this.navSelectEvent.emit(selectItem);
  }

}
