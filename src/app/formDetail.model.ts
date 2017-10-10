export class FormDetail{
  question: string = "Question";
  type: string = "text";
  condition: string = "equals";
  conditionValue: string = "";
  conditionValueType: string = "text";
  questionAnswer: any;
  formWhithCondition: boolean = false;
  formView: boolean = true;
  
  constructor(public levelMarginLeft: number){
    if (levelMarginLeft !== 0) {
      this.formWhithCondition = true;
    }     
  }
}