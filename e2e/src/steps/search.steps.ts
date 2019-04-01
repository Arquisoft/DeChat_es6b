
import { expect } from 'chai';
import { AppPage } from '../PageObjects/PO_App';
import { Given, Then, When, Before } from 'cucumber';

  let app: AppPage;

  Before(() => {
    app = new AppPage();
  });

  Given('I am on the angular.io site',
    () => app.navigateToUrl('https://angular.io'));

  When('I type {string} into the search input field',
    (text: string) => app.enterSearchInput(text));

  Then('I should see some results in the search overlay',
    () => app.getSearchResultItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));