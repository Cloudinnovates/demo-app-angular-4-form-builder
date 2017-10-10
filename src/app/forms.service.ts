import { FormDetail } from './formDetail.model';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class FormService{
  public formsChanged = new Subject<FormDetail[]>();

  private forms: FormDetail[] = [];

  constructor(){
    if (localStorage.getItem('dataForms') !== null) {
      this.forms = JSON.parse(localStorage.getItem('dataForms'));
    }
  }

  getForms(){
    if( typeof this.forms !== 'undefined' ){
      return this.forms.slice();
    }    
  }

  getFormsJson(){
    return JSON.stringify(this.forms);
  }

  reloadDataWithLocalStorage(){
    if (localStorage.getItem('dataForms') !== null) {
      this.forms = JSON.parse(localStorage.getItem('dataForms'));
    }
  }

  createNewSubForm(currentIndex: number, levelMarginLeft: number){
    var i = currentIndex + 1;
    var countIndex = 1;
    while((typeof(this.forms[i]) !== 'undefined') 
           && (this.forms[currentIndex].levelMarginLeft < this.forms[i].levelMarginLeft) 
           && this.forms[i].levelMarginLeft !== 0){
      countIndex++;
      i++;
    }
    this.forms.splice(currentIndex + countIndex, 0, new FormDetail(levelMarginLeft));
    this.formsChanged.next(this.forms.slice());
    this.forms[i].formView = false;
    this.changeFormCondition(this.forms[currentIndex].type, i);
  }

  createNewForm(currentIndex: number, levelMarginLeft: number){
    this.forms.push(new FormDetail(levelMarginLeft));    
    this.formsChanged.next(this.forms.slice());
  }

  deleteForm(index){
    var i = index+1;
    var countRemoveItem = 1;
    while((typeof(this.forms[i]) !== 'undefined') && (this.forms[i].levelMarginLeft !== 0)){
      countRemoveItem++;
      i++;
    }
    this.forms.splice(index, countRemoveItem);
    this.formsChanged.next(this.forms.slice());
  }
  changeFormCondition(conditionValue, index){
    this.forms[index].conditionValueType = conditionValue;
    this.formsChanged.next(this.forms.slice());
  }
  changeNextFormsCondition(conditionValue, index){
    var j = index + 1;
    var conditionBoolean = true;
    const currentItem = this.forms[index];
    while((typeof(this.forms[j]) !== 'undefined') && (this.forms[index].levelMarginLeft !== this.forms[j].levelMarginLeft)){
      conditionBoolean = true;
      if (this.forms[index + 1].levelMarginLeft === this.forms[j].levelMarginLeft) {
        this.forms[j].conditionValueType = conditionValue;
        this.formsChanged.next(this.forms.slice());
      }
      j++;    
    }
  }

  conditionCheck(index){    
    var j = index + 1;
    var conditionBoolean = true;
    const currentItem = this.forms[index];
    while((typeof(this.forms[j]) !== 'undefined') && (this.forms[index].levelMarginLeft !== this.forms[j].levelMarginLeft)){
      conditionBoolean = true;
      if (this.forms[index + 1].levelMarginLeft === this.forms[j].levelMarginLeft) {
        var i = j + 1;
        var nextItem = this.forms[j];
        switch (nextItem.condition) {
          case 'equals':
            if(nextItem.conditionValue !== currentItem.questionAnswer) conditionBoolean = false;
            break;
          case 'greaterThan':
            if(+nextItem.conditionValue >= +currentItem.questionAnswer) conditionBoolean = false;
            break;
          case 'lessThan':
            if(+nextItem.conditionValue <= +currentItem.questionAnswer) conditionBoolean = false;
            break;
          default:
            conditionBoolean = true;
            break;
        }
        if(!conditionBoolean){
          nextItem.questionAnswer = "";
          while ((typeof(this.forms[i]) !== 'undefined') && 
                 (this.forms[j].levelMarginLeft <= this.forms[i].levelMarginLeft )) {
            this.forms[i].formView = false;
            this.forms[i].questionAnswer = '';
            i++;
          }
        }
        nextItem.formView = conditionBoolean;
        this.formsChanged.next(this.forms.slice());

      }
      j++;    
    }
  }
}