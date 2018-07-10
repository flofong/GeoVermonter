
describe('Smoke Test', function () {
  it('Just checks if tests run', function () {
    expect(true).to.equal(true);
  });
});

describe('On initial page load', function () {
  before(() => cy.visit('/'));

  it('the basic page elements should exist', function () {
    ['#map', 'nav',
      '#info', '#info #latitude', '#info #longitude',
      '#info #county', '#info #town',
      '#score',
      'button#start', 'button#guess', 'button#quit'
    ].forEach((selector) => {
      it('Should have a ' + selector + ' element', function () {
        cy.get(selector); // this will fail if the given element is missing
      });
    });
  });
});

describe('After clicking start', () => {
  before(() => {
    cy.visit('/');
    cy.get('button#start').click();
  });

  it('the Start button should be disabled', () => {
    cy.get('button#start').should('be.disabled');
  });

  it('the Quit button should be enabled', () => {
    cy.get('button#quit').should('be.enabled');
  });

  it('the Guess button should be enabled', () => {
    cy.get('button#guess').should('be.enabled');
  });

  describe('the info fields', () => {
    ['#info #latitude', '#info #longitude',
      '#info #county', '#info #town',
    ].forEach((selector) => {
      it(selector + ' element should contain a question mark', function () {
        cy.get(selector).then((element) => {
          assert.equal('?', element.text());
        });
      });
    });
  });
});
