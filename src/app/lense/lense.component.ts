import { Component, OnInit } from '@angular/core';
import { LenseService } from './lense.service';
import { Router } from '@angular/router';
import { lense } from './lense';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-lense',
  templateUrl: './lense.component.html',
  styleUrls: ['./lense.component.css']
})
export class LenseComponent implements OnInit {

  Accform: FormGroup;
  searchText: any;
  page:number = 1;
  lenses: lense[] = [];
  mode = 'create';

  constructor(
    private lenseService : LenseService,
    private router: Router,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.Accform = this.fb.group({
      lenseId: new FormControl(''),
      categoryId: new FormControl(''),
      quantity: new FormControl('',[ Validators.required]), 
      date: new FormControl('', Validators.required),
      name: new FormControl('' , [ Validators.required]), 
      code: new FormControl(''),
      notes: new FormControl(''),
      status : new FormControl(''),
    });
  }

  get validation() {
    return this.Accform.controls;
  }

  ngOnInit(): void {
    this.lenseService.getAllContacts().subscribe((response) => {
      this.lenses = response;
    });
  }

  deleteRow(id:string) {
    this.lenseService.deleteGuest(id).subscribe((response) => {
        this.lenseService.getAllContacts().subscribe(
          (response) => {
            this.lenses = response;
            this.router.navigate(['/lense']);
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }
      
  submitForm() {
    this.lenseService.submitForm(this.Accform.value).subscribe(
      (response) => {
        this.lenseService.getAllContacts().subscribe(
          (response) => {
            this.lenses = response;
            this.router.navigate(['/lense']);
            this.Accform.reset();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    )
  }

  updateGuest(id:any) {
    console.log(id);
    const InentoryId = id;
    this.Accform.value.lenseId = id;
    this.lenseService.updateGuest(id,this.Accform.value).subscribe((response) => {
        this.lenseService.getAllContacts().subscribe(
          (response) => {
            this.lenses = response;
            this.router.navigate(['/lense']);
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


  


