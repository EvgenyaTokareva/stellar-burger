import Cypress from 'cypress';
const URL_API = 'https://norma.nomoreparties.space/api';
const ID_BUN = '643d69a5c3f7b9001cfa093e';
const ID_MAIN = '643d69a5c3f7b9001cfa093d';

beforeEach(() => {
  cy.intercept('POST', `${URL_API}/auth/login`, {
    fixture: 'user.json'
  });
  cy.intercept('GET', `${URL_API}/auth/user`, { fixture: 'user.json' });
  cy.intercept('POST', `${URL_API}/orders`, {
    fixture: 'order-burger.json'
  });  
  cy.intercept('GET', `${URL_API}/ingredients`, {
    fixture: 'ingredients.json'
  });
});

describe('проверка работы ингредиентов', () => {
  it('проверка работы модального окна', () => {
    cy.get(`[data-cy=${ID_MAIN}]`).click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').should('be.not.empty');
  });
});

  it('проверка добавления ингредиента', () => {
    cy.get(`[data-cy=${ID_MAIN}]`)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get(`[data-cy=${ID_MAIN}]`)
      .find('.counter__num')
      .should('contain', '1');
  });

describe('проверка оформления заказа', () => {
  it('проверка оформления заказа', () => {
    cy.get(`[data-cy=${ID_MAIN}]`)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get(`[data-cy=${ID_BUN}]`)
      .children('button')
      .contains('Добавить')
      .click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get('#modals').find('h2').contains('41304');
    cy.get('#modals').find('button').click();
    cy.get('[data-cy=burger-container]').find('li').should('not.exist');
  });
});
