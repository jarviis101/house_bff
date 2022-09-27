import { User } from '@/user/dto/user.dto';

export class GoogleUser extends User {
    constructor(name: string, email: string) {
        super(name, email);
    }
}
