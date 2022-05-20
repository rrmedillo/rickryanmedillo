import { Component, OnInit } from '@angular/core';

import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faMobile } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faEnvelope = faEnvelope;
  faMobile = faMobile;
  
  currentYear: number = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
  }

}
