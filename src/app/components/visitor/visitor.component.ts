import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { DatePipe } from '@angular/common';
import { Visitors } from 'src/app/models/visitors.model';
import { map } from 'rxjs';
var ipInt = require('ip-to-int');
@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {
  
  visitor?: Visitors[];

  faEnvelope = faEnvelope;
  getVisitorAll:any;
  getVisitor:any;
  getVisitorToken:any;
  getVisitorAllMobile:any;
  getVisitorMobile:any;
  getVisitorMobileToken:any;
  getResult: any;
  getResultMobile: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [2, 8, 12, 16];
  getConvertedIp: any;
  // string: any = 'Stimulator1';
  constructor(
    public datepipe: DatePipe,
    public visitorService: VisitorsService
  ) { }

  ngOnInit(): void {
    this.fetchVisitorsView(); 
    this.fetchVisitorsMobile();
    }

    convertIp(value: any):void {
     return ipInt(value).toIP();
    }
    
    fetchVisitorsView(): any {
      this.visitorService.getAll().snapshotChanges().pipe(
        map(changesVisitorsView =>
          changesVisitorsView.map(e=>
            ({ key: e.payload.key, ...e.payload.val() })
            )
          )
      ).subscribe(dataViewVisitors => {
        this.visitor = dataViewVisitors.reverse();
        this.getResult = this.visitor;
        setTimeout(()=>{   
          $('#datatableexample').DataTable({
            retrieve: true,
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25]
        });
        }, 1);
      })
    }
    
    fetchVisitorsMobile(): void {
      this.visitorService.getAll().snapshotChanges().pipe(
        map(changesMobileView =>
          changesMobileView.map(f=>
            ({ key: f.payload.key, ...f.payload.val() })
            )
          )
      ).subscribe(dataMobileView => {
        this.visitor = dataMobileView.reverse();
        this.getResultMobile = this.visitor;
      })
    }

    onTableDataChange(event: any) {
      this.page = event;
      this.fetchVisitorsMobile();
    }
    onTableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.fetchVisitorsMobile();
    }
}