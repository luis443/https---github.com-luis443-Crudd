import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  listaUrl=[
    {
      title:'home',
      url:'/home'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
