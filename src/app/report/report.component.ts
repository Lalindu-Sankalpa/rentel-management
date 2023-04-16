import { Component, OnInit } from '@angular/core';
import { Guest } from '../guest/guest';
import { GuestService } from '../guest/guest.service';
import { Reservation } from '../reservation/reservation';
import { ReservationService } from '../reservation/reservation.service';
import { Camera } from '../cameratype/camera/camera';
import { CameraService } from '../cameratype/camera/camera.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  disableMessage = true;
  searchText: any;
  page:number = 1;
  guests: Guest[] = [];
  cameras: Camera[] = [];
  reservations: Reservation[] = [];
  
  constructor(
    private reservationService : ReservationService,
    private guestService : GuestService,
    private cameraService : CameraService,) { }

  ngOnInit(): void {
    
    // forkJoin({
    //   guestResponse: this.guestService.getAllContacts(),
    //   cameraResponse: this.cameraService.getAllCameras(),
    //   reservationResponse: this.reservationService.getOrders()
    // })
    // .subscribe((response) => {
    //   this.guests = response.guestResponse;
    //   this.cameras = response.cameraResponse;
    //   this.reservations = response.reservationResponse.map(reservation => {
    //     const camera = this.cameras.find(r => r.id == reservation.cameraId);
    //     reservation.cameraNo = camera != undefined ? camera.cameraNo : 'NA';
    //     const email = this.guests.find(e => e.id == reservation.guestId);
    //     reservation.guestEmail = email != undefined ? email.email : 'NA';
    //     const guest = this.guests.find(g => g.id == reservation.guestId);
    //     reservation.guestName = guest != undefined ? guest.name : 'NA';
    //     return reservation;
    //   });
    // });

    this.reservations= [
      {
        "orderId": "1",
        "reservationNo": "RE00001",
        "guestId": "1",
        "guestName": "Kamani Silva",
        "guestEmail": "kamani@gmail.com",
        "cameraNo": "00001",
        "cameraId": "1",
        "arrivalDate": "2021/01/01",
        "departureDate": "2021/01/05",
        "notes": "Advance - 10000.00",
        "status": "Confirmed"
      },
      {
        "orderId": "2",
        "reservationNo": "RE00002",
        "guestId": "2",
        "guestName": "Sandu Silva",
        "guestEmail": "sandu@gmail.com",
        "cameraNo": "00002",
        "cameraId": "1",
        "arrivalDate": "2021/01/01",
        "departureDate": "2021/01/05",
        "notes": "Advance - 15000.00",
        "status": "Taking"
      },
      {
        "orderId": "3",
        "reservationNo": "RE00003",
        "guestId": "3",
        "guestName": "Mal Silva",
        "guestEmail": "Mal@gmail.com",
        "cameraNo": "00003",
        "cameraId": "1",
        "arrivalDate": "2021/01/01",
        "departureDate": "2021/01/05",
        "notes": "Advance - 35000.00",
        "status": "Confirmed"
      }
    ]
  }
}
