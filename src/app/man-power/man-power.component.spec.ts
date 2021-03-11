import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManPowerComponent } from './man-power.component';

describe('ManPowerComponent', () => {
  let component: ManPowerComponent;
  let fixture: ComponentFixture<ManPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManPowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
