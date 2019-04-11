import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Difficulty } from '../models/difficulty';
import { DIFFICULTIES } from '../mock-difficulties';

@Injectable({
  providedIn: 'root'
})
export class DifficultyService {

  constructor() { }

  getDifficulties(): Observable<Difficulty[]> {
    return of(DIFFICULTIES); // of ở đây để mô phỏng lệnh http.get, trả về 1 Observable
  }
}
