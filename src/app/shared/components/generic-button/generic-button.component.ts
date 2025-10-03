import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generic-button',
  imports: [ReactiveFormsModule],
  templateUrl: './generic-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericButtonComponent {

  @Input({ required: true }) inputType!: string;
  @Input({ required: true }) placeholderText!: string;
  @Input({ required: true }) formControlNameText!: string;






}
