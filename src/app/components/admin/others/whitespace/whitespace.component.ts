import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { faHardDrive } from '@fortawesome/free-solid-svg-icons';
import { faPaste } from '@fortawesome/free-regular-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var autosize: any;

@Component({
  selector: 'app-whitespace',
  templateUrl: './whitespace.component.html',
  styleUrls: ['./whitespace.component.css']
})
export class WhitespaceComponent implements OnInit {
  faHardDrive = faHardDrive;
  faPaste = faPaste;
  faCopy = faCopy;
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
    new autosize();
  }

  get f(){
    return this.whitespaceForm.controls;
  }

  whitespaceCheck(): void {
    let nbspVal = this.whitespaceForm.value.whitespace;
    this.whitespaceValue = nbspVal.replace(/&nbsp;/g, " ");
    // console.log(nbspVal.length);
  }


  reloadCurrentRoute() { 
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
