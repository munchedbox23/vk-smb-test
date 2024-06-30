describe('checking the functionality of working with movie cards', () => {
  beforeEach(() => {
    cy.intercept('GET', '/movies', {
      fixture: 'movies.json'
    });
    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    });
    cy.visit('/');
  })

  it('should render the movies page correctly', () => {
      cy.contains('Fantasmas');
    });
    
  
  it('should filter movies by search term "Fantasmas"', () => {
  // Вводим "Fantasmas" в input поиска
  cy.get('input[name="search"]').type('Fantasmas');
  // Ждем немного, чтобы дать время на обновление списка фильмов
  cy.wait(500);
// Проверяем, что на странице отображается только карточка с названием "Fantasmas"
  cy.get('[data-cy="movie-card"]').as('movieCard').should('have.length', 1);
  cy.get('@movieCard').contains('Fantasmas').should('be.visible');
  // Проверяем, что другие карточки не отображаются
  cy.get('@movieCard').contains('Other Movie Title').should('not.exist');
  });

  it('should add movie to favorites and check it on the favorites page', () => {
    cy.get('input[name="search"]').type('Fantasmas');
    cy.wait(500);
    cy.get('[data-cy="movie-card"]').first().within(() => {
      cy.get('[data-cy="favorite-button"]').click();
    });
    cy.visit('/profile/favorites');
    cy.get('[data-cy="movie-card"]').contains('Fantasmas').should('be.visible');
  });

  it('should filter movies by genre, year, and rating', () => {
    cy.get('[data-cy="filter-form"] [role="combobox"]', { timeout: 10000 }).should('be.visible');

    cy.get('[data-cy="filter-form"] [role="combobox"]').first().click({ force: true });
    cy.contains('короткометражка').click({ force: true });
    cy.contains('документальный').click({ force: true });

    cy.get('[data-cy="filter-form"] [role="combobox"]').eq(1).click({ force: true });
    cy.contains('1990').click({ force: true });

    cy.get('[data-cy="filter-form"]').contains('Применить').click({ force: true });
    cy.wait(500); 

    cy.get('[data-cy="movie-card"]').contains('Сказка').should('be.visible');
  });
});


