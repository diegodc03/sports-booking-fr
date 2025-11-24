import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { ReservationData } from 'src/app/results/interfaces/ReservationResult';
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';

interface DialogData {
  reservation: ReservationData;
}

@Component({
  selector: 'app-result-dialog',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogActions
],
  templateUrl: './result-dialog.html',
  styleUrls: ['./result-dialog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultDialog {

  readonly dialogRef = inject(MatDialogRef<ResultDialog>);
  private fb = inject(FormBuilder);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  resultForm!: FormGroup;
  sportType = signal<string>('');
  resultType = signal<string>('');

  constructor() {
    // Normalizamos el nombre del deporte para evitar problemas con tildes/mayúsculas
    const sportNormalized = (this.data.reservation.sportName || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.sportType.set(sportNormalized);

    // Crear el FormGroup incluyendo sets (lo mantengo siempre y lo quitaré si no aplica)
    this.resultForm = this.fb.group({
      finalResult: ['', Validators.required],
      scoreA: [0],
      scoreB: [0],
      sets: this.fb.array([ this.createSetFormGroup() ]) // <-- importante: dentro del group
    });

    // Si el deporte no usa sets, removemos sets; si usa sets, removemos scoreA/scoreB
    if (sportNormalized === 'futbol' || sportNormalized === 'baloncesto') {
      this.resultForm.removeControl('sets');
    } else { // tenis, padel, etc.
      this.resultForm.removeControl('scoreA');
      this.resultForm.removeControl('scoreB');
    }
  }

  get setsArray(): FormArray {
    return this.resultForm.get('sets') as FormArray;
  }

  createSetFormGroup(): FormGroup {
    return this.fb.group({
      gamesA: [0, Validators.required],
      gamesB: [0, Validators.required]
    });
  }

  addSet(): void {
    // Si no existe sets (p.ej. fútbol), protegemos la llamada
    if (!this.resultForm.get('sets')) {
      console.warn('El formulario no tiene sets (deporte no admite sets)');
      return;
    }
    this.setsArray.push(this.createSetFormGroup());
  }

  removeSet(index: number): void {
    this.setsArray.removeAt(index);
  }

  saveResult() {
    if (this.resultForm.valid) {
      const finalResultString = this.formatResultBySport();
      this.dialogRef.close(finalResultString);
    }
  }

  formatResultBySport(): string {
    const formValue = this.resultForm.value;
    const sport = this.sportType();

    if (sport === 'futbol' || sport === 'baloncesto') {
      return `Equipo A ${formValue.scoreA} - Equipo B ${formValue.scoreB}`;
    }

    if (sport === 'tenis' || sport === 'padel') {
      const sets = formValue.sets || [];
      const setsString = sets.map((s: any) => `${s.gamesA}-${s.gamesB}`).join(', ');
      const setsWonA = sets.filter((s: any) => s.gamesA > s.gamesB).length;
      const setsWonB = sets.filter((s: any) => s.gamesB > s.gamesA).length;
      return `Sets: ${setsWonA}-${setsWonB} | Juegos: [${setsString}]`;
    }

    return formValue.finalResult;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}