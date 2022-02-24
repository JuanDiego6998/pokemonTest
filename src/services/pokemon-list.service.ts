import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PokemonListService{
    searchTerm = new BehaviorSubject<string>('');
    showForm = new BehaviorSubject<boolean>(false);
}