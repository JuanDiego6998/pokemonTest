import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Pokemon } from "src/app/pokemon-table/pokemon.model";
import { PokemonApiService } from "./pokemon-api.service";

describe('PokemonApiService', () => {
  let service: PokemonApiService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [PokemonApiService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(PokemonApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add id in getPokemons', () => {
    spyOn(http, 'get');
    const id = 'test';
    service.getPokemons(id);
    expect(http.get).toHaveBeenCalledWith(service.url + `/${id}`);
  });

  it('call post onCreatePokemon', () => {
    spyOn(http, 'post');
    const newPokemon: Pokemon = {
      id: 1,
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    }
    service.createPokemon(newPokemon);
    expect(http.post).toHaveBeenCalledWith(service.url, newPokemon);
  });

  it('call put on updatePokemon', () => {
    spyOn(http, 'put');
    const newPokemon: Pokemon = {
      id: 1,
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    }
    service.updatePokemon(newPokemon.id, newPokemon);
    expect(http.put).toHaveBeenCalledWith(service.url + `/${newPokemon.id}`, newPokemon);
  });

  it('call delete on deletePokemon', () => {
    spyOn(http, 'delete');
    const id = 1;
    service.deletePokemon(id);
    expect(http.delete).toHaveBeenCalledWith(service.url + `/${id}`);
  });
});
