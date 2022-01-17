import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class SubmissionServiceService {

  constructor(private httpClient:HttpClient) { }

  getActiveSubmissions(areaId,timePeriodId,formId)
  {
    return this.httpClient.get(Constants.HOME_URL+'database/'+'getActiveSubmissions?areaId='+areaId+'&timePeriodId='+timePeriodId+'&formId='+formId).toPromise()
  }

  rejectSubmission(lastVistDataId)
  {
    return this.httpClient.get(Constants.HOME_URL+'database/'+'rejectSubmission?lastVistDataId='+lastVistDataId).toPromise()
  }

  makeSubmissionFinalize(lastVistDataId)
  {
    return this.httpClient.get(Constants.HOME_URL+'database/'+'makeSubmissionFinalize?lastVistDataId='+lastVistDataId).toPromise()
  }

  generateFIP(lastVistDataId)
  {
    return this.httpClient.get(Constants.HOME_URL+'database/'+'generateFIP?lastVistDataId='+lastVistDataId).toPromise()
  }

}
