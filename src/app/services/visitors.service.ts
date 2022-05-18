import { Injectable } from '@angular/core';
import { Visitors } from '../models/visitors.model';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class VisitorsService {
  status?: [] | any;
  visitorStatus: Visitors;
 
  private dbPath = '/visitors';
  visitorsRef: AngularFireList<Visitors>;
  visitorRef: AngularFireObject<Visitors> | any;
 
  constructor(private db: AngularFireDatabase) { 
    this.visitorStatus = new Visitors();
    this.visitorStatus.status = {"status":"Failed"};
    this.status = this.visitorStatus.status;
    this.visitorsRef = db.list(this.dbPath);
  }

  getVisitor(user_ip: string) {
    return this.visitorRef = this.db.object(`/visitors/` + user_ip);
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
