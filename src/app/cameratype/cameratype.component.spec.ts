import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameratypeComponent } from './cameratype.component';

describe('CameratypeComponent', () => {
  let component: CameratypeComponent;
  let fixture: ComponentFixture<CameratypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameratypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameratypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
