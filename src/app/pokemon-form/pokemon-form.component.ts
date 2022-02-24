import { Pokemon } from './../pokemon-table/pokemon.model';
import { PokemonApiService } from './../../services/pokemon-api.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  types: string[] = ["Water", "Fire", "Normal", "Bug", "Poison"];
  pokemonForm!: FormGroup;

  @Input() pokemonToEdit: Pokemon | null = null;
  @Output() requestDone = new EventEmitter<boolean>();

  constructor(private pokemonApiService: PokemonApiService) { }

  ngOnInit(): void {
    this.pokemonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      hp: new FormControl(null, [Validators.required]),
      attack: new FormControl(null, [Validators.required]),
      defense: new FormControl(null, [Validators.required])
    });

    if(this.pokemonToEdit){
      this.pokemonForm.setValue({
        name: this.pokemonToEdit.name,
        image: this.pokemonToEdit.image,
        type: this.pokemonToEdit.type,
        hp: this.pokemonToEdit.hp,
        attack: this.pokemonToEdit.attack,
        defense: this.pokemonToEdit.defense
      })
    }
  }

  onSubmit(){
    const newPokemon: Pokemon = {
      ...this.pokemonForm.value,
      idAuthor: 2
    };
    if(this.pokemonToEdit){
      this.pokemonApiService.updatePokemon(this.pokemonToEdit.id, newPokemon).subscribe(response => {
        alert("Pokemon actualizado exitosamente");
        this.requestDone.emit(true);
      })
    }else{
      this.pokemonApiService.createPokemon(newPokemon).subscribe(response => {
        alert("Pokemon creado exitosamente");
        this.requestDone.emit(true);
      });
    }
  }

}
