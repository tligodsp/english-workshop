import { Injectable } from '@angular/core';
import { Session } from './models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  curSession: Session;
  constructor() { }
}
