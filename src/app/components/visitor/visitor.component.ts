import { Component, OnInit } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { VisitorsService } from 'src/app/services/visitors.service';
import { DatePipe } from '@angular/common';
import { Visitors } from 'src/app/models/visitors.model';
import { map } from 'rxjs';
 
@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  
  visitors?: Visitors[];

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

  // string: any = 'Stimulator1';
  constructor(
    public datepipe: DatePipe,
    public visitorService: VisitorsService
  ) { }

  ngOnInit(): void {
    this.fetchVisitorsMobile();
    this.fetchVisitors();
    }

 
    
    fetchVisitors(): void {
      this.visitorService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c=>
            ({ key: c.payload.key, ...c.payload.val() })
            )
          )
      ).subscribe(data => {
        this.visitors = data.reverse();
        this.getResult = this.visitors;
        setTimeout(()=>{   
          $('#datatableexample').DataTable( {
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu : [5, 10, 25]
        } );
        }, 1);
      })
    }
    
    fetchVisitorsMobile(): void {
      this.visitorService.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c=>
            ({ key: c.payload.key, ...c.payload.val() })
            )
          )
      ).subscribe(data => {
        this.visitors = data.reverse();
        this.getResultMobile = this.visitors;
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