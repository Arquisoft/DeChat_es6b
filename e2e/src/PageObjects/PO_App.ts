import { browser, by, element, until } from 'protractor';

export class AppPage {

  public navigateTo() {
    return browser.get('/');
    //return browser.get('http://localhost:4200/ ');
  }

  public navigateToUrl(text: string) {
    return browser.get(text);
  }

  public enterSearchInput(text: string) {
    return element(by.css('input[aria-label="search"]'))
      .sendKeys(text);
  }

  public getSearchResultItems() {
    const condition = until.elementsLocated(by.css('.search-results .search-result-item'));

    return browser.wait(condition, 5000);
  }

  public getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  public getHomeText(){
    return element(by.id('homeChatTitle')).getText();
  }

}