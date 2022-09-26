import { User } from '@/user/model/user.model';

// TODO: to dto
export class GoogleUserModel extends User {
    constructor(name: string, email: string) {
        super(name, email);
    }
}
