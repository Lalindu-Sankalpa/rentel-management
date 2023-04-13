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
    
    forkJoin({
      guestResponse: this.guestService.getAllContacts(),
      cameraResponse: this.cameraService.getAllCameras(),
      reservationResponse: this.reservationService.getOrders()
    })
    .subscribe((response) => {
      this.guests = response.guestResponse;
      this.cameras = response.cameraResponse;
      this.reservations = response.reservationResponse.map(reservation => {
        const camera = this.cameras.find(r => r.id == reservation.cameraId);
        reservation.cameraNo = camera != undefined ? camera.cameraNo : 'NA';
        const email = this.guests.find(e => e.id == reservation.guestId);
        reservation.guestEmail = email != undefined ? email.email : 'NA';
        const guest = this.guests.find(g => g.id == reservation.guestId);
        reservation.guestName = guest != undefined ? guest.name : 'NA';
        return reservation;
      });
    });
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
      reservation.status= "Checked In";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
  checkOut(id:string){
    const reservation = this.reservations.find(r => r.orderId == id);
    if(reservation != undefined){
      reservation.status= "Checked Out";
      this.reservationService.UpdateOrder(id,reservation).subscribe((response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )}
  }
}
