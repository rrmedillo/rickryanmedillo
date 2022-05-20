import { Component, OnInit } from '@angular/core';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

import { DatePipe } from '@angular/common';
import { VisitorsService } from 'src/app/services/visitors.service';
import { Visitors } from 'src/app/models/visitors.model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

declare var navslide: any;
const ipInt = require('ip-to-int');

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {

  faUserTie = faUserTie; 
  faGraduationCap = faGraduationCap;
  faAward = faAward;
  faWrench = faWrench;
  faBriefcase = faBriefcase;

  request:any;
  result: any;
  ipAddress:any;
  visitorCountry:any;
  visitorCity:any;

  visitors?: Visitors[];
  ipToInt: any;
  getSingleVisitor: any;
  getIpResult: any;
  passUserKey: any;
  userDate: any;
  passUserVisited: any;
  getKeyResult: any;
  getVisitedResult: any;
  visitedCount: any;
  sum: any; 
  
  constructor(
  public datepipe: DatePipe,
  public visitorService: VisitorsService,
  private toastr: ToastrService
  ) {  }

  async ngOnInit(): Promise<void> {
    new navslide();
    // geolocation
    this.request = await fetch("https://ipinfo.io/json?token=1509eda3fb61e2");
    this.result = await this.request.json();
    this.ipAddress = this.result.ip;
    this.visitorCountry = this.result.country;
    this.visitorCity = this.result.city;
    // console.log(this.visitorCity);

    this.ipToInt = ipInt(this.ipAddress).toInt();
    this.fetchVisitorIp();
  } 

 
  fetchVisitorIp() {
    let currentDateTime =this.datepipe.transform((new Date), 'MMMM d, y');
    // console.log(this.ipToInt)
    this.visitorService.getVisitor(this.ipToInt).snapshotChanges().pipe(
      map(changesSingleVisitor =>
        changesSingleVisitor.map(c=>
          ({ key: c.payload.key, ...c.payload.val() })
          )
        )
    ).subscribe({
      next: dataSingleVisitor => {
        this.getSingleVisitor = dataSingleVisitor;
        // console.log(this.getSingleVisitor)
        if(this.getSingleVisitor.length == 0) {
          this.getIpResult = this.ipToInt;
          console.log('fetch single visitor didnt match - (fetchVisitorIp) - add visitor')
          // this.addVisitors();
        } else {
            console.log('fetch single visitor match - (fetchVisitorIp) - get visitor details')
            this.passUserKey = this.getSingleVisitor[0].key;
            this.userDate = this.datepipe.transform((this.getSingleVisitor[0].postedon), 'MMMM d, y')
            this.passUserVisited = this.getSingleVisitor[0].visited;
            if(this.userDate == currentDateTime) {
              console.log('same date visited: - (fetchVisitorIp) - already counted times of visit');
            } else { 
              console.log('not same date! - (fetchVisitorIp) - update visitor times of visit')
              this.getKeyResult = this.passUserKey;
              this.getVisitedResult = this.passUserVisited;
              // this.update();
            }
        }
      }
    })
    
  }
 
// update visitor
update() {
  this.visitedCount = 1;
  this.sum = parseInt(this.visitedCount) + parseInt(this.getVisitedResult);
  // console.log(this.sum);
  let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
  let data = {
    visited: this.sum,
    postedon: currentDateTime
  };
  // console.log(data);
this.visitorService.update(this.getKeyResult,data)
.then(() => {
  this.toastr.info("You Visited: " + data.visited + " Times")
})
}

// add visitor 
addVisitors() {
  let currentDateTime =this.datepipe.transform((new Date), 'yyyy-MM-dd h:mm:ss');
  this.visitedCount = 1;
  let data = {
    user_ip: this.getIpResult,
    country: this.visitorCountry,
    city: this.visitorCity,
    visited: this.visitedCount,
    postedon: currentDateTime
  };

  this.visitorService.create(data)
  .then(() => {
    this.toastr.success("Welcome Visitor")
  })
}
  

  birthYear: number = 1986;
  birthMonth:number = 9;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1;
  myLessAge: number = 0;

  getLessAge() {
   this.myLessAge = this.currentYear - this.birthYear;
    return this.myLessAge - 1;
  }

  getMoreAge() {
   return this.myLessAge = this.currentYear - this.birthYear;
   }


}
