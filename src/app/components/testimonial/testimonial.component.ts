import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialsService } from 'src/app/services/testimonials.service';
import { RepliesService } from 'src/app/services/replies.service';
import { Replies } from 'src/app/models/replies.model';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { Testimonials } from 'src/app/models/testimonials.model';
import { faMailReply } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, map, switchMap } from 'rxjs';

declare var navslide: any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})

export class TestimonialComponent implements OnInit {
  
  testimonials?: Testimonials[];
  replies?: Replies[];

  faComments = faComments;
  faComment = faComment;
  faCommentAlt = faCommentAlt;
  faUser = faUser;
  faTimesCircle = faTimesCircle;
  faCommentDots = faCommentDots;
  faCalendar = faCalendar;
  faLocation = faLocation;
  faMailReply = faMailReply;

  ipAddress:any;
  visitorCountry:any;
  request:any;
  result: any;
  visitorCity:any;
  
  getTesti:any;
  getAllTesti:any;
  getTestiId:any;

  getReply:any;
  getAllReply:any;
  getReplyTid:any;
  getReplyName:any;
  getReplyBody:any;
  getReplyCountry:any;
  getReplyPostedon:any; 

  getTestiToken: any
  getTestiAll: any;
  getTestiResult:any;

  getReplyToken: any 
  getReplyAll: any;
  getReplyResult: any;
  counttestimonials: any
  countReplies: any

  form!: FormGroup; 
  replyForm!: FormGroup; 
  replyName:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 8, 12, 16];
  
  tIdValue: any;
  combData: any;

  constructor(
    private testimonialsService: TestimonialsService,
    public repliesService: RepliesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    ) { 
      
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        testimonials: ['', Validators.required]
      })

      this.replyForm = this.formBuilder.group({
        name: ['', Validators.required],
        reply: ['', Validators.required]
      })
    }

    onItemSelector(value :any) {
      this.tIdValue = value;
    console.log(this.tIdValue);
    }
    
    

   async ngOnInit(): Promise<void> {
    new navslide();
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
    this.visitorCity = this.result.city;
    this.testimonialsData();
}


testimonialsData() {
  return this.testimonialsService.getAll().snapshotChanges().pipe(
    switchMap((actions) => combineLatest(
      actions.map((a) => {
        const testimoniData = a.payload.val();
        const testimoniKey = a.payload.key;
        // testimoniData!.key = a.payload.key;
        return this.repliesService.getReply(testimoniKey).snapshotChanges()
        .pipe(
          map((replyAction) => {
            // const repId = replyAction.map(b => { return b.payload.key;})
            const repData = replyAction.map(b => ({ key: b.payload.key, ...b.payload.val()}))
            //  return { user: { uid: userData.uid, displayName: userData.displayName }, ...actData };
            return { testimony: {testimoniKey, ...testimoniData}, reply: { ...repData} }
          })
        )
      })
    )) 
  ).subscribe({
    next: data => {
      this.combData = data.reverse();
      // console.log(this.combData)
    }
  })
}


onTableDataChange(event: any) {
  this.page = event;
  this.testimonialsData();
}
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.testimonialsData();
} 

get f(){
  return this.form.controls;
}

get rF(){
  return this.replyForm.controls;
}
 
  addTesti(): void {
    var currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    var data = {
      name: this.form.value.name,
      testimonials: this.form.value.testimonials,
      country: this.visitorCountry,
      city: this.visitorCity,
      postedon: currentDateTime
    }

  this.testimonialsService.create(data).then(() => {
    this.toastr.success("Testimonial has been Posted!", "SUCCESS", {timeOut: 1000})
      .onHidden.subscribe(() => {
        this.form.reset();
      })
    })
  } 


  addReplies(): void {
    // console.log(this.tIdValue);
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      tid: this.tIdValue,
      name: this.replyForm.value.name,
      reply: this.replyForm.value.reply,
      country: this.visitorCountry,
      city: this.visitorCity,
      postedon: currentDateTime
    };

    this.repliesService.create(data).then(() => {
      this.toastr.success("Thank You for your Reply/s!", "SUCCESS", {timeOut: 1000})
      .onHidden.subscribe(() => {
        this.replyForm.reset();
      })
    })
  }
}

