import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonTableComponent } from './pokemon-table.component';
import { PokemonListService } from 'src/services/pokemon-list.service';
import { PokemonApiService } from 'src/services/pokemon-api.service';
import { of } from 'rxjs';
import { Pokemon } from './pokemon.model';

describe('PokemonTableComponent', () => {
  let component: PokemonTableComponent;
  let fixture: ComponentFixture<PokemonTableComponent>;
  let listService: PokemonListService;
  let apiService: PokemonApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonTableComponent ],
      imports: [HttpClientTestingModule],
      providers: [PokemonListService, PokemonApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTableComponent);
    component = fixture.componentInstance;
    listService = TestBed.inject(PokemonListService);
    apiService = TestBed.inject(PokemonApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter pokemons if searchTerm', () => {
    component.pokemons = [
      {
        id: 1,
        name: "test",
        image: "url",
        attack: 10,
        defense: 10
      },
      {
        id: 1,
        name: "example",
        image: "url",
        attack: 10,
        defense: 10
      }
    ];
    component.ngOnInit();
    listService.searchTerm.next('test');
    expect(component.pokemonsToDisplay).toEqual([
      {
        id: 1,
        name: "test",
        image: "url",
        attack: 10,
        defense: 10
      }
    ]);
  });

  it('should get list of pokemons on loadPokemons', () => {
    const pokemonList = [
      {
        id: 1,
        name: "test",
        image: "url",
        attack: 10,
        defense: 10
      },
      {
        id: 1,
        name: "example",
        image: "url",
        attack: 10,
        defense: 10
      }
    ];
    spyOn(apiService, 'getPokemons').and.returnValue(of(pokemonList));
    component.loadPokemons();
    expect(component.pokemons).toEqual(pokemonList);
    expect(component.pokemonsToDisplay).toEqual(pokemonList);
  });

  it('should show form and emit pokemon onEdit', () => {
    spyOn(listService.showForm, 'next');
    spyOn(component.idToEdit, 'emit');
    const pokemon: Pokemon = {
      id: 1,
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    };
    component.onEdit(pokemon);
    expect(listService.showForm.next).toHaveBeenCalledWith(true);
    expect(component.idToEdit.emit).toHaveBeenCalledWith(pokemon);
  });

  it('should call loadPokemons onDelete', () => {
    spyOn(apiService, 'deletePokemon').and.returnValue(of(true));
    spyOn(component, 'loadPokemons');
    const pokemon: Pokemon = {
      id: 1,
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    };
    component.onDelete(pokemon);
    expect(component.loadPokemons).toHaveBeenCalled();
  });
});
