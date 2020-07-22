import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
  Id: number;
  Email: string;
  LoginName: string;
  Title: string;
}
interface EmployeeData {
  Id: number;
  City: string;
  CellPhone: string;
  Title: string;
}
interface ListData {
  Title: string;
  ItemCount: number;
  ImageUrl: string;
}
interface EmploymentData {
  StartDate: string;
  EndDate: string;
  JobRole: { Title: string };
}

@Component({
  selector: 'app-sp-demo',
  templateUrl: './sp-demo.component.html',
  styleUrls: ['./sp-demo.component.css'],
})
export class SpDemoComponent implements OnInit {
  @Input() name: string;
  @Output() listsReceived = new EventEmitter();
  currentUser: UserData;
  lists: ListData[];
  employee: EmployeeData;
  employmentData: EmploymentData[];

  constructor(private http: HttpClient) {
    this.lists = [];
    this.employmentData = [];
    this.employee = {} as EmployeeData;
  }

  ngOnInit(): void {
    const pageContext = window['_spPageContextInfo'];
    const requestUri =
      pageContext.webAbsoluteUrl +
      '/_api/web/getuserbyid(' +
      pageContext.userId +
      ')';
    this.http
      .get(requestUri, {
        headers: {
          Accept: 'application/json;odata=verbose',
          'odata-version': '',
        },
      })
      .subscribe((result: any) => {
        console.log(result.d);
        this.currentUser = result.d as UserData;
        this.http
          .get(
            pageContext.webAbsoluteUrl +
              "/_api/web/lists/getbytitle('Employees')/Items?&$filter=Account%20eq%20" +
              this.currentUser.Id,
            {
              headers: {
                Accept: 'application/json;odata=verbose',
                'odata-version': '',
              },
            }
          )
          .subscribe((employeeResunt: any) => {
            //console.log(employeeResunt.d.results[0]);
            this.employee = employeeResunt.d.results[0] as EmployeeData;
            this.http
              .get(
                pageContext.webAbsoluteUrl +
                  "/_api/web/lists/getbytitle('Employment%20History')/Items?$select=Id,Employee/Id,Title,JobRole/Title,StartDate,EndDate&$expand=JobRole/Title,Employee/Id&$filter=Employee/Id%20eq%20" +
                  this.employee.Id,
                {
                  headers: {
                    Accept: 'application/json;odata=verbose',
                    'odata-version': '',
                  },
                }
              )
              .subscribe((employmentResult: any) => {
                this.employmentData = employmentResult.d
                  .results as EmploymentData[];
                console.log(employmentResult);
              });
          });
      });
  }

  getLists() {
    const pageContext = window['_spPageContextInfo'];
    const requestUri = pageContext.webAbsoluteUrl + '/_api/web/lists';
    const waitScreen = window['SP'].UI.ModalDialog.showWaitScreenWithNoClose(
      'Loading',
      'Please wait'
    );
    this.http
      .get(requestUri, {
        headers: {
          Accept: 'application/json;odata=verbose',
          'odata-version': '',
        },
      })
      .subscribe((result: any) => {
        //console.log(result);
        this.lists = result.d.results as ListData[];
        this.lists.forEach(
          (x) => (x.ImageUrl = pageContext.webAbsoluteUrl + x.ImageUrl)
        );
        waitScreen.close();
        this.listsReceived.emit({ count: this.lists.length });
      });
  }
  clearLists() {
    this.lists = [];
    this.listsReceived.emit({ count: this.lists.length });
  }
}
