import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Subject } from 'rxjs/Subject';
import { HomePageData } from '../components/home/home.model';

@Injectable()
export class SplitService{

    isBasicSplitDataAvailable: boolean = false;

    private updateSideBarSub = new Subject<any>();

    updateSideBar(param){
        this.updateSideBarSub.next({ isSideBarVisible: param})
    }

    getSideBarStatus(): Observable<any> {
        return this.updateSideBarSub.asObservable();
    }
    homePageData: HomePageData;

    splitPageData:Object = {};

}