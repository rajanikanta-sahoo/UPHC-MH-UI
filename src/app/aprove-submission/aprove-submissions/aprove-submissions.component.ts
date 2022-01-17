import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AreaModel } from 'src/app/models/AreaModel';
import { Constants } from 'src/app/models/constants';
import { FipAreaLevelModel } from 'src/app/models/FipAreaLevelModel';
import { FipDistrictFacilityModel } from 'src/app/models/FipDistrictFacilityModel';
import { FipDistricts } from 'src/app/models/FipDistricts';
import { FipFacilityModel } from 'src/app/models/FipFacilityModel';
import { FipService } from 'src/app/reports/api/fip.service';
import { SubmissionServiceService } from '../submission-service.service';

declare var $: any;
@Component({
	selector: 'sdrc-aprove-submissions',
	templateUrl: './aprove-submissions.component.html',
	styleUrls: ['./aprove-submissions.component.scss']
})
export class AproveSubmissionsComponent implements OnInit {

	exportData: any;
	rdata: any[] = [];
	allFacilities: any = [];
	allStates = [];
	allDistricts: any = [];
	selectedFacility: FipFacilityModel = new FipFacilityModel();
	facilityList: any;
	selectedArea: FipAreaLevelModel = new FipAreaLevelModel();

	selectedDistrictFacility: any = [];

	fipDistricts: any = [];
	selectedFacilityType: FipDistrictFacilityModel = new FipDistrictFacilityModel();;
	selectedDistrict: FipDistricts = new FipDistricts();
	errorMsg: string;
	selectedState: AreaModel = new AreaModel();

	selectedProgram;
	programList = [];
	itemsPerPage = 10;
  pagerId = "page-new-p";
  p = 1;
  searchFilter;

	heading: string;
	headeText: string;
	tableColumns = [ "district", "facilityType", "facility", "areaName", "createdBy", "finalized","Action"];
	tableColumns1= [ "district", "facilityType", "facility", "areaName", "createdBy", "finalized","Action"];
	constructor(private fipService: FipService, private submissionServiceService: SubmissionServiceService, private httpXsrfTokenExtractor: HttpXsrfTokenExtractor) { }

	ngOnInit() {
		this.setColumn();
		this.getAllState();

		this.heading = "Aprove Submission";
		this.headeText = "Aprove Submission";
	}

	setColumn() {

	}

	submit(event) { }
	deleteButton(event) { }

	getWidth(id) {
		return $("#" + id).width();
	}


	getAllDistricts(data) {
		this.fipService.getFipDistrict(data).then((data) => {
			this.allDistricts = data as any;
			this.fipDistricts = this.allDistricts;

		}).catch(error => { })
	}



	getAllDistrictFacility(data) {
		this.fipService.getFacilityFormADistrict(data).then((data) => {
			this.allFacilities = data as any;
			this.programList = Object.keys(this.allFacilities);
			this.selectedDistrictFacility = [];
			this.selectedFacilityType = new FipDistrictFacilityModel();
			this.selectProgram(this.programList[0]);

		}).catch(error => { })
	}

	getAllState() {
		this.fipService.getStateList().then(response => {
			let data = response as any
			this.allStates = data;

			if (this.allStates.length == 1)
				this.selectState(this.allStates[0]);

		});
	}

	selectState(state) {
		this.selectedState = state;
		this.selectedProgram = null;
		this.selectedArea = new FipAreaLevelModel();
		this.selectedDistrictFacility = [];
		this.getAllDistrictFacility(this.selectedState.areaId);
		this.getAllDistricts(this.selectedState.areaId);
		this.selectedDistrict = new FipDistricts();;
		this.selectedFacility = new FipFacilityModel();;

	}
	selectDistrict(district) {

		this.selectedDistrict = district;

		let flist = this.selectedDistrict.facilites;
		this.facilityList = flist.filter(e => e.areaLevelId == this.selectedArea.areaLevelId);
		this.selectedFacility = new FipFacilityModel();;
		this.selectedFacility = this.facilityList[0];

	}
	selectFacilityType(facilityType) {
		this.selectedFacilityType = facilityType;
		this.selectedArea = facilityType.areaLevelModel;

		this.selectedDistrict = new FipDistricts();;
		this.selectedFacility = new FipFacilityModel();;
	}

	selectProgram(program) {
		this.selectedProgram = program;
		this.selectedArea = new FipAreaLevelModel();
		this.selectedFacilityType = new FipDistrictFacilityModel();
		this.selectedDistrictFacility = this.allFacilities[program]
		//console.log(this.selectedDistrictFacility)
	}
	selectFacility(facility) {
		this.selectedFacility = facility;

	}

	tableActionClicked(emittedData) {
		console.log("hello");
		this.submissionServiceService.rejectSubmission(emittedData.lastVisitDataId).then(response => {
			this.getTable();
		})
		
	}

	getTable() {

		if (!this.selectedArea.areaLevelName) {
			this.errorMsg = "Facility type";
			$("#infoMatch").modal("show");
			return false;
		}

		else if (!this.selectProgram) {
			this.errorMsg = "Program";
			$("#infoMatch").modal("show");
			return false;
		}

		else if (!this.selectedDistrict) {
			this.errorMsg = "District";
			$("#infoMatch").modal("show");
			return false;
		}
		// else if (!this.selectedFacility || this.selectedFacility.areaId == undefined) {
		// 	this.errorMsg = "Facility";
		// 	$("#infoMatch").modal("show");
		// 	return false;
		// }
		else {

			$(".loader").show();

			this.submissionServiceService.getActiveSubmissions(this.selectedDistrict.areaId, 1, this.selectedFacilityType.formId).then(response => {

				this.rdata = response as any;

			})
			// this.selectedArea=new FipAreaLevelModel();
			// this.selectedDistrict=new FipDistricts();
			// this.selectedFacility=new FipFacilityModel();

			// this.selectedArea = new FipAreaLevelModel();
			// this.selectedDistrict = new FipDistricts();;
			// this.selectedFacility = new FipFacilityModel();;

		}
	}


	downloadReport(emittedData) {

		
			$(".loader").show();
			
			
			this.submissionServiceService.generateFIP(emittedData.lastVisitDataId).then(response => {
				console.log("test");
				if (response == null || response["File"] == null || response["File"].trim() == "") {
					$("#noDataModall").modal("show");
				}
				else {
					var fileName = { "fileName": response["File"] };
					this.download(Constants.HOME_URL + "downloadFile", fileName, 'POST');
				}

			})
			// this.selectedArea=new FipAreaLevelModel();
			// this.selectedDistrict=new FipDistricts();
			// this.selectedFacility=new FipFacilityModel();
			
			// this.selectedArea = new FipAreaLevelModel();
			// this.selectedDistrict = new FipDistricts();;
			// this.selectedFacility = new FipFacilityModel();;

		
	}


	download(url, data, method) {
		// url and data options required
		if (url && data) {
			// data can be string of parameters or array/object
			data = typeof data == 'string' ? data : $.param(data);
			// split params into form inputs
			var inputs = '';
			$.each(data.split('&'), function () {
				var pair = this.split('=');
				inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
			});

			inputs += '<input type="hidden" name="_csrf" value="' + this.httpXsrfTokenExtractor.getToken() + '" />';
			// send request
			$(
				'<form action="' + url + '" method="' + (method || 'post')
				+ '">' + inputs + '</form>').appendTo('body')
				.submit().remove();
		}
	}

}
