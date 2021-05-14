import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Audit } from '../model/audit';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor(private http: HttpClient) { }
  BASE_URL: string = 'http://localhost:8080/audit';

  
  saveAudit(audit: Audit): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<string>(this.BASE_URL + '/saveAudit', audit, {headers: headers});
  }

  findAllAudits(): Observable<Audit[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<Audit[]>(this.BASE_URL + '/findAllAudits', {headers: headers})
    
      .pipe(
        //catchError(this.handleError('findAllJobs'))
      );
  }
}
