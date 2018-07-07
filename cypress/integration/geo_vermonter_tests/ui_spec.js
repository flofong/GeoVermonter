describe('Smoke Test', function () {
  it('Just checks if tests run', function () {
    expect(true).to.equal(true);
  });
});

describe('Page Navigation', function () {
  it('Should have a map container', function () {
    cy.visit('http://localhost:5000/');
    cy.get('#map');
  });
});
