import { FormControl } from '@angular/forms';

export function BirthdayValidator(){
    return (control: FormControl): { [key: string]: any } => {
        let from = new Date(1900, 1, 1).getTime();
        let to   = new Date().getTime();
        let value;

        try{
            value = new Date(Date.parse(control.value)).getTime();
        }
        catch{
            return { invalidDate: true };
        }
    
        if (!value) {
          return { invalidDate: true };
        }

        if(value < from || value > to){      
            return { invalidDate: true };
        }
    
        return null;
      };
}