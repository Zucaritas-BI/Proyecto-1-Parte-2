import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
