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
      description: new FormControl(''),
      lostDate: new FormControl('',[ Validators.required]), 
      lostIn: new FormControl(''),
      reportBy: new FormControl(''), 
      foundDate: new FormControl(''),
      status: new FormControl(''),
    });
  }

  get validation() {
    return this.Accform.controls;
  }

  ngOnInit(): void {
    this.accService.getAllContacts().subscribe((response) => {
      this.items = response;
    });
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


  

