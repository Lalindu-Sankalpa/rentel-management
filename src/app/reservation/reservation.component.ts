import { Component, OnInit } from '@angular/core';
import { Reservation } from './reservation';
import {ReservationService} from './reservation.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { GuestService } from 'src/app/guest/guest.service';
import { CameraService } from '../cameratype/camera/camera.service';
import { Camera } from '../cameratype/camera/camera';
import { Guest } from '../guest/guest';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  disableMessage = true;
  Reservationform: FormGroup;
  searchText: any;
  page:number = 1;
  guests: Guest[] = [];
  cameras: Camera[] = [];
  reservations: Reservation[] = [];
  
  constructor(
    private reservationService : ReservationService,
    private guestService : GuestService,
    private cameraService : CameraService,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Reservationform = this.fb.group({
      orderId: new FormControl(''),
      reservationNo: new FormControl(''),
      guestId: new FormControl('',Validators.required), 
      cameraId: new FormControl('', Validators.required),
      arrivalDate: new FormControl('' , Validators.required), 
      departureDate: new FormControl('', Validators.required),
      notes: new FormControl(''),
      status: new FormControl('')
    });
  }
  get validation() {
  return this.Reservationform.controls;
  }

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
    this.guests  = [
      {
        "id": "1",
        "name": "Kamani Silva",
        "phoneNo": "076 9955682",
        "dateOfBirth": "1998/01/09",
        "email": "kamani@gmail.com",
        "idNo": "986876384V",
        "isActive": true
      },
      {
        "id": "2",
        "name": "Sandu Silva",
        "phoneNo": "076 9955682",
        "dateOfBirth": "1998/01/09",
        "email": "sandu@gmail.com",
        "idNo": "986876384V",
        "isActive": true
      },
      {
        "id": "3",
        "name": "Mal Silva",
        "phoneNo": "076 9955682",
        "dateOfBirth": "1998/01/09",
        "email": "mal@gmail.com",
        "idNo": "986876384V",
        "isActive": true
      }
    ]

    this.cameras = [
      {
          "id": "1",
          "cameraNo": "00001",
          "price": "1000.00",
          "cameraStatus": "Good condition",
          "isActive":true,
          "cameratypeId": "1"
        },
        {
          "id": "2",
          "cameraNo": "00002",
          "price": "1000.00",
          "cameraStatus": "Good condition",
          "isActive":true,
          "cameratypeId": "1"
        },
        {
          "id": "3",
          "cameraNo": "00003",
          "price": "1000.00",
          "cameraStatus": "Good condition",
          "isActive":false,
          "cameratypeId": "1"
        },
        {
          "id": "4",
          "cameraNo": "00004",
          "price": "1000.00",
          "cameraStatus": "Good condition",
          "isActive":true,
          "cameratypeId": "1"
        },
        {
          "id": "5",
          "cameraNo": "00005",
          "price": "1000.00",
          "cameraStatus": "Good condition",
          "isActive":true,
          "cameratypeId": "1"
        },
        {
          "id": "6",
          "cameraNo": "00006",
          "price": "1000.00",
          "cameraStatus": "Good condition",
          "isActive":true,
          "cameratypeId": "1"
        }
      ]

      this.reservations = [
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
          "notes": "Advance - 30000.00",
          "status": "Confirmed"
        }
      ]


  }
  deleteRow(id:string){
    this.reservationService.deleteOrder(id).subscribe((response) => {
      this.ngOnInit();
      },
      (error) => console.log(error)
    )
  }
      
  submitForm() {
    this.reservationService.submitForm(this.Reservationform.value).subscribe(
      (response) => {
        this.reservationService.getOrders().subscribe(
          (response) => {
            this.reservations = response;
            this.Reservationform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  UpdateGuest(id:string){
    debugger
    this.reservationService.UpdateOrder(id,this.Reservationform.value).subscribe((response) => {
       this.ngOnInit();
      },
      (error) => console.log(error)
    )
  }
  
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    })
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  clearModalData() {
    this.Reservationform.reset();
  } 

  cancel() {
    this.ngOnInit()
  }

  checkIn(id:string){
    const reservation = this.reservations.find(r => r.orderId == id);
    if(reservation != undefined){
      reservation.status= "Taking";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
  checkOut(id:string){
    const reservation = this.reservations.find(r => r.orderId == id);
    if(reservation != undefined){
      reservation.status= "Received ";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
}
