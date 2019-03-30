import { expect } from 'chai';
import { AppPage } from './PO_App';
import { Given, Before, Then, When } from 'cucumber';
import { and } from '@angular/router/src/utils/collection';


  let app: AppPage;

  Before(() => {
    app = new AppPage();
  });

  Given('I am in the card view',
    () => app.navigateToUrl('http://localhost:4200/')
  );

  When('I am logged with my Inrupt account', () => {
      //logeo
      //1.Click en el icono de logeo
      //2.Rellenar campos formulario
  });

  When('I type "{term}" into the search input field',
    (text: string) => app.enterSearchInput(text));

  Then('I should see some results in the search overlay',
    () => app.getSearchResultItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));