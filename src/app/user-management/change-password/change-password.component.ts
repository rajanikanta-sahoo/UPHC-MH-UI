import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserManagementService } from '../services/user-management.service';
import { Constants } from 'src/app/models/constants';
import { UserService } from 'src/app/authentication/api/user.service';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  formFields: any;
  sdrcForm: FormGroup;
  
  validationMsg: any;
  btnDisable: boolean = false;
  UserForm:FormGroup; 

  userName: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
 
  userManagementService: UserManagementService;

  constructor(private http: HttpClient, private userManagementProvider: UserManagementService, private router: Router, private appService: UserService) { 
    this.userManagementService = userManagementProvider; 
  }

  ngOnInit() {
    this.password='';
    let userDetails = JSON.parse(localStorage.getItem('access_token'))
    
    if(userDetails.username != null){
      this.userName = userDetails.username
    }
  
  }
 /**
  * Change password for individual user
  * @param form 
  */
  changePasswordForm(form: NgForm){ 
    let passDetails= {
      'userName' : this.userName,
      'oldPassword': this.password,
      'newPassword': this.newPassword,
      'confirmPassword':this.confirmPassword
    };
    if(this.confirmPassword=='' || this.confirmPassword==undefined){
      $('#infoMatch').modal('show');
     }else if(this.password=='' || this.password==undefined){
      $('#infoMatch').modal('show');
     } else if(this.newPassword=='' || this.newPassword==undefined){
      $('#infoMatch').modal('show');
     }else if(this.password == this.newPassword){
      this.validationMsg = "The New password should not be same as Current password.";
      $("#passNotMatch").modal('show');
     }else if(this.newPassword!=this.confirmPassword){
      this.validationMsg = "The New password and Confirm password do not match.";
      $("#passNotMatch").modal('show');
     }else{
      this.http.post(Constants.HOME_URL+'changePassword', passDetails).subscribe(data => {
        this.validationMsg = data;    
         $("#successMatch").modal('show');      
         form.resetForm();
        //  this.confirmPassword='';
      }, err=>{
        this.validationMsg = err.error.message;
       $("#passNotMatch").modal('show');
      
     });
    }
    
  }
  successModal(){
    $("#successMatch").modal('hide');
    $("#passNotMatch").modal('hide');       
    this.appService.logout();  
    // this.router.navigateByUrl('/login');   
  }

  InfoModal(){
    $('#infoMatch').modal('hide');
  }
  showLists(){    
    $(".left-list").attr("style", "display: block !important"); 
    $('.mob-left-list').attr("style", "display: none !important");
  }
  
  ngAfterViewInit(){
    $("input, textarea, .select-dropdown").focus(function() {
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#4285F4"})
      
    })
    $("input, textarea, .select-dropdown").blur(function(){
      $(this).closest(".input-holder").parent().find("> label").css({"color": "#333"})
    })
    $('body,html').click(function(e){   
      if((window.innerWidth)<= 767){
      if(e.target.className == "mob-left-list" || $(e.target).closest(".left-list").length){
        return;
      } else{ 
          // $(".left-list").attr("style", "display: none !important"); 
          // $('.mob-left-list').attr("style", "display: block !important");  
      }
     }
    }); 
  }

}
