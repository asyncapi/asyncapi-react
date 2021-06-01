describe('Standalone bundle', () => {
  describe('.render()', () => {
    before(() => {
      cy.visit('e2e/standalone.html');
    });

    it('Container should exist', () => {
      cy.get('#spec').should('exist');
    });

    it('Title of spec should be rendered', () => {
      cy.contains('Streetlights API').should('exist');
    });

    it('Servers of spec should be rendered', () => {
      cy.contains('test.mosquitto.org:{port}').should('exist');
    });

    it('Channels of spec should be rendered', () => {
      cy.contains(
        'smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured',
      ).should('exist');
      cy.contains(
        'smartylighting/streetlights/1/0/action/{streetlightId}/turn/on',
      ).should('exist');
      cy.contains(
        'smartylighting/streetlights/1/0/action/{streetlightId}/turn/off',
      ).should('exist');
      cy.contains(
        'smartylighting/streetlights/1/0/action/{streetlightId}/dim',
      ).should('exist');
    });
  });
});
