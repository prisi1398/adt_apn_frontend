import { Component } from '@angular/core';
import { LookinnApiService } from '../service/lookinn-api.service';
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-listing-locations',
  templateUrl: './listing-locations.component.html',
  styleUrls: ['./listing-locations.component.css']
})
export class ListingLocationsComponent {

  slides: any[] = [];

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};
  
  slickInit(e: any) {
    console.log(e)
    console.log('slick initialized');
  }
    
  breakpoint(e: any) {
    console.log('breakpoint');
  }
    
  afterChange(e: any) {
    console.log('afterChange');
  }
    
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor(private lookinnApi: LookinnApiService, private router: Router) {}

  ngOnInit() {
    this.lookinnApi.getCities().subscribe((data: any) => {
      console.log(data);
      let cities: {city: string }[] = data;
      cities.forEach((x) => {
        this.slides.push({
          cityName: x
        });
      });
    });  
  }

  public routeToListings(cityName: string) {
    console.log(cityName);
    this.router.navigate(['listings', cityName]);
  }

}
