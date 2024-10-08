import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-filter',
  standalone: true,
  imports: [CommonModule, TooltipDirective, TranslateModule],
  templateUrl: './card-filter.component.html',
  styleUrl: './card-filter.component.scss'
})
export class CardFilterComponent {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() selected?: string;
  @Input() key?: string;
  @Output() selectedEvent = new EventEmitter<string>();

  select(value: string) {
    console.log('select', value);
    this.selected = value;
    this.selectedEvent.emit(this.selected);
  }
}
