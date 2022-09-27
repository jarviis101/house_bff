import { HashService } from './hash.service';

describe('HashService', () => {
    let hashService: HashService;
    beforeEach(() => {
        hashService = new HashService();
    });

    describe('hash', () => {
        it.each([['result1'], ['result2'], ['result3'], ['result4']])(
            'should return hashed password',
            async (rawPassword: string) => {
                const result = await hashService.hash(rawPassword);
                jest.spyOn(hashService, 'hash').mockImplementation(async () => result);
                expect(await hashService.hash('result')).toBe(result);
            },
        );
    });

    describe('compare', () => {
        it.each([['result1'], ['result2'], ['result3'], ['result4']])(
            'is equals raw password and hash password',
            async (rawPassword: string) => {
                const hashPassword = await hashService.hash(rawPassword);
                const result = await hashService.compare(rawPassword, hashPassword);
                jest.spyOn(hashService, 'compare').mockImplementation(async () => result);
                expect(await hashService.compare(rawPassword, hashPassword)).toBe(result);
            },
        );
    });
});
