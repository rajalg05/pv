import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Audit } from '../model/audit';
import { AuditAllocation } from '../model/auditAllocation';

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

  findAllAllocatedAudits(): Observable<AuditAllocation[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get<AuditAllocation[]>(this.BASE_URL + '/findAllAllocatedAudits', {headers: headers})
    
      .pipe(
        //catchError(this.handleError('findAllJobs'))
      );
  }

  allocateAudits(auditAllocation: AuditAllocation[]): Observable<AuditAllocation[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.post<AuditAllocation[]>(this.BASE_URL + '/allocateAudits', auditAllocation, {headers: headers})
    
      .pipe(
        //catchError(this.handleError('findAllJobs'))
      );
  }
}
