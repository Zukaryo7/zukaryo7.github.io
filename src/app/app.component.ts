import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  ngAfterViewInit(){
    this.loadScript();
  }

  constructor(private translate: TranslateService) {
    let lang = this.getLanguage();
    translate.setDefaultLang(lang);
    this.setLanguage(lang);
  }

  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/js/theme.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.setLanguage(lang);
  }

  getLanguage():string{
    if (localStorage) return localStorage['language'] || "";
    else return "fr";
  }

  setLanguage(language: string){
      if (localStorage) localStorage['language'] = language;
  }

}
