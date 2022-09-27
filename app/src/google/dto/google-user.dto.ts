import { User } from '@/user/dto/user.dto';

export class GoogleUserDTO extends User {
    constructor(name: string, email: string) {
        super(name, email);
    }
}
