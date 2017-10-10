import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FormService } from '../forms.service';
import { FormDetail } from '../formDetail.model';

@Component({
  selector: 'app-create-forms',
  templateUrl: './create-forms.component.html',
  styleUrls: ['./create-forms.component.css']
})
export class CreateFormsComponent implements OnInit, OnDestroy {
  forms: FormDetail[];
  private subscription1: Subscription;

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.forms = this.formService.getForms();
    this.subscription1 = this.formService.formsChanged
      .subscribe(
        (forms: FormDetail[]) => 
        setTimeout( () => {        
          const stringToStorage = this.formService.getFormsJson();
          localStorage.setItem('dataForms', stringToStorage);
          this.forms = forms;  
        },50)
      );
  }

  onAddInput(){
    this.formService.createNewForm(-1, 0);
  }
  onAddSubInput(currentIndex, levelMarginLeft){    
    if(levelMarginLeft !== 0){
      this.formService.createNewSubForm(currentIndex, levelMarginLeft);
    }else{
      this.formService.createNewForm(currentIndex, levelMarginLeft);
    }
  }

  onDelete(index){
    this.formService.deleteForm(index);
  }

  changeCondition(conditionValue, indexCurrentForm){    
    if (typeof(this.forms[indexCurrentForm+1])!=='undefined') {
      this.formService.changeNextFormsCondition(conditionValue, indexCurrentForm);
    }
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
}
