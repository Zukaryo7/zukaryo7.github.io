import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngAfterViewInit(){
    this.loadScript();

}

  constructor() { }

  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/js/theme.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
}

}
