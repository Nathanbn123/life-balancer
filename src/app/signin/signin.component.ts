import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserInfoService } from '../user-info.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm = new FormGroup ({
    email: new FormControl(''),
  });

  resultsFromDatabase;


  constructor(private userInfoService: UserInfoService, private routes: Router) { }

  getResults = () =>
  this.userInfoService.getUserByName().subscribe(res => (this.resultsFromDatabase = res));

  ngOnInit() {
    this.getResults();
}


  onSubmit() {
    let routes = this.routes;
    //event emitter or update database here
    let emailInput = this.signInForm.value;
    console.log(emailInput);
    // console.log(this.resultsFromDatabase);
    for (let i=0; i<=this.resultsFromDatabase.length-1; i++)
     {
      console.log(this.resultsFromDatabase[i].payload.doc.data().email);
      if (emailInput.email === this.resultsFromDatabase[i].payload.doc.data().email) {
        routes.navigate(['results']);
        console.log('if you got this far, you should get results');
      }
      else {
        routes.navigate(['register']);
        console.log('if you see this, you should go to registration');
      }

    }
  }
}
