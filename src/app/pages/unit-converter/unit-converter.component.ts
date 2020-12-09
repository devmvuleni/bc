import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-unit-converter',
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent implements OnInit {
  fromUnitValue: number;
  toUnitValue: number;
  selectedFromUnit: number;
  selectedToUnit: number;
  units: any;
  convertedUnit: number;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUnits().
        subscribe(data => {
          this.populateUnits(data);
        });
  }

  populateUnits(renderedUnits){
    this.units = renderedUnits;
    console.log(this.units);
  }

  updateMeasurementFromRight(){
    switch (true) {
      case (this.selectedFromUnit == 1):
          console.log('meter to another');
          this.fromUnitValue = this.toUnitValue * this.selectedToUnit;
          break;
      case (this.selectedToUnit == 1):
        console.log('any to meter');
        this.fromUnitValue = this.toUnitValue / this.selectedFromUnit;
          break;
      case (this.selectedFromUnit !== 1 && this.selectedToUnit !== 1):
        console.log('any to any');
        this.fromUnitValue = this.toUnitValue / this.selectedFromUnit * this.selectedToUnit;
          break;
    }
  }

  updateMeasurement(){
    this.toUnitValue = undefined;
    switch (true) {
      case (this.selectedFromUnit == 1):
          console.log('meter to another');
          this.convertedUnit = this.fromUnitValue / this.selectedToUnit;
          break;
      case (this.selectedToUnit == 1):
        console.log('any to meter');
        this.convertedUnit = this.fromUnitValue * this.selectedFromUnit;
          break;
      case (this.selectedFromUnit !== 1 && this.selectedToUnit !== 1):
        console.log('any to any');
        this.convertedUnit = this.fromUnitValue * this.selectedFromUnit / this.selectedToUnit;
          break;
    }
  }
}
