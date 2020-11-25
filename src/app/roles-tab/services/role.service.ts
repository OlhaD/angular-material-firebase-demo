import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

import { Role } from '../../shared/interfaces/role';

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

    update(role: Role): Observable<any> {
        let roles = this.afs.collection<Role>('roles');

        return from(roles.doc(role.id).update(role));
    }

    delete(id: string) {
        let roles = this.afs.collection<Role>('roles');

        return from(roles.doc(id).delete());
    }
}