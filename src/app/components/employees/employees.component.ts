import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  keyword = '';
  employees = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  keyPress() {
    if (this.keyword.length < 2) {
      this.employees = [];
      return;
    }
    this.http
      .get(
        '/es/_layouts/15/es_HttpHandlers/EmployeesJSONData.ashx?term=' +
          this.keyword
      )
      .subscribe((response: any[]) => {
        this.employees = response ?? [];
      });
  }
  showEmployeeCard(id, title) {
    window.parent['SP'].UI.ModalDialog.showModalDialog({
      url: `/es/_layouts/15/listform.aspx?PageType=4&ListId={40725431-4c1f-4b4f-bba2-64b5fa19d8a0}&ID=${id}`,
      title: title,
      showClose: true,
      showMaximized: true,
      allowMaximize: true,
    });
  }
}
