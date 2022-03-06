import { Component, OnInit } from '@angular/core';
import { SharedService } from './../../shared.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.scss'],
})
export class ShowEmpComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  EmployeeList: any = [];
  ModalTitle: string = '';
  ActivateAddEditEmpComp: boolean = false;
  employee: any = false;
  closeResult: string = '';
  DepartmentList: any = [];

  ngOnInit(): void {
    this.service.getDepartmentList().subscribe((data) => {
      this.DepartmentList = data;
      this.refreshEmployeeList();
    });
  }

  addClick(content: any) {
    this.employee = {
      EmployeeId: 0,
      EmployeeName: '',
      Department: '',
      DateOfJoining: '',
      PhotoFileName: 'anonymous.jpg',
      DepartmentId: 0,
    };
    this.ModalTitle = 'Ajouter un employé';
    this.ActivateAddEditEmpComp = true;

    this.openModal(content);
  }

  editClick(content: any, item: any) {
    this.employee = item;
    this.ModalTitle = 'Editer un employé';
    this.ActivateAddEditEmpComp = true;

    this.openModal(content);
  }

  confirmClick(content: any, item: any) {
    this.employee = item;
    this.ModalTitle = 'Suppression';
    this.openModalConfirm(content);
  }

  deleteClick(employee: any) {
    this.service.deleteEmployee(employee.EmployeeId).subscribe((data) => {
      this.notifier.notify(
        'success',
        'Suppresion réussie du département : ' + employee.EmployeeName
      );
      this.refreshEmployeeList();
    });
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmployeeList();
  }

  refreshEmployeeList() {
    this.service.getEmployeeList().subscribe((data) => {
      for (var emp of data) {
        emp.PhotoFilePath = this.service.ImageUrl + emp.PhotoFileName;
        emp.Department =
          typeof this.DepartmentList[emp.DepartmentId] !== 'undefined'
            ? this.DepartmentList[emp.DepartmentId - 1].DepartmentName
            : '';
      }
      this.EmployeeList = data;
    });
  }

  closeModal(event: any) {
    this.notifier.notify('success', event);
    this.refreshEmployeeList();
    this.modalService.dismissAll();
  }

  openModal(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openModalConfirm(content: any) {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'sm',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
