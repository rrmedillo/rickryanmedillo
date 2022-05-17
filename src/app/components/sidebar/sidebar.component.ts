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
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

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
  getlike:any = [];
  getlikeAll:any = [];
  getlikeCount:any = [];

  getVisitor:any = [];
  getVisitorCount:any;
  getTesti:any = [];
  getTestiCount:any = [];
  getLikeToken:any;
  getVisitorToken:any;
  getResult: any
  getVisitorResult: any
  getIpResult: any;
  getvisitorAll:any = [];
  getIp: any;
  passUserKey: any;
  userDate: any;
  passUserVisited: any;
  passCurrentIp: any;
  getKeyResult: any;
  getVisitedResult: any;
  visitedCount: any;
  sum: any; 
  boolResult: any;
  sKeyencoded: string = btoa("Stimul@t0r");
  
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
    this.fetchLikes();
    this.fetchVisitors();
    this.fetchTestimonials();

  }

  fetchTestimonials(): void {
    this.testimonialsService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c=>
          ({ key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(data => {
      this.testimonials = data;
      this.counttestimonials = data.length;
    })
  }
  
  fetchVisitors(): void {
    let currentDateTime =this.datepipe.transform((new Date), 'MMMM d, y');
    this.visitorService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c=>
          ({ key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe(data => {
      this.visitors = data;
      this.countvisitors = data.length;
      // console.log(this.visitors)
      if(this.countvisitors == 0) {
        // console.log('true')
        this.getIpResult = this.ipAddress;
        this.addVisitors();
      } else {
        // console.log('false')
        this.visitors.forEach((element: any) => {
          // console.log(element.visited);
          if(element.user_ip == this.ipAddress){
            this.boolResult = true;
            this.passUserKey = element.key;
            this.userDate = this.datepipe.transform((element.postedon), 'MMMM d, y')
            this.passUserVisited = element.visited;
          } else {
            this.boolResult = false;
          }
        });
        if(this.boolResult == true) {
          // console.log(currentDateTime)
          if(this.userDate == currentDateTime) {
            console.log('Last Visited: ' + this.userDate);
          } else {
            this.getKeyResult = this.passUserKey;
            this.getVisitedResult = this.passUserVisited;
            // console.log(this.getVisitedResult) 
            this.update();
          }
        } else {
          this.getIpResult = this.ipAddress;
           this.addVisitors();
        }
      }
    })
 }

 fetchLikes(): void {
     this.likeService.getAll().snapshotChanges().pipe(
       map(changes =>
        changes.map(c=>
          ({ key: c.payload.key, ...c.payload.val()})
          )
        )
     ).subscribe(data => {
      this.likes = data;
      this.countLikes = data.length;
      this.likes.forEach((element: any) => {
        // console.log(element.user_ip);
        if(element.user_ip == this.ipAddress){
          this.visitorIP = element.user_ip;
        }
      });
    })
  }

  // add like when click like button
  addLike(): void {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      user_ip: this.ipAddress,
      country: this.visitorCountry,
      postedon: currentDateTime
    };
  this.likeService.create(data)
    .then(() => {
      this.toastr.success("Thank You for Liking!")
    })
  }

   // update visitor
   update(): void {
    this.visitedCount = 1;
    this.sum = parseInt(this.visitedCount) + parseInt(this.getVisitedResult);
    // console.log(this.sum);
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    let data = {
      visited: this.sum,
      postedon: currentDateTime
    };
    console.log(data);
  this.visitorService.update(this.getKeyResult,data)
  .then(() => {
    this.toastr.info("You Visited: " + data.visited + " Times")
  })
  }

  // add visitor 
  addVisitors(): void {
    let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
    this.visitedCount = 1;
    let data = {
      user_ip: this.getIpResult,
      country: this.visitorCountry,
      visited: this.visitedCount,
      postedon: currentDateTime
    };

    this.visitorService.create(data)
    .then(() => {
      this.toastr.success("Visitor Added")
    })
  }


}
