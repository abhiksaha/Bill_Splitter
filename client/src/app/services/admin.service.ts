import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { RestaurantModel } from '../components/admin/restaurantData.model';

@Injectable()

export class AdminService{	
	
	constructor(private http: Http) {
    }
	
	getAllRestaurantList(){
		return this.http.get('http://localhost:3000/getAllRestaurantsData')
			.map((res : Response) => res.json())			
			.catch(this.handleError);
	}
	
	saveRestaurantDetails(details: RestaurantModel){
        const body = JSON.stringify(details);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/addRestaurantData', body, {headers: headers})
			.map((res : Response) => res.json())			
			.catch(this.handleError);
    }
	
	editRestaurantDetails(details: RestaurantModel){
		const body = JSON.stringify(details);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/editRestaurantData', body, {headers: headers})
			.map((res : Response) => res.json())			
			.catch(this.handleError);
	}
	
	private handleError (error: any): Observable<any> {
        //TODO handle and show error
		let errBody = error.json();
		let errMsg = (errBody.error.message) ? errBody.error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error',
			errObj = { title: errBody.title, message: errMsg};
        return Observable.throw(errObj);
    }
}
