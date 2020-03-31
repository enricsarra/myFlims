import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  buscar = '';

  constructor(public _ps: PeliculasService,
              public route: ActivatedRoute ) {

    this.route.params.subscribe( parametros =>{
      console.log(parametros);
      if ( parametros.texto ) {
        this.buscar = parametros.texto;
        console.log('primer buscarPelicula');
        this.buscarPelicula();
        console.log('segon buscarPelicula', this._ps.peliculas);
      }
    })

  }

  ngOnInit() {
  }

  buscarPelicula() {
    if ( this.buscar.length === 0) {
      return;
    }
    console.log('xxxxx buscarPelicula', this._ps.peliculas);
    this._ps.buscarPelicula( this.buscar )
        .subscribe();

  }
  

}
