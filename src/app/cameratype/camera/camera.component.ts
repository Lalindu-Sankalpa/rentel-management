import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from "./camera";
import { CameraService } from './camera.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Input() data !:string; 
  @Input() search!:string;
  @Input() Name!:string;
  ID !:string;
  toggle = true;
  status = 'Enable'; 
  Cameraform: FormGroup;
  searchText: any;
  page: number = 1;
  cameras: Camera[] = [];
 
  constructor(
    private cameraService : CameraService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder,
  ) {
    this.Cameraform = this.fb.group({
      id: new FormControl(''),
      cameraNo: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required), 
      cameraStatus: new FormControl('', Validators.required),
      cameratypeId: new FormControl('', Validators.required),
      isActive: new FormControl(''),
    })
  }

  get validation() {
    return this.Cameraform.controls;
  }
  
  ngOnInit(): void {
    // this.cameraService.getAllCameras().subscribe((response) => {
    //   this.cameras = response;
     
    // });
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
      
  }
  setId(){
    this.ID = this.data;
  }

  deleteRow(id:string) {
    this.cameraService.deleteCamera(id).subscribe((response) => {
        this.cameraService.getAllCameras().subscribe(
          (response) => {
            this.cameras = response;
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  } 

  submitForm() {
    if(this.Cameraform.value.isActive == "" || this.Cameraform.value.isActive == null){
      this.Cameraform.value.isActive = false;
    }
    this.cameraService.submitForm(this.Cameraform.value).subscribe(
      (response) => {
        this.cameraService.getAllCameras().subscribe(
          (response) => {
            this.cameras = response;
            this.Cameraform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  UpdateCamera(id:string) {
    if(this.Cameraform.value.isActive == "" || this.Cameraform.value.isActive == null){
      this.Cameraform.value.isActive = false;
    }
    this.cameraService.UpdateCamera(id,this.Cameraform.value).subscribe((response) => {
        this.cameraService.getAllCameras().subscribe(
          (response) => {
            this.cameras = response;
            this.Cameraform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }
  
  open(content: any) {
    this.modalService.open(content, {size: 'sm', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    this.Cameraform.reset();
  }
  cancel() {
    this.ngOnInit()
  }
}
