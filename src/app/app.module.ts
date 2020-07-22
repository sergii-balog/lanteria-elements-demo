import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injector } from '@angular/core';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { createCustomElement } from '@angular/elements';
import { EmployeesComponent } from './components/employees/employees.component';
import { SpDemoComponent } from './components/sp-demo/sp-demo.component';

@NgModule({
  declarations: [FirstComponentComponent, EmployeesComponent, SpDemoComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [],
  entryComponents: [
    FirstComponentComponent,
    EmployeesComponent,
    SpDemoComponent,
  ],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const firstElment = createCustomElement(FirstComponentComponent, {
      injector: this.injector,
    });
    customElements.define('lanteria-first', firstElment);

    const employeesElment = createCustomElement(EmployeesComponent, {
      injector: this.injector,
    });
    customElements.define('lanteria-employees', employeesElment);

    const spDemoElment = createCustomElement(SpDemoComponent, {
      injector: this.injector,
    });
    customElements.define('lanteria-sp-demo', spDemoElment);
  }
}
