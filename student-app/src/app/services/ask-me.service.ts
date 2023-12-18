import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AskMeService {

  endPoint: string = 'update the end-point';

  constructor(private httpClient: HttpClient) { }

  public getAnswer(query: string): Observable<any> {
    return this.httpClient.post(this.endPoint, query);
  }
}
