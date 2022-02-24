import { PokemonTableComponent } from './pokemon-table/pokemon-table.component';
import { PokemonListService } from './../services/pokemon-list.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon } from './pokemon-table/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Listado de Pokemon';
  searchTerm = '';
  showForm = false;
  pokemonToEdit: Pokemon | null = null;

  @ViewChild(PokemonTableComponent) pokemonTableComponent!: PokemonTableComponent;

  constructor(private pokemonListService: PokemonListService){}

  ngOnInit(): void {
      this.pokemonListService.showForm.subscribe(show => this.showForm = show);
  }

  onSearch(){
    this.pokemonListService.searchTerm.next(this.searchTerm);
  }

  onCreateNew(){
    this.showForm = true;
  }

  onEdit(pokemon: Pokemon){
    this.pokemonToEdit = pokemon;
  }

  reloadPokemons(event: any){
    if(event === true){
      this.pokemonTableComponent.loadPokemons();
      this.pokemonListService.showForm.next(false);
    }
  }
}
