import { Component, OnInit, NgZone } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { LikesService } from 'src/app/services/likes.service';
import { Likes } from 'src/app/models/likes.model';
import { DatePipe } from '@angular/common';
import { VisitorsService } from 'src/app/services/visitors.service';
import { Visitors } from 'src/app/models/visitors.model';
import { TestimonialsService } from 'src/app/services/testimonials.service';
import { Testimonials } from 'src/app/models/testimonials.model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

const ipInt = require('ip-to-int');

@Component({ 
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  likes?: Likes[];
  countLikes: any;
  visitors?: Visitors[];
  countvisitors: any;
  testimonials?: Testimonials[];
  counttestimonials: any;

  faThumbsUp = faThumbsUp;
  faUsers = faUsers;
  faComments = faComments;
  faDownload = faDownload;

  // like
  ipAddress:any;
  visitorCountry:any;

  visitorIP: any;
  request:any;
  result: any;

  boolResult: any;
  ipToInt: any;
  intToIp: any;
  getvisitorAll: any;

  constructor(
  public likeService: LikesService,
  public testimonialsService: TestimonialsService,
  public datepipe: DatePipe,
  public visitorService: VisitorsService,
  private router: Router,
  private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
    // convert ip to int
    this.ipToInt = ipInt(this.ipAddress).toInt();
    // console.log(this.ipToInt)
    // convert ip back original
    // this.intToIp = ipInt(this.ipToInt).toIP();
    // console.log(this.intToIp)

    this.fetchLikes();
    this.fetchVisitors();
    this.fetchTestimonials();
  }

  fetchTestimonials(): void {
    this.testimonialsService.getAll().snapshotChanges().pipe(
      map(changesTesimonials =>
        changesTesimonials.map(a=>
          ({ key: a.payload.key, ...a.payload.val() })
          )
        )
    ).subscribe(dataTesti => {
      this.testimonials = dataTesti;
      this.counttestimonials = dataTesti.length;
    })
  }

  fetchVisitors(): any {
    this.visitorService.getAll().snapshotChanges().pipe(
      map(changesAllVisitors =>
        changesAllVisitors.map(b=>
          ({ key: b.payload.key, ...b.payload.val() })
          )
        )
    ).subscribe(dataAllVisitors => {
      this.visitors = dataAllVisitors;
      this.countvisitors = dataAllVisitors.length;
    })
 }

 fetchLikes(): void {
     this.likeService.getAll().snapshotChanges().pipe(
       map(changesLikes =>
        changesLikes.map(d=>
          ({ key: d.payload.key, ...d.payload.val()})
          )
        )
     ).subscribe(dataLikes => {
      this.likes = dataLikes;
      this.countLikes = dataLikes.length;
      this.likes.forEach((element: any) => {
        // console.log(element.user_ip);
        if(element.user_ip == this.ipToInt){
          this.visitorIP = element.user_ip;
        }
      });
    })
  }

  // add like when click like button
  addLike(): void {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      user_ip: this.ipToInt,
      country: this.visitorCountry,
      postedon: currentDateTime
    };
  this.likeService.create(data)
    .then(() => {
      this.toastr.info("Thanks for the likes!!")
    })
  }

   


}
