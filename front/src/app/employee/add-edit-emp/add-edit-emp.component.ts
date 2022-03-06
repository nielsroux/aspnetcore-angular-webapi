import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.scss'],
})
export class AddEditEmpComponent implements OnInit {
  @Output() closeModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private service: SharedService) {}

  @Input()
  employee: any;

  EmployeeId: number = 0;
  EmployeeName: string = '';
  DepartmentId: number = 0;
  DateOfJoining: string = '';
  PhotoFileName: string = '';
  PhotoFilePath: string = '';

  DepartmentsList: any = [];

  ngOnInit(): void {
    this.EmployeeId = this.employee.EmployeeId;
    this.EmployeeName = this.employee.EmployeeName;
    this.DepartmentId = this.employee.DepartmentId;
    this.DateOfJoining = this.employee.DateOfJoining;
    this.PhotoFileName = this.employee.PhotoFileName;
    this.PhotoFilePath = this.service.ImageUrl + this.employee.PhotoFileName;

    this.getDepartmentsList();
  }

  getDepartmentsList() {
    this.service.getDepartmentList().subscribe((data) => {
      this.DepartmentsList = data;
    });
  }

  addEmployee() {
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      DepartmentId: this.DepartmentId,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.service.addEmployee(val).subscribe((res) => {
      this.closeModalEmitter.emit(
        "Ajout réussie de l'employé : " + this.EmployeeName
      );
    });
  }

  updateEmployee() {
    let val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      DepartmentId: this.DepartmentId,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    console.log(val);

    this.service.updateEmployee(val).subscribe((res) => {
      this.closeModalEmitter.emit(
        "Mise à jour réussie de l'employé : " + this.EmployeeName
      );
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    this.service.UploadPhoto(formData).subscribe((data) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.ImageUrl + this.employee.PhotoFileName;
    });
  }
}
