import { Component, ViewChild } from '@angular/core';
import { DialogService } from './dialog.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { FileUploadService } from '../file-upload/file-upload.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public posts: any;
  public possibleSentiments = ["positive", "negative"];
  public percentagePositive: number = 0;
  public percentageNegative: number = 0;
  
  constructor(private dialogService: DialogService, private fileUploadService: FileUploadService) { 
    this.posts = this.fileUploadService.posts;
    // Calculate the percentage of positive and negative posts
    this.percentagePositive = this.posts.filter((post: any) => post.sentiment === this.possibleSentiments[0]).length / this.posts.length * 100;
    this.percentageNegative = this.posts.filter((post: any) => post.sentiment === this.possibleSentiments[1]).length / this.posts.length * 100;
      this.chartOptions = {
        series: [this.percentagePositive, this.percentageNegative],
        chart: {
          width: 380,
          type: "pie"
        },
        labels: ["Positive", "Negative"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
  }

  openDialog(): void {
    this.dialogService.openDialog();
  }

}
