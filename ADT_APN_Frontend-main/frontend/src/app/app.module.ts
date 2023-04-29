import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LookinnApiService } from './service/lookinn-api.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { PropertyListingsComponent } from './property-listings/property-listings.component';
import { ListingLocationsComponent } from './listing-locations/listing-locations.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    PropertyListingsComponent,
    ListingLocationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [LookinnApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
