import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('name') name;
  public error: string;

  constructor(
    private Router: Router
  ) { }

  ngOnInit() {
  }

  lobby() {
    const name = this.name.nativeElement.value;
    if (name.length === 0) {
      this.error = 'Enter Name';
      return;
    }

    localStorage.setItem('name', name);
    this.Router.navigate(['lobby']);
  }

  play() {
    const name = this.name.nativeElement.value;
    if (name.length === 0) {
      this.error = 'Enter Name';
      return;
    }

    localStorage.setItem('name', name);
    this.Router.navigate(['game']);
  }

}
