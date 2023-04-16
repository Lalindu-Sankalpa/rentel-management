import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from "./Item";
import {AccService} from './acc.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-acc-manager',
  templateUrl: './acc-manager.component.html',
  styleUrls: ['./acc-manager.component.css']
})
export class AccManagerComponent implements OnInit {
  Accform: FormGroup;
  searchText: any;
  page:number = 1;
  items: Item[] = [];
  mode = 'create';

  constructor(
    private accService : AccService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Accform = this.fb.group({
      itemsId: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      accNo: new FormControl(''),
      price: new FormControl(''),
      status: new FormControl(''),
    });
  }

  get validation() {
    return this.Accform.controls;
  }

  ngOnInit(): void {
    // this.accService.getAllContacts().subscribe((response) => {
    //   this.items = response;
    // });

    this.items = [
      {
          "itemsId": 1,
          "name": "1000",
          "description": "1",
          "accNo": "12580.80",
          "price": "Clean",
          "status": "true"
        },
        {
          "itemsId": 1,
          "name": "1000",
          "description": "1",
          "accNo": "12580.80",
          "price": "Clean",
          "status": "true"
        }
      ]
      
  }

  deleteRow(id:string) {
    this.accService.deleteGuest(id).subscribe((response) => {
        this.accService.getAllContacts().subscribe(
          (response) => {
            this.items = response;
            this.router.navigate(['/acc']);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }
      
  submitForm() {
    debugger
    this.accService.submitForm(this.Accform.value).subscribe(
      (response) => {
        this.accService.getAllContacts().subscribe(
          (response) => {
            this.items = response;
            this.router.navigate(['/acc']);
            this.Accform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  updateGuest(id:string) {
    this.accService.updateGuest(id,this.Accform.value).subscribe((response) => {
        this.accService.getAllContacts().subscribe(
          (response) => {
            this.items = response;
            this.router.navigate(['/acc']);
            this.Accform.reset();
          },
          (error) => console.log(error)
        );
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
    this.Accform.reset();
  }

  cancel() {
    this.ngOnInit()
  }

}


  

