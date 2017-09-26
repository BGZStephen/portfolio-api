import * as _ from 'lodash';

export class WorkExampleContentEditor {
  constructor (
    private apiService,
    private workExample,
  ) {
    this.workExample = workExample
    this.apiService = apiService
  }

  sectionTypes = [
    {
      option: 'One Column',
      slug: 'oneColumn',
      columns: [this.createColumn()]
    },
    {
      option: 'Two Column',
      slug: 'twoColumn',
      columns: [this.createColumn(), this.createColumn()]
    },
    {
      option: 'Three Column',
      slug: 'threeColumn',
      columns: [this.createColumn(), this.createColumn(), this.createColumn()]
    }
  ]

  addSection() {
    this.workExample.content.push({
      option: 'One Column',
      slug: 'oneColumn',
      columnClass: 'col-12',
      columns: [this.createColumn()]
    });
  }

  removeSection(sectionIndex) {
    this.workExample.content.splice(sectionIndex, 1);
  }

  updateSection(newSectionType, sectionIndex) {
    for (const sectionType of this.sectionTypes) {
      if (sectionType.option === newSectionType) {
        this.workExample.content[sectionIndex].columns = _.clone(sectionType.columns);
      }
    }
  }

  createColumn(columnClass?) {
    return {
      columnClass: columnClass || '',
      columnType: '',
      imageUrl: '',
      imageCaption: '',
      content: '',
    };
  }

  generateSectionIndex() {
    if (this.workExample.content.length === 0) {
      return 1;
    }

    if (this.workExample.content.length === 1) {
      return 2;
    }

    const largestIndex = this.workExample.content.reduce(function (a, b) {
      return a.id > b.id ? a.id : b.id;
    });

    return largestIndex + 1;
  }

  insertImage(imageUrl, sectionIndex, columnIndex) {
    this.workExample.content[sectionIndex].columns[columnIndex].imageUrl = imageUrl;
    return this.save();
  }

  save() {
    this.apiService.updateWorkExample(this.workExample)
    .subscribe(workExample => {
      this.workExample = workExample;
      console.log('update successful')
    });
  }
}
