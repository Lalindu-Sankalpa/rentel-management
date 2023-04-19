import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Cameratype } from "./cameratype";
import { environment } from "src/environments/environment";

@Injectable({  //identify service
    providedIn: 'root',
})

export class CameratypeService {
    
    contactsBaseUrl: string = environment.serverBaseUrl  + '/cameraTypes';
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder){
    }

    getAllCameratype() {
      return this.http.get<Cameratype[]>(this.contactsBaseUrl);
    } 
    deleteCameratype(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/' + id);
    }
    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl , formData);
    }

    UpdateCameratype(id:string, formData: any) {
      return this.http.put (this.contactsBaseUrl + '/' + id, formData);
    }
}
