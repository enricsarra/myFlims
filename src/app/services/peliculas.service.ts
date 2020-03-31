import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
 peliculas: any[] = [];
  /* private apikey: string = "0dbc783e00ec2a6589a320202d5f0113"; */
  private apikey: string = 'b157d375adeb7860d2574fc3587e23e6';
  private urlMoviedb = 'https://api.themoviedb.org/3/';
  constructor(private http : HttpClient) { }

getCartelera() {
  const desde = new Date();
  const hasta = new Date();
  hasta.setDate(hasta.getDate() + 7);
  const desdeStr = desde.toISOString().substring(0, 10);
  const hastaStr = hasta.toISOString().substring(0, 10);

   // console.log(desdeStr);
   // console.log(hastaStr);
  // tslint:disable-next-line: max-line-length

  // tslint:disable-next-line: max-line-length
  const url = `${ this.urlMoviedb }discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apikey}&language=es`;
  return this.http.get( url )
                    .pipe(map( (res: any) => res.results));

}

  getPopulares(){

    const url = `${ this.urlMoviedb }discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es`;
    // console.log('url: ', url);

    return this.http.get( url )
                    .pipe(map( (res: any) => res.results));
  }

 getPopularesNinos() {
    // tslint:disable-next-line: max-line-length
    // let url = `${ this.urlMoviedb }discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es`;
    // tslint:disable-next-line: max-line-length
    const url = `${ this.urlMoviedb }discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es`;
    return this.http.get( url )
                    .pipe(map( (res: any) => res.results));
  }
  buscarPelicula( texto: string ) {
    const url = `${ this.urlMoviedb }search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es`;

    return this.http.get( url ).pipe(map( (res: any)  => {
    this.peliculas = res.results;
    console.log(this.peliculas);
    return res.results; }));
}


  getPelicula( id: string) {
    const url = `${ this.urlMoviedb }movie/${id}?api_key=${this.apikey}&language=es`;

    return this.http.get( url )
                    .pipe(map( (res: any) => res));
  }


}
