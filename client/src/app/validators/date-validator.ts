import {FormControl, ValidationErrors} from "@angular/forms";

export class DateValidator {

  validateDate(control: FormControl): ValidationErrors{
    let message = '';
    let date = new Date(control.value)

    if(isNaN(date.valueOf())){
      message = 'Дата введена некорректно'
    }
    if(date.valueOf() < Date.now()){
      message = 'Введенная дата уже прошла'
    }
    if(message != ''){
      return {
        invalidDate:
        message
      }
    }
    return null
  }

}
