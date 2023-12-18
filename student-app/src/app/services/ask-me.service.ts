import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AskMeService {

  endPoint: string = 'http://127.0.0.1:5000/generate_answers';

  constructor(private httpClient: HttpClient) { }

  public getAnswer(query: string,context: string): Observable<any> {
    let payload = {
      context: context,
      question: query
    }
    return this.httpClient.post(this.endPoint, payload);
  }
}
