import { EntityActionType } from 'src/app/shared/enums/entityActionType';
import { Role } from 'src/app/shared/interfaces/role';

export interface DialogData {
    action: EntityActionType,
    role?: Role;
}