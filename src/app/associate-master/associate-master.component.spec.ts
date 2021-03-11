import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateMasterComponent } from './associate-master.component';

describe('AssociateMasterComponent', () => {
  let component: AssociateMasterComponent;
  let fixture: ComponentFixture<AssociateMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
