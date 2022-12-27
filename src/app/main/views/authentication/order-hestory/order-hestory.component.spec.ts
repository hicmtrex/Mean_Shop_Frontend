import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHestoryComponent } from './order-hestory.component';

describe('OrderHestoryComponent', () => {
  let component: OrderHestoryComponent;
  let fixture: ComponentFixture<OrderHestoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHestoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHestoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
