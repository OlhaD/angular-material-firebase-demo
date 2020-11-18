import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

import { Role } from '../../shared/interfaces/role';

import { AngularFirestore, DocumentReference  } from 'angularfire2/firestore';


@Injectable({providedIn: 'root'})
export class RoleService{
    constructor(private afs: AngularFirestore){          
    }

    getAll(): Observable<any>{
        let roles = this.afs.collection<Role>('roles');

        return roles.valueChanges({
            idField: 'id'
        });
    }

    create(role: Role): Observable<any> {
        let roles = this.afs.collection<Role>('roles');

        return from(roles.add(role));
    }

    delete(id: string) {
        let roles = this.afs.collection<Role>('roles');

        return from(roles.doc(id).delete());
    }
}