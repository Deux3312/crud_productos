import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProducComponent } from './add-edit-produc.component';

describe('AddEditProducComponent', () => {
  let component: AddEditProducComponent;
  let fixture: ComponentFixture<AddEditProducComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProducComponent]
    });
    fixture = TestBed.createComponent(AddEditProducComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
