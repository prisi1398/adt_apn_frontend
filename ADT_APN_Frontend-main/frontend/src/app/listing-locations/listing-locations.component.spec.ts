import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingLocationsComponent } from './listing-locations.component';

describe('ListingLocationsComponent', () => {
  let component: ListingLocationsComponent;
  let fixture: ComponentFixture<ListingLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
