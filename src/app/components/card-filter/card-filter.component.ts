import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule, TooltipDirective],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.scss'
})
export class CardFilterComponent {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() selected?: string;
  @Output() selectedEvent = new EventEmitter<string>();

  select(value: string) {
    console.log('select', value);
    this.selected = value;
    this.selectedEvent.emit(this.selected);
  }
}
