import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicOtpComponent } from './dynamic-otp.component';

describe('DynamicOtpComponent', () => {
  let component: DynamicOtpComponent;
  let fixture: ComponentFixture<DynamicOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicOtpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
