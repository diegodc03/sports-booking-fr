import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Reservation } from '../../interfaces/Reservation';
import {MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


  const RESERVATIONS: Reservation[] = [
    {
      user: {
        firstname: 'Juan',
        lastname: 'Pérez',
        email: 'juanp@example.com',
        telephone: '600111222',
        password: 'securepassword',
      },
      facility: {
        id: 201,
        name: 'Cancha Central',
        capacity: 20,
        CityDTO: { cityId: 301, cityName: 'Madrid' },
        sport: { id: 401, sportName: 'Fútbol', maxPlayers: 11 },
      },
      date: '2023-10-15',
      hour: '18:30:00',
      status: 'confirmed',
      id: 0
    },
    {
      id: 2,
      user: {
        firstname: 'Juan',
        lastname: 'Pérez',
        email: 'juanp@example.com',
        telephone: '600111222',
        password: 'securepassword',
      },
      facility: {
        id: 202,
        name: 'Cancha Secundaria',
        capacity: 10,
        CityDTO: { cityId: 302, cityName: 'Barcelona' },
        sport: { id: 402, sportName: 'Tenis', maxPlayers : 2 },
      },
      date: '2023-10-16',
      hour: '20:00:00',
      status: 'pending',
    },
    {
      id: 3,
      user: {
        firstname: 'Juan',
        lastname: 'Pérez',
        email: 'juanp@example.com',
        telephone: '600111222',
        password: 'securepassword',
      },
      facility: {
        id: 203,
        name: 'Pista Norte',
        capacity: 15,
        CityDTO: { cityId: 303, cityName: 'Valencia' },
        sport: { id: 403, sportName: 'Baloncesto', maxPlayers: 5 },
      },
      date: '2023-10-17',
      hour: '17:00:00',
      status: 'confirmed',
    },
  ];



@Component({
  selector: 'app-booking-date-table',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './booking-date-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDateTableComponent {

  @Input() reservations: Reservation[] = [];

  displayedColumns: string[] = ['user', 'facility', 'date', 'hour'];
  dataSource = new MatTableDataSource<Reservation>();

  ngOnChanges(): void {
    this.dataSource.data = this.reservations || [];
  }
  


}
