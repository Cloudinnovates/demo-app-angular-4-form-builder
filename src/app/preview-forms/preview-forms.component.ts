import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FormService } from '../forms.service';
import { FormDetail } from '../formDetail.model';

@Component({
  selector: 'app-preview-forms',
  templateUrl: './preview-forms.component.html',
  styleUrls: ['./preview-forms.component.css']
})
export class PreviewFormsComponent implements OnInit, OnDestroy {
  forms: FormDetail[];
  private subscription: Subscription;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.forms = this.formService.getForms();
    this.subscription = this.formService.formsChanged
      .subscribe(
        (forms: FormDetail[]) => 
        setTimeout( () => {        
          const stringToStorage = this.formService.getFormsJson();
          localStorage.setItem('dataForms', stringToStorage);
          this.forms = forms;  
        },50)
      );
  }

  changedForm(index){
    if(typeof(this.forms[index+1])!=='undefined' && this.forms[index+1].levelMarginLeft > this.forms[index].levelMarginLeft) {
      this.formService.conditionCheck(index);
    }  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
