describe('add player', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/players');
    cy.viewport('iphone-xr');
  });

  it('should navigate to the new player screen', () => {
    cy.get("[data-testid='add-player-button'").should('be.visible');
    cy.get("[data-testid='add-player-button'").click();
    cy.url().should('equal', 'http://localhost:8100/players/new');
  });
});
