import { Injectable } from '@angular/core';
import { Testimonials } from '../models/testimonials.model';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
}) 
export class TestimonialsService {
  status?: [] | any;
  testimonialStatus: Testimonials;

  private dbPath = '/testimonials';
  testimonialsRef: AngularFireList<Testimonials>;
  testimonialRef: AngularFireObject<Testimonials> | any;

  constructor(private db: AngularFireDatabase) { 
    this.testimonialStatus = new Testimonials();
    this.testimonialStatus.status = {"status":"Failed"};
    this.status = this.testimonialStatus.status;
    this.testimonialsRef = db.list(this.dbPath);
  }
 
  getTesti(key: any) {
    return this.db.list('testimonials', ref => ref.orderByChild('key').equalTo(key));
  }

  getAll(): AngularFireList<Testimonials> {
    return this.db.list('testimonials', ref => ref.orderByChild('key'));
  }

  create(testimonials: Testimonials): any {
    return this.testimonialsRef.push(testimonials);
  }

  update(key: string, value: any): Promise<void> {
    return this.testimonialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.testimonialsRef.remove(key);
  }
  
  deleteAll(key: string): Promise<void> {
    return this.testimonialsRef.remove(key);
  }
}
