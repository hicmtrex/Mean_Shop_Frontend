import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressComponent } from './shipping-address.component';

describe('ShippingAddressComponent', () => {
  let component: ShippingAddressComponent;
  let fixture: ComponentFixture<ShippingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
