import { AppPage } from '../pages/app.po';
import {Given, Then, When} from 'cucumber';
import { expect } from 'chai';

let page: AppPage;

/** Before(() => {
  page = new AppPage();
});*/

page = new AppPage();

Given('I want to go to the home view', () => page.navigateTo());

When('I do nothing', () => {});

Then('I should see the title', () => page.getHomeText().then(elems => expect(elems.length).to.be.greaterThan(0)));
