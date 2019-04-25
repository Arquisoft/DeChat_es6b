import { browser, by, element, until } from 'protractor';

export class AppPage {

  public clickGoLogin() {
    element(by.xpath("/html/body/app-root/app-login/div/div[2]/ng-select/div")).click();
    element(by.id("btnGo")).click();
  }

  public navigateToUrl(text: string) {
    return browser.get(text);
  }

  public pressButton(id: string) {
    return element(by.id(id)).click;
  }

  public enterSearchInput(text: string) {
    return element(by.id('input_search')).sendKeys(text);
  }

  public getHtmlItemText(id: string) {
    return element(by.id(id)).getText();
  }

  public login() {
    throw new Error("Method not implemented.");
  }

  //------------------------------------------------------------------------------------------
  public getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  public getSearchResultItems() {
    const condition = until.elementsLocated(by.css('.search-results .search-result-item'));

    return browser.wait(condition, 5000);
  }

}