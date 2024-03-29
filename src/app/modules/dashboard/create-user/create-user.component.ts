import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  errorMessage = ''
  apiUrl = '/admin/users'
  token = localStorage?.getItem('token')
  hide1 = true;
  hide2 = true;
  editMode = false; // Flag to indicate if in edit mode or not
  userId: number | undefined;
  showSpinner = false;

  constructor(private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {element: any, editMode: boolean},
    private fb : FormBuilder, private auth: AuthService, private common: CommonService){console.log(data,'from constructor');
    
  }
    
    addUserForm = this.fb.group({
      firstName : [this.data?.element?.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      lastName : [this.data?.element?.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      email : [this.data?.element?.email, [Validators.required, Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)]],
      role: [this.data?.element?.role,[Validators.required]],
      password: ['',[Validators.required]],
      cpassword: ['', [Validators.required]]
    },
      {
        validators: this.passwordMatchValidator 
      })
  
      passwordMatchValidator(form: FormGroup) {
        const password1 = form.get('password')
        const password2 = form.get('cpassword')
        if (password1 && password2 && password1.value !== password2.value && password2.value !== '') {
          password2?.setErrors({ passwordMismatch: true })
        } else {
          // password2?.setErrors(null)
        }
    
      }


  onSubmit() {
    if(this.addUserForm.valid && this.token !== null){
      this.showSpinner = true;
      const UserData = { 
        firstName : this.addUserForm.controls['firstName'].value,
        lastName : this.addUserForm.controls['lastName'].value,
        email : this.addUserForm.controls['email'].value,
        role : this.addUserForm.controls['role'].value,
        password : this.addUserForm.controls['password'].value,
        // confirmPw : this.addUserForm.controls.cpassword.value
      }
      if (this.data?.editMode && this.data.element.id !== undefined) {

        this.addUserForm.get('password')?.setValidators(null);
        this.addUserForm.get('cpassword')?.setValidators(null);
        this.addUserForm.get('password')?.updateValueAndValidity();
        this.addUserForm.get('cpassword')?.updateValueAndValidity();
        // If in edit mode, send a PATCH request to update the user
        this.auth.patchUserData(this.data.element.id , UserData, this.token).subscribe(
          (res: any) => {
            console.log(res,'from patch');
            this.common.behaviorSubject.next(true);
            this.dialogRef.close(UserData);
            this.showSpinner = false;

          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        // If not in edit mode, send a POST request to create a new user
        this.auth.postData(UserData, this.apiUrl, this.token).subscribe(
          (res: any) => {
            console.log(res);
            this.common.behaviorSubject.next(true);
            this.dialogRef.close(UserData); // Close the dialog upon successful creation
            this.showSpinner = false;
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      }
    }

    //     this.auth.postData(UserData, this.apiUrl, this.token).subscribe((res: any)=>{
    //     console.log(res);
    //   },
    //   (error) => {
    //     if (error.status === 400) {
    //       this.errorMessage = 'Missing token';
    //     } else if (error.status === 401) {
    //       this.errorMessage = 'Invalid token';
    //     } else if (error.status === 403) {
    //       this.errorMessage = 'Admin authorization failed';
    //     }  else if (error.status === 404) {
    //       this.errorMessage = 'Path is incorrect';
    //     }  else if (error.status === 405) {
    //       this.errorMessage = 'Method is not allowed';
    //     }  else if (error.status === 409) {
    //       this.errorMessage = 'Email has already been registered';
    //     }  else if (error.status === 422) {
    //       this.errorMessage = 'Validation failed';
    //     } else {
    //       this.errorMessage = 'An error occurred';
    //     }
    //   })
    // this.dialogRef.close(UserData); //for closing the modal
    }
  }



