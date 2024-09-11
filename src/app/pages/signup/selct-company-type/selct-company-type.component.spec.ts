import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelctCompanyTypeComponent } from './selct-company-type.component';

describe('SelctCompanyTypeComponent', () => {
  let component: SelctCompanyTypeComponent;
  let fixture: ComponentFixture<SelctCompanyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelctCompanyTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelctCompanyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
