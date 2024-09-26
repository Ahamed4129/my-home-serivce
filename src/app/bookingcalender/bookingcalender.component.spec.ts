import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingcalenderComponent } from './bookingcalender.component';

describe('BookingcalenderComponent', () => {
  let component: BookingcalenderComponent;
  let fixture: ComponentFixture<BookingcalenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingcalenderComponent]
    });
    fixture = TestBed.createComponent(BookingcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
