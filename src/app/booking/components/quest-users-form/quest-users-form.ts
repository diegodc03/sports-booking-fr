import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewReservationDTO } from '../../interfaces/NewReservationDTO';
import { GuestUser } from '../../interfaces/QuestUser';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingFilter } from '../../interfaces/BookingFilter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quest-users-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './quest-users-form.html',
  styleUrl: './quest-users-form.css'
})
export class QuestUsersForm {

  @Input() filter!: BookingFilter | null; // Datos de facilityId, date y hour
  @Output() confirm = new EventEmitter<NewReservationDTO>(); // Emite reserva final

  fb = new FormBuilder();
  playersForm = this.fb.group({
    players: this.fb.array([]),
  });

  get players(): FormArray<FormGroup> {
    return this.playersForm.get('players') as FormArray<FormGroup>;
  }

  addPlayer() {
    const playerGroup: FormGroup = this.fb.group({
      username: ['', Validators.required],
      surname: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    });
    this.players.push(playerGroup);
  }

  removePlayer(index: number) {
    this.players.removeAt(index);
  }

  onSubmit() {
    if (this.playersForm.valid) {
      const players: GuestUser[] = this.players.value.map((p, i) => ({
        id: i + 1,
        username: p.username,
        surname: p.surname,
        telephone: p.telephone,
        user: {} as any, // No necesario, pero mantiene compatibilidad
      }));

      const dto: NewReservationDTO = {
        ...this.filter!,
        players,
      };

      console.log('✅ Enviando reserva completa:', dto);
      this.confirm.emit(dto);
    } else {
      console.warn('⚠️ Formulario de jugadores inválido');
      this.playersForm.markAllAsTouched();
    }
  }

}
