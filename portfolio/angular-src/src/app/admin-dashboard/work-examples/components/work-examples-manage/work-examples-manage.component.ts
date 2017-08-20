import { Component, OnInit } from '@angular/core';
import { WorkExamplesApiService } from "../../work-examples-api.service"
import { FlashMessagesService } from "angular2-flash-messages"

@Component({
  selector: 'portfolio-work-examples-manage',
  templateUrl: './work-examples-manage.component.html',
  styleUrls: ['./work-examples-manage.component.scss']
})
export class WorkExamplesManageComponent implements OnInit {

  constructor(
    private apiService: WorkExamplesApiService,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.loadWorkExamples()
  }

  workExamples: Array<object>

  deleteWorkExample(workExampleObject) {
    this.apiService.deleteWorkExample(workExampleObject)
    .subscribe(res => {
      if(res.success) {
        this.flashMessage.show(res.message, {cssClass: "flash-success--dashboard", timeout: 3000})
        this.loadWorkExamples()
      } else {
        this.flashMessage.show("Work example deletion failed", {cssClass: "flash-failure--dashboard", timeout: 3000})
      }
    })
  }

  loadWorkExamples() {
    this.apiService.loadWorkExamples()
    .subscribe(res => {
      console.log(res)
      this.workExamples = res.data
    })
  }

}