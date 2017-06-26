import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";
import {SplitService} from '../../services/split.service';
import { HomePageData } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	restaurantName: string = '';
	billDated: string = '';
	addedMemberName:string = '';
	addedGroupName:string = '';
	billType:string = 'both';
	allMembers:Array<any> = [];
	errorMessages: Array<any> = [];

	constructor(private router: Router, private splitService: SplitService) { }

	ngOnInit() {
		this.populateFormFields();
	}
	
	populateFormFields(){
		if(this.splitService.isBasicSplitDataAvailable){
			this.restaurantName = this.splitService.homePageData.RestaurantName;
			this.billDated = this.splitService.homePageData.BillDated;
			this.addedMemberName = this.splitService.homePageData.AddedMemberName;
			this.addedGroupName = this.splitService.homePageData.AddedGroupName;
			this.billType = this.splitService.homePageData.BillType;
			this.allMembers = this.splitService.homePageData.AllMembers;
		}
	}

	AddMembers(){
		if(this.addedMemberName != ''){
			let self = this;
			if(this.allMembers.filter(function(ele){ return ele.name.toLowerCase() == self.addedMemberName.toLowerCase()}).length == 0){
				let memberObj = { id: this.allMembers.length + 1, name: this.addedMemberName, isHover: false};
				this.allMembers.push(memberObj);
				this.addedMemberName = '';
			}
			else
				alert('A duplicate person already exists');
		}
	}
	
	RemoveMember(index){
		this.allMembers.splice(index,1);
	}

	onMouseOverAddedMemberBlock(memberObj){
		memberObj.isHover = true;
	}

	onMouseLeaveAddedMemberBlock(memberObj){
		memberObj.isHover = false;
	}

	onClickSplitNow (){
		this.errorMessages = [];
		if(this.restaurantName != '' && this.allMembers.length > 1){
			this.splitService.homePageData = {
				RestaurantName : this.restaurantName,
				BillDated : this.billDated,
				AddedMemberName : this.addedMemberName,
				AddedGroupName : this.addedGroupName,
				BillType : this.billType,
				AllMembers : this.allMembers
			}
			this.splitService.isBasicSplitDataAvailable = true;
			this.splitService.updateSideBar(true);	
			this.router.navigate(['/', 'split']);
		}
		else{
			if(this.restaurantName == ''){
				if(!this.allMembers.length){
					let errors = [
						{message: 'Please Select Restaurant\'s name.'},
						{message: 'You have not added any friends.'}
					]
					this.errorMessages = errors;
				}else if(this.allMembers.length == 1){
					let errors = [
						{message: 'Please Select Restaurant\'s name.'},
						{message: 'Please add atleast 2 friends.'}
					]
					this.errorMessages = errors;
				}else{
					let errors = [
						{message: 'Please Select Restaurant\'s name.'}
					]
					this.errorMessages = errors;
				}
			}else{
				if(!this.allMembers.length){
					let errors = [
						{message: 'You have not added any friends.'}
					]
					this.errorMessages = errors;
				}else if(this.allMembers.length == 1){
					let errors = [
						{message: 'Please add atleast 2 friends.'}
					]
					this.errorMessages = errors;
				}else{}
			}

			this.splitService.homePageData = {
				RestaurantName : '',
				BillDated : '',
				AddedMemberName : '',
				AddedGroupName : '',
				BillType : '',
				AllMembers : []
			}
			this.splitService.isBasicSplitDataAvailable = false;
			this.splitService.updateSideBar(false);	
		}
	}
}
