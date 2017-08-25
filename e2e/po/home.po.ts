import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';

export class HomePage extends AppPage {
  navigateTo() {
    return browser.get('/home');
  }

  set name(name) {
    element(by.css('#name')).sendKeys(name);
  }

  submit () {
    element(by.css('#submit')).click();
  }
}
