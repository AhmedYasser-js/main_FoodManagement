import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAcountComponent } from './verify-acount.component';

describe('VerifyAcountComponent', () => {
  let component: VerifyAcountComponent;
  let fixture: ComponentFixture<VerifyAcountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyAcountComponent]
    });
    fixture = TestBed.createComponent(VerifyAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
