import { EntityActionType } from 'src/app/shared/enums/entityActionType';

export interface DialogData<T> {
    action: EntityActionType,
    entity?: T;
}