import { Pokemon } from './../app/pokemon-table/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PokemonApiService{
    url = environment.pokemonApiUrl;

    constructor(private http: HttpClient){}

    getPokemons(id = ''){
        if(id){
            id = `/${id}`;
        }

        return this.http.get(this.url + id, {params: {idAuthor: 3}});
    }

    createPokemon(pokemon: Pokemon){
        return this.http.post(this.url, pokemon);
    }

    updatePokemon(id: number, pokemon: Pokemon){
        return this.http.put(this.url + `/${id}`, pokemon);
    }

    deletePokemon(id: number){
        return this.http.delete(this.url + `/${id}`);
    }
}
