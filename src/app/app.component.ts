import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenNames = ['Anas', 'Sid'];

  ngOnInit(): void{
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenControl.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asyncvalidator)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'SidAnass'
      }
    });

    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
  }

  onAddHobbies(): void{
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }

  get controls(){
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onSubmit(): void{
    console.log(this.signupForm);
  }

  forbiddenControl(controls: FormControl): {[s: string]: boolean} {
    if (this.forbiddenNames.indexOf(controls.value) !== -1) {
      return {'forbiddenName': true};
    }
    return null;
  }

  asyncvalidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
        if(control.value === 'test@gmail.com'){
          resolve({'emailisForbidden': true});
        }else{
          resolve(null);
        }
      }, 1500);
      }
    );
    return promise;
  }

}
