describe('Navigate to the Seats Administration page as lightspeed-test-user', () => {
  before(() => {
    cy.login('lightspeed-test-user');
  });

  it('passes', () => {
    cy.get('.pf-c-title', { timeout: 30000 }).should('include.text', 'Ansible Lightspeed with IBM watsonx Code Assistant');
    cy.get('.pf-l-level > div > p').should('include.text', 'This group contains all users assigned seats within your organization.');
  })
})