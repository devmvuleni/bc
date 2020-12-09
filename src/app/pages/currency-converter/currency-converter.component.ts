import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  currencyValue: number;
  selectedFromValue: number;
  selectedToValue: number;
  currencies: any;
  exchangedAmount: number;
  graphData;
  showGraph: boolean;
  chartOption: any;
  matSelect: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRates().
        subscribe(data => {
          this.renderCurrencies(data);
        });

    this.graphData = [];

  }

  renderCurrencies(availableData){
    this.currencies = availableData.rates;
  }

  updateExchange(){
    this.graphData = [];
    if (typeof this.currencyValue !== 'undefined' && typeof this.selectedFromValue !== 'undefined' && typeof this.selectedToValue !== 'undefined'){
       this.exchangedAmount = this.currencyValue / this.selectedFromValue * this.selectedToValue;
    }

    if(this.exchangedAmount){

      this.apiService.getHistoryByWeek('THB').
      subscribe(data => {
        this.deepIterator(data['rates']);
      });
    }
    }

    deepIterator(target) {
      if (typeof target === 'object') {
        for (const key in target) {
          this.deepIterator(target[key]);
        }
      } else {
        this.graphData.push(target);

      }
      this.updateChartData();
      this.showGraph = true;
      console.log( this.graphData);
    }

    updateChartData(){
      this.chartOption = {
        xAxis: {
          type: 'category',
          data: ['', '', '', '', ''],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.graphData,
            type: 'line',
          },
        ],
      };
    }

}
