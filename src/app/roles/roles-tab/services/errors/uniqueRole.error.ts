export class UniqueRoleError extends Error {
    constructor(m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UniqueRoleError.prototype);
    }
}