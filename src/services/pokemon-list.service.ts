import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Pokemon } from "src/app/pokemon-table/pokemon.model";

@Injectable({
    providedIn: 'root'
})
export class PokemonListService{
    searchTerm = new BehaviorSubject<string>('');
    showForm = new BehaviorSubject<boolean>(false);
    pokemonToEdit = new Subject<Pokemon>();
}
