import {AfterViewInit, Component, effect, inject, resource, viewChild, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ReservationData } from '../../interfaces/ReservationResult';
import { ReservationService } from '../../service/reservation-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIconModule } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResultDialog } from '@shared/components/result-dialog/result-dialog';


@Component({
  selector: 'app-results-list',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatDialogModule],
  templateUrl: './results-list.html',
  styleUrls: ['./results-list.css'],
  standalone: true,
})
export class ResultsList {

  private reservationService = inject(ReservationService);
  private dialog = inject(MatDialog);

  paginator = viewChild.required(MatPaginator);

  displayedColumns: string[] = ['actions', 'dateTime', 'facilityName', 'sportName', 'cityName', 'result'];
  dataSource = new MatTableDataSource<ReservationData>([]);

  // 1. Uso de rxResource para la carga estática:
  reservationsResource = rxResource<ReservationData[], void>({
    stream: () => this.reservationService.getReservationResults(), 
    defaultValue: [], 
  });



  constructor() {
    effect(() => {
      const data = this.reservationsResource.value();
      
      if (data) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator();
      }
    });
  }


  /**
   * Abre el diálogo de resultados, pasando la reserva seleccionada.
   */
  openResultDialog(reservation: ReservationData) {
      this.dialog.open(ResultDialog, { // 👈 Usaremos este nuevo componente
          width: '1000px',
          height: '600px',
          data: { 
              reservation: reservation // Pasamos la información de la reserva al modal
          }
      });
  }



}




// Datos de ejemplo para simular la información obtenida de las tablas
// (reservations, facilities, sports, cities, match_results)
const ELEMENT_DATA: ReservationData[] = [
  {
    dateTime: '2025-11-23 18:00',
    facilityName: 'Pista Central',
    sportName: 'Fútbol',
    cityName: 'Madrid',
    result: 'Equipo A 3 - Equipo B 1',
  },
  {
    dateTime: '2025-11-24 10:30',
    facilityName: 'Cancha 3',
    sportName: 'Baloncesto',
    cityName: 'Barcelona',
    result: 'Pendiente',
  },
  {
    dateTime: '2025-11-24 20:00',
    facilityName: 'Gimnasio Municipal',
    sportName: 'Voleibol',
    cityName: 'Sevilla',
    result: 'Equipo X 2 - Equipo Y 3',
  },
  {
    dateTime: '2025-11-25 12:00',
    facilityName: 'Campo de Arena',
    sportName: 'Pádel',
    cityName: 'Valencia',
    result: 'Pendiente',
  },
];