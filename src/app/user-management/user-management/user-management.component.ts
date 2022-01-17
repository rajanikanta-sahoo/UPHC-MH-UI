import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/models/constants';
import { UserManagementService } from '../services/user-management.service';
declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {  
  form: FormGroup;
  formFields: any;
  sdrcForm: FormGroup;
  
  payLoad = '';
  
  natAreaDetails: any;
  stateList: any;
  parentAreaId: number;
  paramModal: any;
  validationMsg: any;
  btnDisable: boolean = false;
  UserForm:FormGroup;
  firstFieldVariable:any;
  selectedRoleId: number;
  selectedStateId: number;
  allArea:any;
  selectedDistrict:any;
  selectedState:any;
  selectedFacilityId: number;
  facilities: any;
  selectedUser: any = {};
  fullName: string;
  userName: string;
  password: string;
  mobile: number;
  allStates:any;
  stateLists: any;
  selectedStateDetails:any;
  selectedDistDetails:any;
  selectedArea:any;
  userManagementService: UserManagementService;
  
  
  constructor(private http: HttpClient, private userManagementProvider: UserManagementService) {
    this.userManagementService = userManagementProvider;
   }

  ngOnInit() {    
    if(!this.userManagementService.formFieldsAll)
      this.userManagementService.getUserRoles().subscribe(data=>{
        this.userManagementService.formFieldsAll = data;
      }) 
    // if(!this.userManagementService.areaDetails)   
      this.userManagementService.getAreaDetails().subscribe(data=>{
        this.allArea=data;
        this.userManagementService.areaDetails = this.allArea;
        this.userManagementService.areaForGuest = this.allArea['allArea'];
      }) 
    if((window.innerWidth)<= 767){
      $(".left-list").attr("style", "display: none !important"); 
      $('.mob-left-list').attr("style", "display: block !important");
    }
  }

  getArea(roleId:number){
    this.selectedRoleId=roleId;
    this.userManagementService.getAreaDetails().subscribe(data=>{
      this.userManagementService.areaDetails = data;
    })
    if(roleId==1 || roleId==3 || roleId==6){//state
      this.userManagementService.stateLists = this.allArea['State'];
    }
    // else if(roleId==3 || roleId==6){//district
    //   this.userManagementService.areaDetails = this.allArea['District'];
    // }else
     if(roleId==5){//district
      this.userManagementService.areaDetails = this.allArea['allArea'];
    }
  } 
  getRole(role){
    this.selectedUser = role;
    if(this.selectedUser.id ==1 || this.selectedUser.id == 3 || this.selectedUser.id == 6){
      this.userManagementService.stateLists = this.allArea['State'];
    }
    if(this.selectedUser.id ==5){//district
      this.userManagementService.areaDetails = this.allArea['allArea'];
    }
    this.selectedState='';
    this.selectedDistrict='';
    this.selectedStateDetails='';
    this.selectedDistDetails = '';
   this.userManagementService.districtLists= [];
   
    // this.getDistrict('');
    // this.getSelectedArea('');
    // this.getSelectedDistrict('');
    
  }
  // getDistrict(state){
  //   this.userManagementService.districtLists = this.userManagementService.areaDetails['District'].filter(d=> state.areaId == d.parentAreaId)
  // }

  getDistrict(state){
    this.userManagementService.areaDetails = this.allArea;
    this.selectedStateDetails = state;
    this.selectedState=state.areaName;
    this.userManagementService.districtLists = this.userManagementService.areaDetails['District'].filter(d=> state.areaId == d.parentAreaId)
  }

  getSelectedDistrict(dist){
    this.selectedDistDetails = dist;
    this.selectedDistrict=dist.areaName;
  }
  getSelectedArea(dist){
    this.selectedDistrict=dist.areaName;
    this.selectedDistDetails = dist;
  }

  checkPattern(model){
    let pattern = /^[a-zA-Z][a-zA-Z\s\.\./]+$/;
    if(!model.match(pattern)){
      this.fullName='';
      this.validationMsg="Only characters, dot(.) and space can be accepted";
      $('#patternMatch').modal('show');
    }
  }
  checkPatternUser(model){
    let pattern = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
    if(!model.match(pattern)){
      this.userName='';
      this.validationMsg="Only 3-15 characters,hyphen(-) and underscore(_) can be accepted.";
      $('#patternMatch').modal('show');
    }
  }
  checkPatternPass(model){
    let pattern = /^\S*$/;
    if(!model.match(pattern)){
      this.password='';
      this.validationMsg="Spaces are not accepted.";
      $('#patternMatch').modal('show');
    }
  }

  submitForm(roleId:any,form:NgForm){ 
    console.log(this.selectedState);
    
     let userDetails = {
      "userName":this.userName,
      "password":this.password,
      "designationIds":[roleId],
      "facilityId": this.selectedFacilityId ? this.selectedFacilityId: null,
      "mblNo":this.mobile,
      "areaId":roleId == 1?this.selectedStateDetails.areaId:this.selectedDistrict?this.selectedDistDetails.areaId:null,
      "areaCode":roleId == 1?this.selectedStateDetails.areaCode:this.selectedDistrict?this.selectedDistDetails.areaCode:null,
      "name":this.fullName,
      
     }
     if(this.userName=='' || this.userName==undefined){
      $('#infoMatch').modal('show');
     }else if(this.password=='' || this.password==undefined){
      $('#infoMatch').modal('show');
     }else if(this.fullName=='' || this.fullName==undefined){
      $('#infoMatch').modal('show');
     }else if(this.selectedUser.roleName=='' || this.selectedUser.roleName==undefined){
      $('#infoMatch').modal('show');
     }else if((this.selectedUser.id ==1 || this.selectedUser.id == 3 || this.selectedUser.id == 6) && (this.selectedState=='' || this.selectedState==undefined)){
      $('#infoMatch').modal('show');
     }else if((this.selectedUser.id == 3 || this.selectedUser.id == 6 || this.selectedUser.id ==5) && (this.selectedDistrict=='' || this.selectedDistrict==undefined)){
      $('#infoMatch').modal('show');
     }
     else{
     this.http.post(Constants.HOME_URL+'createUser', userDetails).subscribe((data) => {
       this.validationMsg = data;    
        $("#successMatch").modal('show');       
        // form.resetForm();
        this.selectedState='';
    this.selectedDistrict='';
    this.selectedStateDetails='';
    this.selectedDistDetails = '';
    this.selectedUser='';
      this.userName='';
      this.password='';
      this.fullName='';
        
        
     }, err=>{
      $("#oldPassNotMatch").modal('show');
        this.validationMsg = err.error;
      

    });
  }
  }
  successModal(){
    $("#successMatch").modal('hide');
    this.getRole('');
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
  getWidth(id) {
		return $("#" + id).width();
	}
  userRole(district){
  //  this.selectedStateId
    
  }

}
