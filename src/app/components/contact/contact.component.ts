import { Component, OnInit } from '@angular/core';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var navslide: any;
 
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  faMailReply = faMailReply;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faComments = faComments;
  faCommentAlt = faCommentAlt;
  getResponse: any;
  sendmailForm!: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl("");
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    ) {
      this.sendmailForm = this.formBuilder.group({
        name: this.name,
        email: this.email,
        message: this.message,
        honeypot: this.honeypot
      }); 
     }

  ngOnInit(): void {
    new navslide();
  }
  get f(){
    return this.sendmailForm.controls;
  }

    sendEmail(): void {
      if (this.sendmailForm.status == "VALID" && this.honeypot.value == "") {
        this.sendmailForm.disable(); // disable the form if it's valid to disable multiple submissions
        var formData: any = new FormData();
        formData.append("name", this.sendmailForm.value.name);
        formData.append("email", this.sendmailForm.value.email);
        formData.append("message", this.sendmailForm.value.message);
        this.http.post("https://script.google.com/macros/s/AKfycbxQZAfHTl_bPjc_4P730SukmK3nKj7dOZTDm8lKYC4hzo8jjegfysy49oNl5l4XbJp33w/exec", formData)
       .subscribe({
          next: response => {
            this.getResponse = response;
            if (this.getResponse.result) {
              this.toastr.success("Thanks for the message " + this.sendmailForm.value.name + " I'll get back to you soon!", "SUCCESS", {timeOut: 1500})
              .onHidden.subscribe(() => {
                this.reloadCurrentRoute();
              })
            } else {
              this.toastr.warning("Oops! Something went wrong... Reload the page and try again.", "WARNING", {timeOut: 1500})
              .onHidden.subscribe(() => {
                this.reloadCurrentRoute();
              })
            }
            this.sendmailForm.enable(); // re enable the form after a success
            console.log(response);
          },
          error: error => {
          }
        })
      }
    }

    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  }
  
  }
