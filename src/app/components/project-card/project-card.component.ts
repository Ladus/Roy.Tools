import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

@Input()
public Title: string | undefined;

@Input()
public Category: string | undefined;

@Input()
public Visibility: string | undefined;


  constructor() { }

  ngOnInit() {
  }

}
