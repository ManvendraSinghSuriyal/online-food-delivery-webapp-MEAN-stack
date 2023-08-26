import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LiveLocationService } from 'src/app/services/live-location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnChanges{

@ViewChild('map',{static:true}) mapRef!:ElementRef

@Input("order")order!:Order

@Input()
unchangeable = false;

// private DEFAULTLATLNG:LatLngTuple=[30.0869, 78.2676]

private DEFAULTLATLNG:LatLngTuple=[13.75, 21.62]
private MARKER_ZOOM=16

private readonly MARKER_ICON = icon({
  iconUrl:
    '/assets/images/location.png',
  iconSize: [42, 42],
  iconAnchor: [21, 42],
});

currentMarker!:Marker;
map!:Map

constructor(private liveLocationService:LiveLocationService){


}

  ngOnChanges(): void {

    if(!this.order) return;
    this.showMap()

    if(this.unchangeable && this.addressLatLng){
      // console.log(this.order)
      this.showLocationOnReadonlyMode();
    }
  }


showMap(){
if(this.map)
return;

this.map=map(this.mapRef.nativeElement,{
attributionControl:false

}).setView(this.DEFAULTLATLNG,12)

tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
this.map.on('click', (e:LeafletMouseEvent) => {
  this.setMarker(e.latlng);
})

}


search(){
this.liveLocationService.getCurrentLocation().subscribe({
  next:(latlng)=>{
    console.log(latlng)
    
   this.map.setView(latlng,this.MARKER_ZOOM)
   this.setMarker(latlng)
  }
})
}


setMarker(latlng:LatLngExpression){
 
  this.addressLatLng = latlng as LatLng;
  if(this.currentMarker)
  {
    this.currentMarker.setLatLng(latlng);
    return;
  }

  this.currentMarker = marker(latlng, {
    draggable: true,
    icon: this.MARKER_ICON
  }).addTo(this.map);


  this.currentMarker.on('dragend', () => {
    this.addressLatLng = this.currentMarker.getLatLng();
  })
}



set addressLatLng(latlng: LatLng){
  if(!latlng.lat.toFixed) return;

  latlng.lat = parseFloat(latlng.lat.toFixed(8));
  latlng.lng = parseFloat(latlng.lng.toFixed(8));
  this.order.addressLatLng = latlng;
  console.log(this.order.addressLatLng);
  
}



showLocationOnReadonlyMode() {
  const readOnlyMap = this.map;
  this.setMarker(this.addressLatLng);
  
  readOnlyMap.setView(this.addressLatLng, this.MARKER_ZOOM);

  readOnlyMap.dragging.disable();
  readOnlyMap.touchZoom.disable();
  readOnlyMap.doubleClickZoom.disable();
  readOnlyMap.scrollWheelZoom.disable();
  readOnlyMap.boxZoom.disable();
  readOnlyMap.keyboard.disable();
  readOnlyMap.off('click');
  readOnlyMap.tap?.disable();
  this.currentMarker.dragging?.disable();
}

get addressLatLng(){
 return this.order.addressLatLng!
}

}
