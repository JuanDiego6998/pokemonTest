import { PokemonListService } from './../../services/pokemon-list.service';
import { Pokemon } from './pokemon.model';
import { PokemonApiService } from './../../services/pokemon-api.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  pokemons: Pokemon[] = [];
  displayedColumns: string[] = ["name", "image", "attack", "defense", "actions"];
  pokemonsToDisplay: Pokemon[] = [];

  @Output() idToEdit = new EventEmitter<Pokemon>();

  constructor(private pokemonApiService: PokemonApiService, private pokemonListService: PokemonListService) { }

  ngOnInit(): void {
    this.loadPokemons();
    this.pokemonListService.searchTerm.subscribe(term => {
      if (term) {
        this.pokemonsToDisplay = this.pokemons.filter(pokemon => pokemon.name.toUpperCase().includes(term.toUpperCase()));
      } else {
        this.pokemonsToDisplay = this.pokemons;
      }
    });
  }

  loadPokemons(){
    this.pokemonApiService.getPokemons().subscribe((response: any) => {
      this.pokemons = response;
      this.pokemonsToDisplay = this.pokemons;
    });
  }

  onEdit(pokemon: Pokemon) {
    this.pokemonListService.showForm.next(true);
    this.idToEdit.emit(pokemon);
  }

  onDelete(pokemon: Pokemon) {
    this.pokemonApiService.deletePokemon(pokemon.id).subscribe(response => {
      alert("Pokemon eliminado exitosamente");
      this.loadPokemons();
    });
  }
}
