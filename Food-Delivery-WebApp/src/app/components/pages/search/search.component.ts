import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchTerm=''
  constructor(private activateRoute:ActivatedRoute, private route:Router){


  }
  ngOnInit(): void {
  
this.activateRoute.params.subscribe((params)=>{
if(params['searchTerm'])
  this.searchTerm=params['searchTerm']


})

  }


  search(searchTerm:string){

    if(searchTerm)
    // this.route.navigateByUrl('/search/'+searchTerm)
    this.route.navigate(['/search',searchTerm])
    else
    this.route.navigate(['/'])
  
  }

}
