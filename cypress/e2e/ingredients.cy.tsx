describe('доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

beforeEach(() => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
  cy.visit('/');
});

describe('Тест добавления ингредиентов из списка в конструктор', () => {
  it('добавление ингредиентов', () => {
    cy.get('li:contains("Мясо бессмертных моллюсков Protostomia")')
      .first()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('li:contains("Краторная булка N-200i")')
      .first()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get(`[data-cy='bun-constructor-container-top']`)
      .should('be.visible')
      .contains('Краторная булка N-200i');
    cy.get(`[data-cy='main-constructor-container']`)
      .should('be.visible')
      .contains('Мясо бессмертных моллюсков Protostomia');
    cy.get(`[data-cy='bun-constructor-container-bottom']`)
      .should('be.visible')
      .contains('Краторная булка N-200i');
  });
});

describe('Тест модальных окон', () => {
  it('открытие модального окна ингредиента', () => {
    cy.get(`[data-cy='ingredientId-643d69a5c3f7b9001cfa093c']`).click();
    cy.get('#modals').should('contain', 'Детали ингредиента');
  });

  it('закрытие по клику на крестик', () => {
    cy.get(`[data-cy='ingredientId-643d69a5c3f7b9001cfa093f']`).click();
    cy.get(`[data-cy='modalCloseButton']`).click();
    cy.get('#modals').should('not.be.visible');
  });

  it('закрытие по клику на оверлей', () => {
    cy.get(`[data-cy='ingredientId-643d69a5c3f7b9001cfa0942']`).click();
    cy.get(`[data-cy='modal-overlay']`).click({ force: true });
    cy.get('#modals').should('not.be.visible');
  });
});

describe('Создание заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', '/api/auth/login', {
      fixture: 'login.json'
    });
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    });
    window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
    cy.setCookie('accessToken', JSON.stringify('accessToken'));
    cy.visit('/');
  });

  it('Тест добавления ингредиентов и отправки заказа', function () {
    cy.get('li:contains("Краторная булка N-200i")')
      .first()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('li:contains("Мясо бессмертных моллюсков Protostomia")')
      .first()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('li:contains("Сыр с астероидной плесенью")')
      .first()
      .find('button')
      .contains('Добавить')
      .click();
    cy.get('li:contains("Соус Spicy-X")')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('button').contains('Оформить заказ').click();

    cy.get('#modals').should('contain', 'идентификатор заказа');
    cy.get('#modals').should('contain', '46474');
    cy.get(`[data-cy='modalCloseButton']`).click();
    cy.get('#modals').should('not.be.visible');

    cy.get(`[data-cy='bun-constructor-container-top']`).should('not.be.exist');
    cy.get(`[data-cy='bun-constructor-container-bottom']`).should(
      'not.be.exist'
    );
    cy.get(`[data-cy='main-constructor-container']`).contains(
      'Выберите начинку'
    );
  });

  afterEach(function () {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });
});
