import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { empty, from } from 'rxjs';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { AngularFirestore,  } from 'angularfire2/firestore';

import { Role } from '../../../shared/interfaces/role';
import { UniqueRoleError } from './errors/uniqueRole.error';
import { Subject } from 'rxjs/internal/Subject';

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
        let existingRole = this.afs.collection<Role>('roles', 
            x => x.where('name', '==', role.name));
        
        return existingRole.get()
            .pipe(
                switchMap(x => {
                    if(x.docs.length > 0){
                        throw new UniqueRoleError('Role with same name already exists!');
                    }

                    return from(roles.add(role));
                })
            );
    }

    update(role: Role): Observable<any> {
        let roles = this.afs.collection<Role>('roles');
        let existingRole = this.afs.collection<Role>('roles', 
            x => x.where('name', '==', role.name));

        return existingRole.get()
            .pipe(
                switchMap(x => {
                    if(x.docs.length > 0 && x.docs[0].id !== role.id){
                        throw new UniqueRoleError('Role with same name already exists!');
                    }

                    return from(roles.add(role));
                })
            )
    }

    delete(id: string) {
        let roles = this.afs.collection<Role>('roles');

        return from(roles.doc(id).delete());
    }
}