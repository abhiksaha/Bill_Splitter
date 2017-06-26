import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {SplitService} from '../../services/split.service';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.css']
})
export class SplitComponent implements OnInit {

	toggleItemSelectionModal:Boolean = false;
	items:Array<any> = [];
	itemName:string = '';
	quantity:number = 0;
	allMembers: Array<any> = [];
	isDrinkBillSplit:boolean = true;
	isFoodBillSplit: boolean = true;
	
	drinksItemMappingArray:Array<any> = [];
	foodItemMappingArray:Array<any> = [];
	
	individualMemberSplittedDetails: Array<any> = [];
	
	constructor( private splitService: SplitService) { }	

	ngOnInit() {
		this.allMembers = this.splitService.homePageData.AllMembers;
		if(this.splitService.homePageData.BillType == 'food')
			this.isDrinkBillSplit = false;
		if(this.splitService.homePageData.BillType == 'drinks')
			this.isFoodBillSplit = false;
			
		this.populateIndividualSplitDetailsArray();
	}
	
	populateIndividualSplitDetailsArray(){
		this.individualMemberSplittedDetails = [];
		for(let i = 0; i< this.allMembers.length; i++){
			let splittedDetailsObj = this.allMembers[i];
			splittedDetailsObj.foodDetails = [];
			splittedDetailsObj.drinkDetails = [];
			this.individualMemberSplittedDetails.push(splittedDetailsObj);
		}		
	}
	
	openAddItemModal(type){
		this.toggleItemSelectionModal = true;
	}
	
	closeItemSelectionModal(){
		this.toggleItemSelectionModal = false;
	}

	onClickAddItems(){
		if(this.itemName != '' && this.quantity > 0){
			for(let i = 0; i < this.quantity; i++){
				this.items.push({id: this.itemName + '_' + this.items.length, value: this.itemName, price: 100, isChekced: [false, false]});
			}
		}
		this.itemName = '';
		this.quantity = 0;
	}	
	
	onChangeItemCheckbox(e, item, member, index){
		let item_id = item.id,
			item_name = item.value,
			item_price = item.price,
			member_name = member.name;
			
		if(e.target.checked){
			item.isChekced[index] = true;
			if(this.drinksItemMappingArray.filter(function(ele){ return ele.item_id == item_id}).length == 0){
				let mappingObj = {item_id: item_id, item_name: item_name, price: item_price, members: [member_name]};
				this.drinksItemMappingArray.push(mappingObj);
			}else{
				for(let i = 0; i< this.drinksItemMappingArray.length; i++ ){
					if(this.drinksItemMappingArray[i].item_id == item_id){
						this.drinksItemMappingArray[i].members.push(member_name);
					}
				}
			}
		}else{
			item.isChekced[index] = false;
			for(let i = 0; i< this.drinksItemMappingArray.length; i++ ){
				if(this.drinksItemMappingArray[i].item_id == item_id){
					this.drinksItemMappingArray[i].members.splice(this.drinksItemMappingArray[i].members.indexof(member_name), 1);
				}
			}
		}
	}
	
	onClickDoneButton(){
		this.toggleItemSelectionModal = false;
		this.populateIndividualMemberItems();
	}
	
	populateIndividualMemberItems(){
		let self = this;
		this.populateIndividualSplitDetailsArray();
		for(let i = 0; i< this.drinksItemMappingArray.length ; i++){
			if(this.drinksItemMappingArray[i].members.length == 1){
				let memberName = this.drinksItemMappingArray[i].members[0];
				let filterObj = this.individualMemberSplittedDetails.filter(function(ele){
					return ele.name == memberName;
				})[0];
				if(filterObj){
					if(filterObj.drinkDetails.length){
						let drinkFilterObj = filterObj.drinkDetails.filter(function(ele){
							return ele.itemName == self.drinksItemMappingArray[i].item_name
						})[0];
						if(drinkFilterObj){
							drinkFilterObj.itemCount++;
							drinkFilterObj.price += this.drinksItemMappingArray[i].price;
						}else{
							filterObj.drinkDetails.push({
								itemCount: 1, 
								itemName: this.drinksItemMappingArray[i].item_name, 
								price: this.drinksItemMappingArray[i].price
							});
						}
					}else{
						filterObj.drinkDetails.push({
							itemCount: 1, 
							itemName: this.drinksItemMappingArray[i].item_name, 
							price: this.drinksItemMappingArray[i].price
						});
					}
				}
			}else{
				for(let j = 0; j< this.drinksItemMappingArray[i].members.length; j++){
					let memberName = this.drinksItemMappingArray[i].members[j];
					let filterObj = this.individualMemberSplittedDetails.filter(function(ele){
						return ele.name == memberName;
					})[0];
					if(filterObj){
						if(filterObj.drinkDetails.length){
							let drinkFilterObj = filterObj.drinkDetails.filter(function(ele){
								return ele.itemName == self.drinksItemMappingArray[i].item_name
							})[0];
							if(drinkFilterObj){
								drinkFilterObj.itemCount += 1 / parseInt(this.drinksItemMappingArray[i].members.length);
								drinkFilterObj.price += this.drinksItemMappingArray[i].price/ parseInt(this.drinksItemMappingArray[i].members.length);
							}else{
								filterObj.drinkDetails.push({
									itemCount: 1 / parseInt(this.drinksItemMappingArray[i].members.length), 
									itemName: this.drinksItemMappingArray[i].item_name, 
									price: this.drinksItemMappingArray[i].price/ parseInt(this.drinksItemMappingArray[i].members.length)
								});
							}
						}else{
							filterObj.drinkDetails.push({
								itemCount: 1 / parseInt(this.drinksItemMappingArray[i].members.length), 
								itemName: this.drinksItemMappingArray[i].item_name, 
								price: this.drinksItemMappingArray[i].price/ parseInt(this.drinksItemMappingArray[i].members.length)
							});
						}
					}
				}
			}
		}
	}
}
