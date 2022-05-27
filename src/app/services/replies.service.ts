import { Injectable } from '@angular/core';
import { Replies } from '../models/replies.model';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RepliesService {
  status?: [] | any;
  replyStatus: Replies;

  private dbPath = '/replies';
  repliesRef: AngularFireList<Replies>;
  replyRef: AngularFireObject<Replies> | any;

  constructor(private db: AngularFireDatabase) {
    this.replyStatus = new Replies();
    this.replyStatus.status = {"status":"Failed"};
    this.status = this.replyStatus.status;
    this.repliesRef = db.list(this.dbPath);
  }

  getReply(tid: any): AngularFireList<Replies> {
    return this.db.list('replies', ref => ref.orderByChild('tid').equalTo(tid));
  }

  getAll(): AngularFireList<Replies> {
    return this.repliesRef;
  }

  create(replies: Replies): any {
    return this.repliesRef.push(replies);
  }

  update(key: string, value: any): Promise<void> {
    return this.repliesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.repliesRef.remove(key);
  }
  
  deleteAll(key: string): Promise<void> {
    return this.repliesRef.remove(key);
  }
}
