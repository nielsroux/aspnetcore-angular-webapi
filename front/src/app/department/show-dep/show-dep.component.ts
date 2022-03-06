import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.scss'],
})
export class ShowDepComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  DepartmentList: any = [];
  ModalTitle: string = '';
  ActivateAddEditDepComp: Boolean = false;
  department: any;
  closeResult: string = '';

  DepartmentIdFilter: string = '';
  DepartmentNameFilter: string = '';
  DepartmentListWithoutFilter: any = [];

  ngOnInit(): void {
    this.refreshDepartmentList();
  }

  addClick(content: any) {
    this.department = {
      DepartmentId: 0,
      DepartmentName: '',
    };
    this.ModalTitle = 'Ajouter un département';
    this.ActivateAddEditDepComp = true;

    this.openModal(content);
  }

  editClick(content: any, item: any) {
    this.department = item;
    this.ModalTitle = 'Editer un département';
    this.ActivateAddEditDepComp = true;

    this.openModal(content);
  }

  confirmClick(content: any, item: any) {
    this.department = item;
    this.ModalTitle = 'Suppression';
    this.openModalConfirm(content);
  }

  deleteClick(department: any) {
    this.service.deleteDepartment(department.DepartmentId).subscribe((data) => {
      this.notifier.notify(
        'success',
        'Suppresion réussie du département : ' + department.DepartmentName
      );
      this.refreshDepartmentList();
    });
  }

  closeClick() {
    this.ActivateAddEditDepComp = false;
    this.refreshDepartmentList();
  }

  refreshDepartmentList() {
    this.service.getDepartmentList().subscribe((data) => {
      this.DepartmentList = data;
      this.DepartmentListWithoutFilter = data;
    });
  }

  FilterFn() {
    let DepartmentIdFilter = this.DepartmentIdFilter;
    let DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmentListWithoutFilter.filter(function (
      el: any
    ) {
      return (
        el.DepartmentId.toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.DepartmentName.toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });
  }

  sortResult(prop: any, asc: boolean) {
    this.DepartmentList = this.DepartmentListWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }

  closeModal(event: any) {
    this.notifier.notify('success', event);
    this.refreshDepartmentList();
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
