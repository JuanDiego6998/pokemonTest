import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonTableComponent,
    PokemonFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
