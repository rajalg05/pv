import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) {}

    getEvents() {
        return this.http.get('assets/calendarevents.json')
                    .toPromise()
                    .then(res => <any[]> res)
                    .then(data => { return data; });
    }
}
