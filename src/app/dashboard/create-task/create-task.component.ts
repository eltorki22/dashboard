import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";

import { noTripleLettersValidator } from "./validator";  

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
})
export class CreateTaskComponent {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() isEditMode: any;

  @Input() SelectedTask: any;

  @ViewChild("f") f!: NgForm;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      this.f.form.patchValue(this.SelectedTask);


      const titleControl = this.f.controls['title'];
      titleControl.setValidators([noTripleLettersValidator()]);
      titleControl.updateValueAndValidity(); // تأكد من تحديث صلاحية الحقل بعد إضافة المحقق
    }, 100);

    console.log(this.SelectedTask);
  }

  @Output() SubmitData = new EventEmitter();
  OnCloseForm() {
    this.CloseForm.emit(false);
  }

  onSubmit(f: NgForm) {
    if(f.valid){
      this.SubmitData.emit(f.value);
      this.CloseForm.emit(false);   
      console.log(f)
    }
   

  }

  
// ngOnInit() {
//   const titleControl = this.f.controls['title'];
//   titleControl?.setValidators([noTripleLettersValidator()]);
//   titleControl?.updateValueAndValidity();
// }
}


