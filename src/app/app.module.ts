import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateFormsComponent } from './create-forms/create-forms.component';
import { PreviewFormsComponent } from './preview-forms/preview-forms.component';
import { ExportFormsComponent } from './export-forms/export-forms.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutungModule } from './app-routing.module';
import { FormService } from './forms.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormsComponent,
    PreviewFormsComponent,
    ExportFormsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutungModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
