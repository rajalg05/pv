import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from "./helpers/ErrorInterceptor";

import { AppComponent } from './app.component';
import { ManPowerComponent } from './man-power/man-power.component';
import { AssociateComponent } from './associate-master/associate-master.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { AuditStatusComponent } from './audit-status/audit-status.component';
import { CostSheetComponent } from './cost-sheet/cost-sheet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreComponent } from './core/core.component';
import { MatTabsModule } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AlertComponent } from './components/alert/alert.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MisComponent } from './core/mis/mis.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { RoleGuard } from './guards/role.guard';
import { TabViewModule } from 'primeng/tabview';
import { ResourceFormComponent } from './man-power/resource-form/resource-form.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { DropdownModule } from 'primeng/dropdown';
import { DragDropDirective } from './directives/drag-drop.directive';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ResourceViewComponent } from './man-power/resource-view/resource-view.component';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { GMapModule } from 'primeng/gmap';
import { AccordionModule } from 'primeng/accordion';
import { ProductService } from './service/product.service';
import { AssociateViewComponent } from './associate-master/associate-view/associate-view.component';
import { AssociateFormComponent } from './associate-master/associate-form/associate-form.component';
import { JobFormComponent } from './job-master/job-form/job-form.component';
import { JobViewComponent } from './job-master/job-view/job-view.component';
import {StepsModule} from 'primeng/steps'; 

@NgModule({
  declarations: [
    AppComponent,
    ManPowerComponent,
    AssociateComponent,
    JobMasterComponent,
    AuditStatusComponent,
    CostSheetComponent,
    PageNotFoundComponent,
    CoreComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MisComponent,
    ResourceFormComponent,
    DragDropDirective,
    ResourceViewComponent,
    AssociateViewComponent,
    AssociateFormComponent,
    JobFormComponent,
    JobViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    // primeng modules
    MessagesModule,
    MessageModule,
    ToastModule,
    FileUploadModule,
    MultiSelectModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    DataViewModule,
    PickListModule,
    GMapModule,
    AccordionModule,
    StepsModule, 
    // Phone module
    Ng2TelInputModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    RoleGuard,
    ProductService,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
