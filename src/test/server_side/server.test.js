const supertest=require('supertest');
const server=supertest(require('../../../server'));
const assert=require('assert');


const CONFIG={
  URLS:{
    get_all_books:'/api/books',
    get_by_title:'/api/books/title',
    get_by_olid:'/api/books/OLID',
    inexistent:'/aaaasssssaaaaa'
  }
}



describe('Server ON', function() {
  it('Status code === 200', (done) => {
    server
    .get('/')
    .expect(200)
    .end(function(err,res){
      assert(res.text)
      done();
    })
  });

  it('Returns the index.html file on /', (done) => {
    server
    .get('/')
    .expect(200)
    .end(function(err,res){
      assert(res.text.indexOf('html')>-1)
      done();
    })
  });

});

describe('Check API URLs', function() {
  it('Inexistent URL', (done) => {
    server
    .get(CONFIG.URLS.inexistent)
    .expect(404)
    .end((err, res)=>{
      done();
    })
  });

  it('Get all books', (done) => {
    server
    .get(CONFIG.URLS.get_all_books)
    .expect(200)
    .end((err, res)=>{
      assert(res.body.length);
      done();
    })
  });

  it('Get books by title ( TITLE EXISTS )', (done) => {
    server
    .post(CONFIG.URLS.get_by_title)
    .send({query:"refle"})
    .expect(200)
    .end((err, res)=>{
      assert(res.body.length>0);
      done();
    });
  });
  it('Get books by title (TITLE DOESNT EXISTS)', (done) => {
    server
    .post(CONFIG.URLS.get_by_title)
    .send({query:"aaaaaaaaaaa"})
    .expect(200)
    .end((err, res)=>{
      assert(res.body.length===0);
      done();
    });
  });

  it('Get books by OLID (OLID EXISTS)', () => {
    server
    .post(CONFIG.URLS.get_by_olid)
    .expect(200)
    .send({query:'OL24364628M'})
    .end((err, res)=>{
      assert(res.body.length===1 && res.body[0].title==='Great expectations');
      done();
    })
  });


  it('Get books by OLID (OLID DOESNT EXISTS)', () => {
    server
    .post(CONFIG.URLS.get_by_olid)
    .expect(200)
    .send({query:'OL1111M'})
    .end((err, res)=>{
      assert(res.body.length===0);
      done();
    })
  });
});
