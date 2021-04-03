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
import { AssociateMasterComponent } from './associate-master/associate-master.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { JobAllocationComponent } from './job-allocation/job-allocation.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ManPowerComponent,
    AssociateMasterComponent,
    JobMasterComponent,
    JobAllocationComponent,
    CostSheetComponent,
    PageNotFoundComponent,
    CoreComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MisComponent,
    ResourceFormComponent,
    DragDropDirective 
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
    // Phone module
    Ng2TelInputModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    RoleGuard,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
