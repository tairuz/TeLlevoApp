import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { NavController } from '@ionic/angular';
import { PlacesService } from '../places-service.service';


declare var google:any;

@Component({
  selector: 'app-maps',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows: any = [];
  
  markers: any = [
    {
      title: "Duoc UC",
      latitude: "-41.47008664034022",
      longitude: "-72.92585148899987"
    }
  ]


  constructor( private placesService: PlacesService) {}

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.showMap();
  }

  addMarkersToMap(markers){
    for (let marker of markers){
      let position = new google.maps.LatiLong(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content">' +
                              '<h2 id="firstHeading" class="firstHeading">' + marker.title + '</h2>' +
                              '<p>Latitude: ' + marker.latitude + '</p>' +
                              '<p>Longitude: ' + marker.longitude + '</p>' +
                            '</div>';

    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  miUbicacion(){
    console.log(localStorage.getItem('latitud'));
    console.log(localStorage.getItem('longitud'));
  }

  
  showMap(){
    //PM: -41.4711808,-72.9667499     PV: -41.3214705,-73.0138899
    const location = new google.maps.LatLng(localStorage.getItem('latitud'),localStorage.getItem('longitud'));


    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    this.addMarkersToMap(this.markers);
  }

}
