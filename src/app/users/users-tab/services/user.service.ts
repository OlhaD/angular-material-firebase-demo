import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { User } from '../../../shared/interfaces/user';

import { AngularFirestore  } from 'angularfire2/firestore';


@Injectable({providedIn: 'root'})
export class UserService{

    constructor(private afs: AngularFirestore){          
    }

    getAll(): Observable<any>{
        let users = this.afs.collection<User>('users');

        return users.valueChanges({
            idField: 'id'
        });
    }

    create(user: User): Observable<any> {
        let users = this.afs.collection<User>('users');

        return from(users.add(user));
    }

    update(user: User): Observable<any> {
        let roles = this.afs.collection<User>('users');

        return from(roles.doc(user.id).update(user));
    }

    delete(id: string) {
        let users = this.afs.collection<User>('users');

        return from(users.doc(id).delete());
    }
}