import { browser, by, element, until } from 'protractor';

export class AppPage {

  public navigateTo() {
    return browser.get('/');
    //return browser.get('http://localhost:4200/ ');
  }

  public clickGoLogin() {
    element(by.xpath("/html/body/app-root/app-login/div/div[2]/ng-select/div")).click();
    element(by.id("btnGo")).click();
  }

  public chatView() {
    return element(by.id("loadChat")).click();
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

  public getSearchResultItems() {
    return element(by.className('chat_ib')).getText();
  }

  public getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  public getHomeText(){
    return element(by.id('homeChatTitle')).getText();
  }

}