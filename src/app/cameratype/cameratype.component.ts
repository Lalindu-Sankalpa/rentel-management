import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';
import { CameratypeService } from './cameratype.service';
import { Cameratype } from "./cameratype";

@Component({
  selector: 'app-cameratype',
  templateUrl: './cameratype.component.html',
  styleUrls: ['./cameratype.component.css']
})
export class CameratypeComponent implements OnInit {
  CameratypeName!:string;
  CameratypeID!: string;
  closeResult = '';
  Cameratypeform: FormGroup;
  cameratypes: Cameratype[] = [];
  searchText: any;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private cameratypeService : CameratypeService,
  ) {
    this.Cameratypeform = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required)
    });
  }

  get validation() {
    return this.Cameratypeform.controls;
  }

  ngOnInit(): void {
    // this.cameratypeService.getAllCameratype().subscribe((response) => {
    //   this.cameratypes = response;
    //   this.getId(this.cameratypes[0].id);
    // });

    this.cameratypes = [
      {
          "id": "1",
          "code": "1000",
          "name": "Drones"
        },
        {
          "id": "2",
          "code": "1000",
          "name": "DSLR"
        },
        {
          "id": "3",
          "code": "1000",
          "name": "Mirrorless Cameras"
        },
        {
          "id": "4",
          "code": "1000",
          "name": "360 Cameras"
        },
        {
          "id": "5",
          "code": "1000",
          "name": "Action Cameras"
        }
      ]

      this.CameratypeID="1";
  }
  submitForm() {
    this.cameratypeService.submitForm(this.Cameratypeform.value).subscribe(
      (response) => {
        this.cameratypeService.getAllCameratype().subscribe(
          (response) => {
            this.cameratypes = response;
            this.Cameratypeform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  deleteRow() {
    this.cameratypeService.deleteCameratype(this.CameratypeID).subscribe((response) => {
        this.cameratypeService.getAllCameratype().subscribe(
          (response) => {
            this.cameratypes = response;
            this.getId(this.cameratypes[0].id);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  UpdateCamera(id: string) {
    this.cameratypeService.UpdateCameratype(id,this.Cameratypeform.value).subscribe((response) => {
        this.cameratypeService.getAllCameratype().subscribe(
          (response) => {
            this.cameratypes = response;
            this.Cameratypeform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  };

  getDAta(id: string ) {
    this.CameratypeID = id;
  }

  cancel() {
    this.ngOnInit()
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
    this.Cameratypeform.reset();
  } 

  getName(name:string) {
    this.CameratypeName=name;
  }
  getId(id:string) {
    this.CameratypeID=id;
  }
}
