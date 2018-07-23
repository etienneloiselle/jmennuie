import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
declare var userLatitude: any = 0;
declare var userLongitude: any = 0;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  userPositionMarker: any;
  userMaxRadiusMarker: any;
  userMaxRadius: number = 50;
  userBound: any;
 

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: {lat: this.userLatitude, lng: this.userLongitude}
    });

    this.userPositionMarker = new google.maps.Marker({
      position: {lat: this.userLatitude, lng: this.userLongitude},
      map: this.map,
      title: 'Hello World!'
    });

    this.userMaxRadiusMarker = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: {lat: this.userLatitude, lng: this.userLongitude},
      radius: this.userMaxRadius*1000
    });
  }

  setMaxRadius(maxRadius){
    this.userMaxRadius = maxRadius;
    console.log("Set Max radius: " + maxRadius + "km");
    this.userMaxRadiusMarker.setRadius(this.userMaxRadius*1000);
    
  }

  getRandomCity(){
    console.log("Get random city !"); 
    console.log(this.userMaxRadiusMarker.getBounds());

    var poiRequest = {
      location: {lat: this.userLatitude, lng: this.userLongitude},
      radius: '500',
      type: ['restaurant']
    };

    /*service = new google.maps.places.PlacesService(map);*/
    /*service.nearbySearch(poiRequest, callback);*/
    /*service.nearbySearch(poiRequest, function(){
      console.log("ok");
    });*/
  }



  constructor(public navCtrl: NavController, public platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {

      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp.coords.latitude);
        console.log(resp.coords.longitude);
        this.userLatitude = resp.coords.latitude;
        this.userLongitude = resp.coords.longitude;

        this.initMap();
        
       }).catch((error) => {
         console.log('Error getting location', error);
       });

    });
  }

}
