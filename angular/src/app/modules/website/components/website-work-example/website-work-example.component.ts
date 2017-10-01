import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-website-work-example',
  templateUrl: './website-work-example.component.html'
})
export class WebsiteWorkExampleComponent implements OnInit {

  workExample: Object;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .map(params => params['id'])
    .subscribe((workExampleId) => {
      const paletteObject = {_id: workExampleId};
      this.apiService.getWorkExample(workExampleId)
      .subscribe(workExample => {
        console.log(workExample);
        this.workExample = workExample;
      },
      error => {
        console.log(error);
      });
    });
  }

}
