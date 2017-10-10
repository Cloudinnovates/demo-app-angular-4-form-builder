import { Component, OnInit, ViewChild } from '@angular/core';

import { FormService } from '../forms.service';

@Component({
  selector: 'app-export-forms',
  templateUrl: './export-forms.component.html',
  styleUrls: ['./export-forms.component.css']
})
export class ExportFormsComponent implements OnInit {
  @ViewChild('jsonValue') jsonValue;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.jsonValue.nativeElement.value = this.formService.getFormsJson();
  }

  onReloadForms(){
    var stringToStorage = this.jsonValue.nativeElement.value;
    if(stringToStorage === ''){
      stringToStorage = '[]';
      localStorage.setItem('dataForms', stringToStorage);
      this.formService.reloadDataWithLocalStorage();
    }else{
      localStorage.setItem('dataForms', stringToStorage);
      this.formService.reloadDataWithLocalStorage();
    }
  }

}
