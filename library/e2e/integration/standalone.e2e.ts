describe('Standalone bundle', () => {
  testSuite('With parser', 'e2e/sites/standalone.html');
  testSuite('With parser for v3', 'e2e/sites/standalone-v3.html');
  testSuite('Without parser', 'e2e/sites/standalone-without-parser.html');

  function testSuite(testName: string, site: string) {
    describe(testName, () => {
      before(() => {
        cy.visit(site);
      });

      it('Container should exist', () => {
        cy.get('#spec').should('exist');
      });

      it('Title of spec should be rendered', () => {
        cy.contains('Example AsyncAPI').should('exist');
      });

      it('Servers of spec should be rendered', () => {
        cy.contains('example-server').should('exist');
      });

      it('Channels of spec should be rendered', () => {
        cy.contains('example-channel').should('exist');
      });
    });
  }
});
