import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Strings} from '../shared/strings.type';

@Injectable()
export class StringerService {

  private stringsURL = 'https://api.racketlogger.com/strings';
  constructor(private http: HttpClient) { }

  /** GET Strings from the API */
  getStrings (): Observable<Strings[]> {
    return this.http.get<Strings[]>(this.stringsURL);
  }
}
