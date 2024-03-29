
import {map} from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { Zone } from '../shared/classes/zone';
import { Observable,  of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ZoneService {

  private zonesUrl = `${this.apiEndpoint}/zones`;

  constructor(
    private http: HttpClient,
    @Inject('API_ENDPOINT') private apiEndpoint: string
  ) { }

  /** GET zones from the server */
  getZones(projectId: number = null): Observable<Zone[]> {
    const options: any = {};
    if (projectId) {
      options.project_id = projectId;
    }

    return  this.http.get<Zone[]>(this.zonesUrl,  {params: options}).pipe(
      map(response => {
        response = response || [];
        return response.map(x => new Zone(x.id, x.name, x.site_name, x.pointszone, 
          x.type, x.site_id, x.mapdata) );
      }));    
  }
  /** GET zones by site_id from the server */
  getZonesBySiteId(site_id): Observable<Zone[]> {
    const url = `${this.zonesUrl}?site_id=${site_id}`;
    return this.http.get<Zone[]>(url, httpOptions).pipe(
      map(response => response.map(x => new Zone(x.id, x.name, x.site_name, x.pointszone, x.type, x.site_id, x.mapdata))));
  }
  /** PUT: update the zone on the server */
  updateZone (zone: Zone): Observable<any> {
    return this.http.put(this.zonesUrl, zone, httpOptions);
  }

  /** POST: add a new zone to the server */
  addZone (zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.zonesUrl, zone, httpOptions);
  }

  /** DELETE: delete the zone from the server */
  deleteZone (zone: Zone | string): Observable<Zone> {
    const id = typeof zone === 'string' ? zone : zone.id;
    const url = `${this.zonesUrl}?id=${id}`;

    return this.http.delete<Zone>(url, httpOptions);
  }

}
