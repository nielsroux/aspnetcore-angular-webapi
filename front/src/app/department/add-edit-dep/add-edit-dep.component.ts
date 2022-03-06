import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from './../../shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.scss'],
})
export class AddEditDepComponent implements OnInit {
  @Output() closeModalEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private service: SharedService) {}

  DepartmentId: number = 0;
  DepartmentName: string = '';

  @Input()
  department: any;

  ngOnInit(): void {
    this.DepartmentId = this.department.DepartmentId;
    this.DepartmentName = this.department.DepartmentName;
  }

  addDepartment() {
    let val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,
    };

    this.service.addDepartment(val).subscribe((res) => {
      this.closeModalEmitter.emit(
        'Ajout réussie du départment : ' + this.DepartmentName
      );
    });
  }

  updateDepartment() {
    let val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName,
    };

    this.service.updateDepartment(val).subscribe((res) => {
      this.closeModalEmitter.emit(
        'Mise à jour réussie du départment : ' + this.DepartmentName
      );
    });
  }
}
