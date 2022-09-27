import { Types } from 'mongoose';

export type JwtPayloadType = {
    id: Types.ObjectId;
    email: string;
};
