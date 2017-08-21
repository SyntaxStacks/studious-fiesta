import { browser } from 'protractor';
import { HomePage } from '../po/home.po';

describe('sf Home', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should route to lobby after entering name', () => {
    page.navigateTo();
    page.name = 'Bobby';
    page.submit();
    expect(browser.getCurrentUrl()).toContain('lobby');
  });
});
