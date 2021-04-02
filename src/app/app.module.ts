import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContentItemComponent} from './content-item/content-item.component';
import {PinboardComponent} from './pinboard/pinboard.component';
import {HeaderComponent} from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {HostConfigProvider} from "./providers/host-config.provider";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateContentItemComponent} from './create-content-item/create-content-item.component';
import {FilterItemPipe} from './pinboard/filter-item.pipe';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {MatCardModule} from "@angular/material/card";
import {DialogComponent} from './dialog/dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {EditItemComponent} from './edit-item/edit-item.component';
import {AuthInterceptor} from "./providers/auth-interceptor.service";
import {SizeDetectorComponent} from './size-detector/size-detector.component';
import {NgxImageCompressService} from "ngx-image-compress";


export function configFactory(hostConfigProvider: HostConfigProvider) {
  return () => hostConfigProvider.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    ContentItemComponent,
    PinboardComponent,
    HeaderComponent,
    LoginComponent,
    CreateContentItemComponent,
    FilterItemPipe,
    FileUploadComponent,
    DialogComponent,
    EditItemComponent,
    SizeDetectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [HostConfigProvider],
      multi: true
    },
    NgxImageCompressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
