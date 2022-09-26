import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class UserAlreadyExistException extends RuntimeException {}
