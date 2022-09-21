import { Injectable } from '@nestjs/common';
import { GoogleServiceInterface } from './google.service.interface';

@Injectable()
export class GoogleService implements GoogleServiceInterface {}
