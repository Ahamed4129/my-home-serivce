import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstaticComponent } from './editstatic.component';

describe('EditstaticComponent', () => {
  let component: EditstaticComponent;
  let fixture: ComponentFixture<EditstaticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditstaticComponent]
    });
    fixture = TestBed.createComponent(EditstaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
