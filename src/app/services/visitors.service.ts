import { Injectable } from '@angular/core';
import { Visitors } from '../models/visitors.model';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  user_ip?: Visitors;
  status?: [] | any;
  visitorStatus: Visitors;
  // visitorData: Observable<Visitors>;
  
  private dbPath = 'visitors';
  visitorsRef: AngularFireList<Visitors>;
  visitorRef: AngularFireObject<Visitors> | any;
  visitRef: any;
  
  constructor(
    private db: AngularFireDatabase,
    public fireDb: AngularFirestore
    ) { 
    this.visitorStatus = new Visitors();
    this.visitorStatus.status = {"status":"Failed"};
    this.status = this.visitorStatus.status;
    this.visitorsRef = db.list(this.dbPath);
    // this.visitRef = fireDb.collection('visitors');
  }

  getVisitor(user_ip: any): AngularFireList<Visitors> {
    return this.db.list('visitors', ref => ref.orderByChild('user_ip').equalTo(user_ip));
  }

  getAll(): AngularFireList<Visitors> {
    return this.visitorsRef;
  }

  create(visitor: Visitors): any {
    return this.visitorsRef.push(visitor);
  }

  update(key: string, value: any): Promise<void> {
    return this.visitorsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.visitorsRef.remove(key);
  }
  
  deleteAll(key: string): Promise<void> {
    return this.visitorsRef.remove(key);
  }
}
