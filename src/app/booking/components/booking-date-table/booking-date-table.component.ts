import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Reservation } from '../../interfaces/Reservation';
import {MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


  const RESERVATIONS: Reservation[] = [
    {
      id: 1,
      user: {
        id: 101,
        username: 'juanp',
        name: 'Juan',
        surname: 'Pérez',
        email: 'juanp@example.com',
        telephone: '600111222',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-01-01').toISOString(),
      },
      facility: {
        id: 201,
        name: 'Cancha Central',
        capacity: 20,
        city: { id: 301, city_name: 'Madrid' },
        sport: { id: 401, sport_name: 'Fútbol', max_players: 11 },
      },
      date: '2023-10-15',
      hour: '18:30:00',
      status: 'confirmed',
    },
    {
      id: 2,
      user: {
        id: 102,
        username: 'mariaL',
        name: 'María',
        surname: 'López',
        email: 'marial@example.com',
        telephone: '600333444',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-02-05').toISOString(),
      },
      facility: {
        id: 202,
        name: 'Cancha Secundaria',
        capacity: 10,
        city: { id: 302, city_name: 'Barcelona' },
        sport: { id: 402, sport_name: 'Tenis', max_players: 2 },
      },
      date: '2023-10-16',
      hour: '20:00:00',
      status: 'pending',
    },
    {
      id: 3,
      user: {
        id: 103,
        username: 'carloss',
        name: 'Carlos',
        surname: 'Santos',
        email: 'carloss@example.com',
        telephone: '600555666',
        role: { id: 2, role_name: 'admin' },
        created_at: new Date('2023-03-10').toISOString(),
      },
      facility: {
        id: 203,
        name: 'Pista Norte',
        capacity: 15,
        city: { id: 303, city_name: 'Valencia' },
        sport: { id: 403, sport_name: 'Baloncesto', max_players: 5 },
      },
      date: '2023-10-17',
      hour: '17:00:00',
      status: 'confirmed',
    },
    {
      id: 4,
      user: {
        id: 104,
        username: 'anaG',
        name: 'Ana',
        surname: 'García',
        email: 'anag@example.com',
        telephone: '600777888',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-04-15').toISOString(),
      },
      facility: {
        id: 204,
        name: 'Estadio Este',
        capacity: 25,
        city: { id: 304, city_name: 'Sevilla' },
        sport: { id: 401, sport_name: 'Fútbol', max_players: 11 },
      },
      date: '2023-10-18',
      hour: '19:30:00',
      status: 'cancelled',
    },
    {
      id: 5,
      user: {
        id: 105,
        username: 'luisF',
        name: 'Luis',
        surname: 'Fernández',
        email: 'luisf@example.com',
        telephone: '600999000',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-05-20').toISOString(),
      },
      facility: {
        id: 205,
        name: 'Pabellón Oeste',
        capacity: 12,
        city: { id: 305, city_name: 'Bilbao' },
        sport: { id: 403, sport_name: 'Baloncesto', max_players: 5 },
      },
      date: '2023-10-19',
      hour: '16:00:00',
      status: 'pending',
    },
    {
      id: 6,
      user: {
        id: 106,
        username: 'sofiaR',
        name: 'Sofía',
        surname: 'Ramírez',
        email: 'sofiar@example.com',
        telephone: '601111222',
        role: { id: 2, role_name: 'admin' },
        created_at: new Date('2023-06-25').toISOString(),
      },
      facility: {
        id: 206,
        name: 'Cancha Sur',
        capacity: 18,
        city: { id: 306, city_name: 'Granada' },
        sport: { id: 402, sport_name: 'Tenis', max_players: 2 },
      },
      date: '2023-10-20',
      hour: '18:00:00',
      status: 'confirmed',
    },
    {
      id: 7,
      user: {
        id: 107,
        username: 'pabloM',
        name: 'Pablo',
        surname: 'Martínez',
        email: 'pablom@example.com',
        telephone: '601333444',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-07-30').toISOString(),
      },
      facility: {
        id: 207,
        name: 'Gimnasio Central',
        capacity: 8,
        city: { id: 307, city_name: 'Zaragoza' },
        sport: { id: 404, sport_name: 'Squash', max_players: 2 },
      },
      date: '2023-10-21',
      hour: '15:30:00',
      status: 'confirmed',
    },
    {
      id: 8,
      user: {
        id: 108,
        username: 'lauraV',
        name: 'Laura',
        surname: 'Vega',
        email: 'laurav@example.com',
        telephone: '601555666',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-08-10').toISOString(),
      },
      facility: {
        id: 208,
        name: 'Estadio Norte',
        capacity: 30,
        city: { id: 308, city_name: 'Málaga' },
        sport: { id: 401, sport_name: 'Fútbol', max_players: 11 },
      },
      date: '2023-10-22',
      hour: '21:00:00',
      status: 'pending',
    },
    {
      id: 9,
      user: {
        id: 109,
        username: 'diegoH',
        name: 'Diego',
        surname: 'Hernández',
        email: 'diegoh@example.com',
        telephone: '601777888',
        role: { id: 2, role_name: 'admin' },
        created_at: new Date('2023-09-05').toISOString(),
      },
      facility: {
        id: 209,
        name: 'Pabellón Este',
        capacity: 14,
        city: { id: 309, city_name: 'Valladolid' },
        sport: { id: 403, sport_name: 'Baloncesto', max_players: 5 },
      },
      date: '2023-10-23',
      hour: '17:30:00',
      status: 'confirmed',
    },
    {
      id: 10,
      user: {
        id: 110,
        username: 'elenaC',
        name: 'Elena',
        surname: 'Cruz',
        email: 'elenac@example.com',
        telephone: '601999000',
        role: { id: 1, role_name: 'user' },
        created_at: new Date('2023-10-01').toISOString(),
      },
      facility: {
        id: 210,
        name: 'Cancha Oeste',
        capacity: 22,
        city: { id: 310, city_name: 'Alicante' },
        sport: { id: 401, sport_name: 'Fútbol', max_players: 11 },
      },
      date: '2023-10-24',
      hour: '19:00:00',
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

  @Input({required:true}) date!: Date | null;

  displayedColumns: string[] = ['user', 'facility', 'date', 'hour'];
  dataSource = new MatTableDataSource<Reservation>(RESERVATIONS);
  

}
