describe('Smoke Test', function () {
  it('Just checks if tests run', function () {
    expect(true).to.equal(true);
  });
});

describe('Page Element Existence', function () {
  before(()=> cy.visit('/'));

  ['#map', 'nav', 
   '#info', '#info latitude', '#info longitude',
   '#info county', '#info town',
   '#score'
  ].forEach((selector)=> {
    it('Should have a ' + selector + ' element', function () {
      cy.get(selector); // this will fail if the given element is missing
    });
  })
});

describe('Contents of Info Fields', ()=> {

});