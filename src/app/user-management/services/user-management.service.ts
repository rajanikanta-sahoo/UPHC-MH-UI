import { Injectable } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  formFieldsAll: any;
  typeDetails: any;
  userDetails: any;
  areaDetails: any;
  allTypes: any;
  areaForGuest: any;
  editUserDetails: any;
  resetPasswordDetails: any={};
  stateLists: any;
  districtLists: any;
  isAdmin: boolean = false;
  constructor(private httpClient: HttpClient) { }

  getUserRoles(){
    return this.httpClient.get(Constants.HOME_URL + 'getAllUserRoles');   
  }

  getUsersByRoleId(roleId){
    return this.httpClient.get(Constants.HOME_URL + 'getUsersByRoleId?roleId='+roleId)
  }
  
  getFacilitiesByDistrictId(areaId){
    return this.httpClient.get(Constants.HOME_URL + 'getFacilities?districtId='+areaId)
  }

  getAreaDetails(){
    return this.httpClient.get(Constants.HOME_URL + 'getAllArea');   
  }

  checkAdmin():boolean{
    let userDetails = JSON.parse(localStorage.getItem('access_token'))
    if(userDetails.roles[0]=='Admin'){
      this.isAdmin=true
    }
    return this.isAdmin;
  }
}
