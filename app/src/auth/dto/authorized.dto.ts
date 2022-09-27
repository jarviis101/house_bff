export class AuthorizedDTO {
    constructor(public token: string, public expiresAt: any = null) {}
}
