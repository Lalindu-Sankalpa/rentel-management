import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccManagerComponent } from './acc-manager.component';

describe('AccManagerComponent', () => {
  let component: AccManagerComponent;
  let fixture: ComponentFixture<AccManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
