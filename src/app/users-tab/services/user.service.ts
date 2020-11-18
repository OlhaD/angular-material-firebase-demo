import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../shared/interfaces/user';

import { AngularFirestore  } from 'angularfire2/firestore';


@Injectable({providedIn: 'root'})
export class UserService{

    constructor(private afs: AngularFirestore){          
    }

    getAll(): Observable<any>{
        let users = this.afs.collection<User>('users');

        return users.valueChanges();
    }
}