import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PokemonFormComponent } from './pokemon-form.component';
import { PokemonListService } from 'src/services/pokemon-list.service';
import { PokemonApiService } from 'src/services/pokemon-api.service';
import { of } from 'rxjs';

describe('PokemonFormComponent', () => {
  let component: PokemonFormComponent;
  let fixture: ComponentFixture<PokemonFormComponent>;
  let listService: PokemonListService;
  let apiService: PokemonApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonFormComponent ],
      imports: [HttpClientTestingModule],
      providers: [PokemonListService, PokemonApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFormComponent);
    component = fixture.componentInstance;
    listService = TestBed.inject(PokemonListService);
    apiService = TestBed.inject(PokemonApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change title if editing', () => {
    component.pokemonToEdit = {
      id: 1,
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    };
    component.ngOnInit();
    expect(component.title).toEqual("Editar Pokemon");
  });

  it('should hide form onCancel', () => {
    spyOn(listService.showForm, 'next');
    component.onCancel();
    expect(listService.showForm.next).toHaveBeenCalledWith(false);
  });

  it('should mark form as touched if invalid', () => {
    component.onSubmit();
    expect(component.pokemonForm.touched).toBeTrue();
  });

  it('should call update pokemon if valid and editing', () => {
    spyOn(apiService, 'updatePokemon').and.returnValue(of(true));
    spyOn(component.requestDone, 'emit');
    const newPokemon = {
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    };
    component.pokemonForm.setValue(newPokemon);
    component.pokemonToEdit = {...newPokemon, id: 1};
    component.onSubmit();
    expect(component.requestDone.emit).toHaveBeenCalledWith(true);
  });

  it('should call create pokemon if valid and not editing', () => {
    spyOn(apiService, 'createPokemon').and.returnValue(of(true));
    spyOn(component.requestDone, 'emit');
    const newPokemon = {
      name: "test",
      image: "url",
      attack: 10,
      defense: 10
    };
    component.pokemonForm.setValue(newPokemon);
    component.onSubmit();
    expect(component.requestDone.emit).toHaveBeenCalledWith(true);
  });
});
