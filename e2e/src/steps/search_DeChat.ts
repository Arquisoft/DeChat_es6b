import { expect } from 'chai';
import { AppPage } from '../PageObjects/PO_App';
import { Given, Before, Then, When } from 'cucumber';
import { and } from '@angular/router/src/utils/collection';


  let app: AppPage;

  Before(() => {
    app = new AppPage();
  });

  Given('I am logged and in the chat view',
    () => {
      //login view
      app.navigateToUrl('https://arquisoft.github.io/DeChat_es6b/')
      //select solidcommunity pod
      app.clickGoLogin();
      //log in pod
      app.login();
    }
  );

  When('I access to the Chat View', () => {
    app.pressButton("loadChat");
  });

  When('I write in the search field {string}',
    (text: string) => app.enterSearchInput(text));

  When('I click on the button next to the search field',
    () =>app.pressButton("searchButton"));

  Then('I should see my chat with {string}',
    (text: string) => {
      // algo asi asertos typescript?? assert(text, app.getSearchResultItems());
    });