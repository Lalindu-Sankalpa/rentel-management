import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenseComponent } from './lense.component';

describe('LenseComponent', () => {
  let component: LenseComponent;
  let fixture: ComponentFixture<LenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
