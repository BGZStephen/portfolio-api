import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class WorkExamplesApiService {

  baseUrl: string = environment.apiUrl;
  authorization: String = environment.authorization;

  constructor(
    private http: Http,
    private router: Router
  ) { }

  clearComponent() {
    this.router.navigate(['/dashboard', {outlets: {'adminDashboardOutlet': null}}]);
  }

  deleteWorkExample(workExampleObject) {
    const headers = new Headers();
    headers.append('Authorization', `${this.authorization}`);
    return this.http.post(this.baseUrl + '/work-examples/deleteOne', workExampleObject, {headers: headers})
    .map(res => res.json());
  }

  loadTechnologies() {
    const headers = new Headers();
    headers.append('Authorization', `${this.authorization}`);
    return this.http.get(this.baseUrl + '/technologies', {headers: headers})
    .map(res => res.json());
  }

  loadWorkExample(workExampleObject) {
    const headers = new Headers();
    headers.append('Authorization', `${this.authorization}`);
    return this.http.get(this.baseUrl + '/work-examples/' + workExampleObject._id, {headers: headers})
    .map(res => res.json());
  }

  loadWorkExamples() {
    const headers = new Headers();
    headers.append('Authorization', `${this.authorization}`);
    return this.http.get(this.baseUrl + '/work-examples', {headers: headers})
    .map(res => res.json());
  }

  saveWorkExample(workExampleObject) {
    const headers = new Headers();
    headers.append('Authorization', `${this.authorization}`);
    return this.http.post(this.baseUrl + '/work-examples/create', workExampleObject, {headers: headers})
    .map(res => res.json());
  }

  setComponent(component) {
    this.router.navigate(['/dashboard', {outlets: {'adminDashboardOutlet': [component]}}]);
  }

  setComponentWithId(component, id) {
    this.router.navigate(['/dashboard', {outlets: {'adminDashboardOutlet': [component, id]}}]);
  }

  updateWorkExample(workExampleObject) {
    const headers = new Headers();
    headers.append('Authorization', `${this.authorization}`);
    return this.http.post(this.baseUrl + '/work-examples/update', workExampleObject, {headers: headers})
    .map(res => res.json());
  }
}
