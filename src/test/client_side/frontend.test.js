describe('APPInit', function () {
  beforeEach(() => {
  });
  it('All basic UI elements exists', function () {
    assert(APP._list_books);
    assert(APP._button);
    assert(APP._input);
  });
  
  it('List of books has the same childs at the length of the received data', (done) => {
    APP._loadData(APP._urls_data.init_data,(error,data)=>{
      APP._paintBooks(data);
      assert(!error && APP._list_books.childNodes.length===data.length);
      done();
    });

  });
});

describe('OLID Validity', function () {
  it('Invalid OLID', function () {
    assert(APP._checkOLIDValidity("OL23423")===false);
  });

  it('Valid OLID', function () {
    assert(APP._checkOLIDValidity("OL23423M"));
  });
});


describe('Search By', function () {
  it('If OLID Valid we search by OLID', function () {
    APP._input.value="OL131231M";
    APP._button.click();
    assert(APP._last_search==="OLID");
  });

  it('If not valid OLID we search by title', function () {
    APP._input.value="some title";
    APP._button.click();
    assert(APP._last_search==="title");
  });
});


describe('Returned data', function () {
  beforeEach(() => {

  });
  it('Existent OLID value returns data', function (done) {
    APP._urls_data.olid.body=JSON.stringify({query:"OL24364628M"});
    APP._loadData(APP._urls_data.olid,(error,data)=>{
      assert(data);
      done();
    })
  });

  it('Not existent OLID value returns empty data', function (done) {
    APP._urls_data.olid.body=JSON.stringify({query:"OL228M"});
    APP._loadData(APP._urls_data.olid,(error,data)=>{
      assert(!data);
      done();
    })
  });


  it('Existent title value returns data', function (done) {
    APP._urls_data.title.body=JSON.stringify({query:"refle"});
    APP._loadData(APP._urls_data.title,(error,data)=>{
      assert(data);
      done();
    })
  });

  it('Not existent title value returns empty data', function (done) {
    APP._urls_data.title.body=JSON.stringify({query:"aaaaaaaaaaaaaaaaaa"});
    APP._loadData(APP._urls_data.title,(error,data)=>{
      assert(!data);
      done();
    })
  });


});
