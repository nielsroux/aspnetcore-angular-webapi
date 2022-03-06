import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5000/api';
  readonly ImageUrl = 'http://localhost:5000/images/';
  constructor(private http: HttpClient) {}

  /** Department */
  getDepartmentList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/department');
  }

  addDepartment(val: any) {
    return this.http.post(this.APIUrl + '/department', val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + '/department', val);
  }

  deleteDepartment(id: number) {
    return this.http.delete(this.APIUrl + '/department/' + id);
  }

  /** EMPLOYEE */
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/employee');
  }

  addEmployee(val: any) {
    return this.http.post(this.APIUrl + '/employee', val);
  }

  updateEmployee(val: any) {
    return this.http.put(this.APIUrl + '/employee', val);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.APIUrl + '/employee/' + id);
  }

  /** Images */
  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/employee/SaveFile', val);
  }

  /** Commons */
  /*GetAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/employee/GetAllDepartmentNames');
  }*/
}
