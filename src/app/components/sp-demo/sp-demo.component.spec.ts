import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpDemoComponent } from './sp-demo.component';

describe('SpDemoComponent', () => {
  let component: SpDemoComponent;
  let fixture: ComponentFixture<SpDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
