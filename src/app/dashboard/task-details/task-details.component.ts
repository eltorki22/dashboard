import { Component, EventEmitter, Output,Input } from "@angular/core";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
})
export class TaskDetailsComponent {
  @Output() showDetailDatachange = new EventEmitter();
  @Input() DataDetails:any;
  
  hideDetails() {
    this.showDetailDatachange.emit(false);
  }
}
