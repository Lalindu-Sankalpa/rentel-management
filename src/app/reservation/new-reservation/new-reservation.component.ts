import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservation } from '../reservation';
import { GuestService } from 'src/app/guest/guest.service';
import { Guest } from 'src/app/guest/guest';
import { CameraService } from 'src/app/cameratype/camera/camera.service';
import { Camera } from 'src/app/cameratype/camera/camera';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  Reservationform: FormGroup;
  guests: Guest[] = [];
  cameras: Camera[] = [];
  reservations:Reservation[] = [];
  GuestId!: string;
  Guestform: FormGroup;
  Cameraform: FormGroup;
  newReservationNo!: string;

  constructor(
    private reservationService : ReservationService,
    private guestService : GuestService,
    private cameraService : CameraService,
    public fb: FormBuilder
  ) {
    this.Reservationform = this.fb.group({
      id: new FormControl(''),
      reservationNo: new FormControl(''),
      guestId: new FormControl('',Validators.required), 
      cameraId: new FormControl('', Validators.required),
      arrivalDate: new FormControl('' , Validators.required), 
      departureDate: new FormControl('', Validators.required),
      notes: new FormControl(''),
      departureTime: new FormControl(''),
      status: new FormControl('', Validators.required),
      arrivalTime: new FormControl(''),
      numNight: new FormControl(''),
      child: new FormControl(''),
      adults: new FormControl(''),
    }),
    this.Guestform = this.fb.group({
      id: new FormControl(''),
      name: new FormControl(''),
      phoneNo: new FormControl(''), 
      dateOfBirth: new FormControl(''),
      idNo: new FormControl(''), 
      email: new FormControl(''),
      isActive: new FormControl(''),
    }),
    this.Cameraform = this.fb.group({
      id: new FormControl(''),
      cameraNo: new FormControl(''),
      price: new FormControl(''), 
      cameraStatus: new FormControl(''),
      cameratypeId: new FormControl(''),
      isActive: new FormControl(''),
    })
  }

  get validation(){
  return this.Reservationform.controls;
  }
  
  ngOnInit(): void {
    this.guestService.getAllContacts().subscribe((response) => {
      this.guests = response;
    });
    this.cameraService.getAllCameras().subscribe((response) => {
      this.cameras = response;
    });
    this.reservationService.getOrders().subscribe((response) => {
      this.reservations = response;
      const reservation = this.reservations.sort((a, b) => b.reservationNo.localeCompare(a.reservationNo));
      const lastReservationNo = reservation[0].reservationNo;
      const split = lastReservationNo.split(/['OB']/);
      this.newReservationNo = 'OB'+('00000'+(Number(split[2])+1)).slice(-6);
    });
  }

  displayGuestName(id?: any) {
    const guest = this.guests.find(g => g.id == id);
    return id && guest ? guest.name : '';
  }
  displayCameraNo(id?: any) {
    const camera = this.cameras.find(r => r.id == id);
    return id && camera ? camera.cameraNo : '';
  }
  submitForm() {
    this.reservationService.submitForm(this.Reservationform.value).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    )
  }
  cancel() {
    this.Guestform.reset();
    this.Reservationform.reset();
    this.Cameraform.reset();
  }
}
