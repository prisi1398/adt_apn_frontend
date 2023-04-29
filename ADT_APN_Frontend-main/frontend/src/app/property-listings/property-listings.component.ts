import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LookinnApiService } from '../service/lookinn-api.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

export interface ListingResponse {
  listings: {id: number, name: string}[];
}

@Component({
  selector: 'app-property-listings',
  templateUrl: './property-listings.component.html',
  styleUrls: ['./property-listings.component.css']
})
export class PropertyListingsComponent {

  @Output() onClick = new EventEmitter<number>();
  
  location: string;
  listing_id: string = '0';
  displayDetails: boolean = false;
  listings: {id: number, name: string}[] = [];
  currentPage = 1;
  itemsPerPage = 10;  
  listingDetails: any;
    
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  addListing = new FormGroup({
    listing_name: new FormControl(''),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    city: new FormControl(''),
    neighbourhood: new FormControl(''),
    listing_id: new FormControl(''),
    score_rating: new FormControl(''),
    score_value: new FormControl(''),
    property_type: new FormControl(''),
    room_type: new FormControl(''),
    accomodate_count: new FormControl(''),
    bedrooms: new FormControl(''),
    price: new FormControl(''),
    instant_bookable: new FormControl(''),
    amenities: new FormControl(''),
  });
  
  admin = false
  adminError:string = "false"
 
  get totalPages() {
    return Math.ceil(this.listings.length / this.itemsPerPage);
  }

  // constructor(private lookinnApi: LookinnApiService) {}
  constructor(private route: ActivatedRoute, private lookinnApi: LookinnApiService, private modalService: NgbModal) {
    this.location = this.route.snapshot.params['location'];
  }

  ngOnInit() {
    // Get the value of the 'location' parameter from the URL
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    this.location = this.route.snapshot.paramMap.get('city') ?? '';

    // Fetch the property listings for the location from the URL
    this.fetchListings();
  }

  public fetchListings() {
    this.lookinnApi.getlistings(this['location']).subscribe({
      next: (value: ListingResponse) => {
        this.listings = value.listings;
        console.log(this.listings);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  public onLocationChange(location: string) {
    this.location = location;
    this.fetchListings();
  }
  
  public getListingsDetails(listingId: number) {
        let listing_id = String(listingId);
        this.lookinnApi.listingdetails(listing_id).subscribe((data: any) => {
          console.log(data);
          this.listing_id = listing_id;
          this.listingDetails = data;
          this.displayDetails = true;
        });
    }

    public updateListingDetails() {

      let json_data = {
        "name": this.listingDetails.name,
        "longitude": this.listingDetails.longitude,
        "latitude": this.listingDetails.latitude,
        "city": this.listingDetails.city,
        "neighbourhood": this.listingDetails.neighbourhood,
        "score_rating": this.listingDetails.rating,
        "property_type": this.listingDetails.property_type,
        "room_type": this.listingDetails.room_type,
        "accomodate_count": this.listingDetails.accomodate_count,
        "bedrooms": this.listingDetails.bedrooms,
        "price": this.listingDetails.price,
        "instant_bookable": this.listingDetails.instant_bookable,
        "amenities": this.listingDetails.amenities,
      }

      this.lookinnApi.updateListings(String(this.listing_id), json_data).subscribe((data: any) => {
        console.log("Response from PUT:", data);
      });

    }

    public addNewListing() {

      let json_data = {
        "listing_id": this.addListing.get('listing_id')?.value,
        "listingname": this.addListing.get('listing_name')?.value,
        "longitude": this.addListing.get('longitude')?.value,
        "latitude": this.addListing.get('latitude')?.value,
        "city": this.addListing.get('city')?.value,
        "neighbourhood": this.addListing.get('neighbourhood')?.value,
        "score_rating": this.addListing.get('score_rating')?.value,
        "score_value": this.addListing.get('score_value')?.value,
        "property_type": this.addListing.get('property_type')?.value,
        "room_type": this.addListing.get('room_type')?.value,
        "accomodate_count": this.addListing.get('accomodate_count')?.value,
        "bedrooms": this.addListing.get('bedrooms')?.value,
        "price": this.addListing.get('price')?.value,
        "instant_bookable": this.addListing.get('instant_bookable')?.value,
        "amenities": this.addListing.get('amenities')?.value,
      }

      this.lookinnApi.addListings(json_data).subscribe((data: any) => {
        console.log("Response from POST:", data);
      });

    }

  public authorizeAdmin() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    if( email=="admin@test.com" && password=="admin123") {
        this.admin = true;
        this.adminError = "false";
        console.log(this.admin)
    }
    else {
      console.log(this.adminError)
      this.adminError = "true";
    }
  }
  }





