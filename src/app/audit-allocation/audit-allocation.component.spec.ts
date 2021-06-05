import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditAllocationComponent } from './audit-allocation.component';

describe('AuditAllocationComponent', () => {
  let component: AuditAllocationComponent;
  let fixture: ComponentFixture<AuditAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
