import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation?: [number, number];
  get isUserLocationReady(): boolean{
    return !!this.useLocation;
  }

  constructor() {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number, number]> {

    return new Promise( (resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation= [ coords.latitude, coords.longitude ];
          localStorage.setItem('latitud',JSON.stringify(coords.latitude));
          localStorage.setItem('longitud',JSON.stringify(coords.longitude));
          resolve( this.useLocation );
          console.log(this.useLocation);
        },
        ( err ) => {
          alert('No se pudo obtener la geolocalizacion')
          console.log(err);
          reject();
        }
      );
    });

  }
}


