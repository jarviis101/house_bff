import { UserInterface } from '@/google/dto/user.dto.interface';

export class User implements UserInterface {
    constructor(private name: string, private email: string) {}
}
