import { Component, OnInit } from '@angular/core';
import { LookinnApiService } from '../service/lookinn-api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  cities$: any[] = [];
  email: string = '';
  password: string = '';
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  contactForm = new FormGroup({
    email: new FormControl(''),
    fullname: new FormControl(''),
    comment: new FormControl('')
  });
  show = false;

  constructor(private lookinnApi: LookinnApiService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
  });

  this.contactForm = new FormGroup({
    email: new FormControl(''),
    fullname: new FormControl(''),
    comment: new FormControl(''),
});
  }

  public routeToLocations() {
    this.router.navigateByUrl('/locations');
  }

}
