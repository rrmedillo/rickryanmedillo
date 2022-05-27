import { Component, OnInit } from '@angular/core';

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';

declare var toggleNav: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  faAlignJustify = faAlignJustify;
  faDashboard = faDashboard;
  faUsers = faUsers;
  faEye = faEye;
  faThumbsUp = faThumbsUp;
  faPen = faPen;
  faFile = faFile;
  faBolt = faBolt;

  constructor() { }

  ngOnInit(): void {
    new toggleNav();
  }
 
}
