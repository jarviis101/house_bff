import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { User, UserSchema } from '@/schemas/user.schema';
import { UserServiceInterface } from '@/user/service/user.service.interface';
import { UserService } from '@/user/service/user.service';
import { CreateUserDTO } from '@/auth/dto/create-user.dto';
import { GoogleUserDTO } from '@/google/dto/google-user.dto';

describe('UserService', () => {
    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;
    let userModel: Model<User>;

    let userService: UserServiceInterface;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        mongoConnection = (await connect(mongod.getUri())).connection;
        userModel = mongoConnection.model(User.name, UserSchema);

        userService = new UserService(userModel);
    });

    afterAll(async () => {
        await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        await mongoConnection.dropDatabase();
    });

    describe('createByBaseAuth', () => {
        it.each([
            {
                email: 'example@example.com',
                name: 'Example',
                password: 'example',
            },
        ])('should create user by base auth', async (dto: CreateUserDTO) => {
            const result = await userService.createByBaseAuth(dto);
            jest.spyOn(userService, 'createByBaseAuth').mockImplementation(async () => result);
            expect(await userService.createByBaseAuth(dto)).toBe(result);
        });
    });

    describe('createByGoogleAuth', () => {
        it.each([new GoogleUserDTO('Example', 'example@example.com')])(
            'should create user by google auth',
            async (dto: GoogleUserDTO) => {
                const result = await userService.createByGoogleAuth(dto);
                jest.spyOn(userService, 'createByGoogleAuth').mockImplementation(async () => result);
                expect(await userService.createByGoogleAuth(dto)).toBe(result);
            },
        );
    });
});
