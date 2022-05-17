import { Injectable } from '@angular/core';
import { Likes } from '../models/likes.model';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  status?: [] | any;
  likeStatus: Likes;
  
  private dbPath = '/likes';
  likesRef: AngularFireList<Likes>;
  likeRef: AngularFireObject<Likes> | any;

  constructor(private db: AngularFireDatabase) {
    this.likeStatus = new Likes();
    this.likeStatus.status = {"status":"Failed"};
    this.status = this.likeStatus.status;
    this.likesRef = db.list(this.dbPath);
   }

   getLike(key: string){
    return this.likeRef = this.db.object('/likes/' + key);
  }

  getAll(): AngularFireList<Likes> {
    return this.likesRef;
  }

  create(like: Likes): any {
    return this.likesRef.push(like);
  }

  update(key: string, value: any): Promise<void> {
    return this.likesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.likesRef.remove(key);
  }
  
  deleteAll(key: string): Promise<void> {
    return this.likesRef.remove(key);
  }
}
