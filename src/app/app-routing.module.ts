import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './pages/currency-converter/currency-converter.component';
import { UnitConverterComponent } from './pages/unit-converter/unit-converter.component';

const routes: Routes = [
  { path: '', component: CurrencyConverterComponent },
  { path: 'currency-converter', component: CurrencyConverterComponent },
  { path: 'unit-converter', component: UnitConverterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
