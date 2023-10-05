/// <reference types="cypress" />


function setCookiesForUILogin() {
  Cypress.Cookies.debug(true);
  cy.setCookie('cmapi_cookie_privacy', 'permit 1,2,3', { secure: true });
  cy.setCookie('cmapi_gtm_bl', '', { secure: true });
  cy.setCookie('notice_preferences', '2:', { secure: true });
  cy.setCookie('notice_behavior', 'expressed,eu', { secure: true });
  cy.setCookie('notice_gdpr_prefs', '0,1,2:', {
    secure: true,
    domain: 'redhat.com',
  });
}

Cypress.Commands.add('login', (username) => {
  let password = "";
  if (username == "lightspeed-org-admin") {
    password = Cypress.env('PASSWORD_ADMIN');
  } else {
    password = Cypress.env('PASSWORD_USER');
  }

  setCookiesForUILogin();
  cy.request(Cypress.config('baseUrl'));
  cy.visit(Cypress.config('baseUrl'));
  cy.get('#username-verification').as('usernameField');
  cy.get('@usernameField').should('be.visible');
  cy.get('@usernameField').type(username);
  cy.get('#login-show-step2').as('step2');
  cy.get('@step2').click().should('be.visible');
  cy.get('#password').as('passwordField');
  cy.get('@passwordField').should('be.visible');
  cy.get('@passwordField').type(password, { log: false });
  cy.get('#rh-password-verification-submit-button').click();
});


Cypress.Commands.add('assign_one_seat', (username) => {
  cy.get('.pf-c-button.pf-m-primary', { timeout: 30000 }).as('assign_button');
  cy.get('@assign_button').click();
  cy.get('[data-cy="users-table-modal"] tr').as('users-table-modal').should('be.visible');
  cy.get('@users-table-modal').contains('tr', username).find('input').should('be.visible');
  cy.get('@users-table-modal').contains('tr', username).find('input').check();
  cy.get('.pf-c-button.pf-m-primary.pf-m-progress').as('assign_button');
  cy.get('@assign_button').should('be.visible');
  cy.get('@assign_button').click();
});

Cypress.Commands.add('assign_multiple_seats', (users: string[]) => {
  cy.get('.pf-c-button.pf-m-primary', { timeout: 30000 }).as('assign_button');
  cy.get('@assign_button').click();
  cy.get('[data-cy="users-table-modal"] tr').as('users-table-modal').should('be.visible');
  users.forEach(username => {
    cy.get('@users-table-modal').contains('tr', username).find('input').should('be.visible');
    cy.get('@users-table-modal').contains('tr', username).find('input').check();
  })
  cy.get('.pf-c-button.pf-m-primary.pf-m-progress').as('assign_button');
  cy.get('@assign_button').should('be.visible');
  cy.get('@assign_button').click();
});

Cypress.Commands.add('unassign_multiple_seats', (users: string[]) => {
  // Find the users in the users list
  cy.get('[data-cy="users-table"] tr').as('users-table').should('be.visible');
  users.forEach(username => {
    cy.get('@users-table').contains('tr', username).find('input').should('be.visible');
    cy.get('@users-table').contains('tr', username).find('input').check();
  })

  // Click on Remove Users button
  cy.get('[data-cy="remove-users-button"]', { timeout: 30000 }).as('remove_users');
  cy.get('@remove_users').should('be.visible');
  cy.get('@remove_users').click();

  // Check the Remove users popup
  cy.get('.pf-c-modal-box__body').as('remove_text');
  cy.get('@remove_text').should('include.text', 'Are you sure you want to remove the user(s) below from Ansible Lightspeed with IBM watsonx Code Assistant?');
  cy.get('[data-cy="remove-users-list"] tbody [data-label="Name"]').each(($e1, index, $list) => {
    expect(users).to.include($e1.text().replace(' ', '-'))
  })

  // Click the remove users danger button
  cy.get('.pf-c-button.pf-m-danger').as('remove_user_button');
  cy.get('@remove_user_button').click();

  // Search the users that was removed are not in the list
  cy.get('[data-cy="search-input"]', { timeout: 30000 }).as('search_box');
  cy.get('@search_box').should('be.visible');
  users.forEach(username => {
    cy.get('@search_box').type(username);
    cy.get('.pf-c-button.pf-m-control').as('submit_search');
    cy.get('@submit_search').click();
    cy.get('.pf-c-empty-state__content > .pf-c-title').as('no_result_text');
    cy.get('@no_result_text').should('include.text', 'No results found');
    cy.get('[data-cy="users-table-toolbar"] > :nth-child(2) > :nth-child(2) > .pf-c-button').as('clear_filter');
    cy.get('@clear_filter').click();
  })
});

Cypress.Commands.add('unassign_one_seat', (username) => {
  cy.get('[data-cy="search-input"]', { timeout: 30000 }).as('search_box');
  cy.get('@search_box').should('be.visible');
  cy.get('@search_box').type(username);
  cy.get('.pf-c-button.pf-m-control').as('submit_search');
  cy.get('@submit_search').click();
  cy.contains('tr', username).find('input').should('be.visible');
  cy.contains('tr', username).find('input').check();
  cy.get('[data-cy="remove-users-button"]').as('remove_users')
  cy.get('@remove_users').click();
  cy.get('.pf-c-modal-box__body').as('remove_text');
  cy.get('@remove_text').should('include.text', 'Are you sure you want to remove the user(s) below from Ansible Lightspeed with IBM watsonx Code Assistant?');
  cy.get('.pf-c-button.pf-m-danger').as('remove_user_button');
  cy.get('@remove_user_button').click();
  cy.get('.pf-c-empty-state__content > .pf-c-title').as('no_result_text');
  cy.get('@no_result_text').should('include.text', 'No results found');
  cy.get('[data-cy="users-table-toolbar"] > :nth-child(2) > :nth-child(2) > .pf-c-button').as('clear_filter');
  cy.get('@clear_filter').click();
});

Cypress.Commands.add('filter_by', (option, value) => {
  cy.get('.pf-c-menu-toggle__text').click()
  cy.get('.pf-c-menu__item').contains(option).click()
  cy.get('.pf-c-text-input-group__text-input').type(value + '{enter}')
  cy.get('@users_table').find(`tbody [data-label="${option}"]`).each(($e1, index, $list) => {
    expect($list).length(1)
    expect($e1.text()).to.equal(value)
  })

  cy.get('[data-cy="users-table-toolbar"] > :nth-child(2) > :nth-child(2) > .pf-c-button').as('clear_filter');
  cy.get('@clear_filter').click();

});