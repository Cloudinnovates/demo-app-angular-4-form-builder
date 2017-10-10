import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateFormsComponent } from './create-forms/create-forms.component';
import { PreviewFormsComponent } from './preview-forms/preview-forms.component';
import { ExportFormsComponent } from './export-forms/export-forms.component';

const appRoutes = [
  { path: '', redirectTo: '/create-forms', pathMatch: 'full' },
  { path: 'create-forms', component: CreateFormsComponent },
  { path: 'preview-forms', component: PreviewFormsComponent },
  { path: 'export-forms', component: ExportFormsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutungModule{

}