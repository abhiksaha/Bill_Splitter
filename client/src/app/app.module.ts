import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// App
import { AppComponent } from './app.component';
import { routing } from './app.routing';
//guards
import { CanActivateGuard } from './guards/CanActivateGuard';
//Components
import { AdminComponent } from './components/admin/admin.component';
import { SideBarComponent } from './components/sidebar/side-bar.component'
import { HomeComponent } from './components/home/home.component';
import { SplitComponent } from './components/split/split.component';

//service
import {SplitService} from './services/split.service';
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SplitComponent,
    SideBarComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	  routing
  ],
  providers: [
    SplitService,
    CanActivateGuard,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
