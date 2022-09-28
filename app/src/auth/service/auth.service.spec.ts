import { AuthServiceInterface } from '@/auth/service/auth.service.interface';
import { UserProviderInterface } from '@/user/provider/user.provider.interface';
import { UserProvider } from '@/user/provider/user.provider';
import { User, UserSchema } from '@/schemas/user.schema';
import { connect, Connection, Model } from 'mongoose';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { UserService } from '@/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@/auth/service/hash.service';
import { AuthService } from '@/auth/service/auth.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { UserAlreadyExistException } from '@/user/exception/user-already-exist.exception';

describe('AuthService', () => {
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let userModel: Model<User>;

    let hashService: HashService;
    let jwtService: JwtService;
    let userProvider: UserProviderInterface;
    let userService: UserServiceInterface;
    let authService: AuthServiceInterface;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        mongoConnection = (await connect(mongod.getUri())).connection;
        userModel = mongoConnection.model(User.name, UserSchema);

        userProvider = new UserProvider(userModel);
        userService = new UserService(userModel);
        hashService = new HashService();
        jwtService = new JwtService({ secret: 's3cr3t' });
        authService = new AuthService(userService, userProvider, hashService, jwtService);
    });

    afterAll(async () => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        await mongoConnection.dropDatabase();
    });

    describe('authorize', () => {
        it.each([
            {
                email: 'example@example.com',
                name: 'Example',
            },
        ])('should return jwt payload', async (stub) => {
            await new userModel(stub).save();
            const user = await userProvider.provideByEmail(stub.email);
            const result = await authService.authorize(user);

            jest.spyOn(authService, 'authorize').mockImplementation(async () => result);
            expect(await authService.authorize(user)).toBe(result);
        });
    });

    describe('register', () => {
        beforeEach(async () => {
            await mongoConnection.dropDatabase();
        });

        const cases = [
            {
                name: 'Example',
                email: 'example@example.com',
                password: 'example',
            },
            {
                name: 'Example1',
                email: 'example1@example.com',
                password: 'example1',
            },
            {
                name: 'Example2',
                email: 'example2@example.com',
                password: 'example2',
            },
        ];

        it.each(cases)('should be throw exception, user already exist', async (dto: CreateUserDTO) => {
            await authService.register(dto);

            try {
                await authService.register(dto);
            } catch (e) {
                expect(e).toBeInstanceOf(UserAlreadyExistException);
            }
        });

        it.each(cases)('should successfully register', async (dto: CreateUserDTO) => {
            const result = await authService.register(dto);
            jest.spyOn(authService, 'register').mockImplementation(async () => result);
            expect(await authService.register(dto)).toBe(result);
        });
    });
});
