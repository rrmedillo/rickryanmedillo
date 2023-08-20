import { Component, OnInit } from '@angular/core';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare function whitespaceChecker(any: any): any;

@Component({
  selector: 'app-whitespace',
  templateUrl: './whitespace.component.html',
  styleUrls: ['./whitespace.component.css']
})
export class WhitespaceComponent implements OnInit {
  faMailReply = faMailReply;
  faEnvelope = faEnvelope;
  faComments = faComments;
  faCommentAlt = faCommentAlt;
  whitespaceValue: any;
  // whitespaceChecker: any;
  whitespaceForm!: FormGroup;
  whitespace: FormControl = new FormControl("", Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
  ) { 
    this.whitespaceForm = this.formBuilder.group({
      whitespace: this.whitespace,
    });
  }

  async ngOnInit(): Promise<void> {
    
    // this.whitespaceValue = new whitespaceChecker(this.whitespaceForm.value.whitespace);
  }

  get f(){
    return this.whitespaceForm.controls;
  }

  whitespaceCheck(): void {
    let nbspVal = this.whitespaceForm.value.whitespace;
    this.whitespaceValue = nbspVal.replace(/&nbsp;/g, "");
    console.log(this.whitespaceValue);
  }
  reloadCurrentRoute() { 
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
