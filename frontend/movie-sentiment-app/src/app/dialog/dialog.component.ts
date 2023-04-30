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
  public chartOptions2: Partial<ChartOptions> | any;
  public posts: any;
  public possibleSentiments = ["positive", "negative"];
  public percentagePositive: number = 0;
  public percentageNegative: number = 0;
  public positives: number = 0;
  public negatives: number = 0;
  public message = "";
  
  constructor(private dialogService: DialogService, private fileUploadService: FileUploadService) { 
    this.posts = this.fileUploadService.posts;
    // Calculate the percentage of positive and negative posts
    this.percentagePositive = this.posts.filter((post: any) => post.sentiment === this.possibleSentiments[0]).length / this.posts.length * 100;
    this.percentageNegative = this.posts.filter((post: any) => post.sentiment === this.possibleSentiments[1]).length / this.posts.length * 100;
    //Round the percentage to 2 decimals
    this.percentagePositive = Math.round(this.percentagePositive * 100) / 100;
    this.percentageNegative = Math.round(this.percentageNegative * 100) / 100;

    // Count the number of positive and negative posts
    this.positives = this.posts.filter((post: any) => post.sentiment === this.possibleSentiments[0]).length;
    this.negatives = this.posts.filter((post: any) => post.sentiment === this.possibleSentiments[1]).length;
    
    //Set the message according to the percentage of positive posts
    if (this.percentagePositive === 0) {
      this.message = "Según el análisis realizado, el " + this.percentagePositive + "% de las personas que opinaron de forma positiva sobre la película es menor a la negativa. Aunque sean bastantes comentarios negativos se sugiere hacer retrospectiva sobre estos y así obtener información importante para tener en cuenta en próximos proyectos.";
    } else if (this.percentagePositive < 50) {
      this.message = "Según el análisis realizado, el " + this.percentagePositive + "% de las personas que opinaron de forma positiva sobre la película es menor a la negativa. Por lo anterior, se sugiere realizar una revisión a la decisiones tomadas que afectaron a aumentar el porcentaje de comentarios negativos con el fin tenerlos en cuenta para próximos proyectos.  Sin embargo, no hay que obviar los comentarios positivos, ya que se puede sacar retroalimentación de estos.";
    }
    else if (this.percentagePositive === 50) {
      this.message = "Según el análisis realizado, el " + this.percentagePositive + "% de las personas que opinaron de forma positiva sobre la película es igual que las negativas. Por lo anterior, se sugiere realizar una revisión a la decisiones tomadas que afectaron a la división de opiniones de los espectadores y reforzar aquellas cosas positivas comentadas en próximos proyectos."
    }
    else if (this.percentagePositive > 50) {
      this.message = "Según el análisis realizado, el " + this.percentagePositive + "% de las personas opinaron de forma positiva sobre la película. Lo que significa que se hizo un buen trabajo en el proyecto. Sin embargo, el resto opinó de forma negativa por lo que se debe evaluar que factores ayudaron en este resultado y a la población a la cual se dirige."
    }
    else {
      this.message = "Según el análisis realizado, el " + this.percentagePositive + "% de las personas opinaron de forma positiva sobre la película. Lo que significa que se hizo un gran trabajo en el proyecto."
    } 

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
      this.chartOptions2 = {
        series: [{
          data: [this.positives, this.negatives]
        }],
        chart: {
          width: 380,
          type: "bar"
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
