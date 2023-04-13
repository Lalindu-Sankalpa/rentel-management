import { HttpClient } from "@angular/common/http";  //call API
import { Injectable } from "@angular/core";  //service
import { Camera } from "./camera";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({  //identify service
    providedIn: 'root',
})

export class CameraService {
    
    contactsBaseUrl: string = environment.serverBaseUrl;
    constructor(private http : HttpClient, private router: Router, public fb: FormBuilder){
    }

    getAllCameras() {
      return this.http.get<Camera[]>(this.contactsBaseUrl + '/cameras');
    }
    deleteCamera(id: string) {
      return this.http.delete(this.contactsBaseUrl + '/cameras'+'/' + id);
    }
    submitForm(formData: any) {
      return this.http.post(this.contactsBaseUrl + '/cameras', formData);
    }

    UpdateCamera(id:string, formData: any) {
      return this.http.put (this.contactsBaseUrl + '/cameras'+ '/' + id, formData);
    }
}
