/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  /*
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
       //console.log("res.body", res.body);
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  */
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {
      var testId;

    suite('POST /api/books with title => create book object/expect book object', function() {
      
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({title: "Functional Test Title"})
          .end(function(err, res){
            testId = res.body._id;
           //console.log("res.body", res.body);
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an array');
            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            assert.equal(res.body.title, 'Functional Test Title');
            done();
          });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .end(function(err, res){
           //console.log("res.text", res.text);
            assert.equal(res.status, 200);
            assert.equal(res.text, 'No title provided');
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end(function(err, res){
           //console.log("res.body", res.body);
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .post('/api/books')
          .send({_id: "5d712e51483f1b189bacd003"})
          .end(function(err, res){
           //console.log("res.text", res.text);
            assert.equal(res.status, 200);
            assert.equal(res.text, 'No title provided');//
            done();
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        //console.log("testId", testId);
        chai.request(server)
          .get('/api/books/'+testId)
          .end(function(err, res){
           //console.log("res.body", res.body);
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'Functional Test Title');
            assert.equal(res.body._id, testId);
            assert.isArray(res.body.comments);
            done();
          });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/'+testId)
          .send({comment: "Functional Test Comment"})
          .end(function(err, res){
           //console.log("res.body", res.body);
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an array');
            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            assert.equal(res.body.title, 'Functional Test Title');
            assert.isArray(res.body.comments);
            assert.equal(res.body.comments[0], 'Functional Test Comment');
            done();
          });
      });
      
    });
    
    suite('DELETE /api/books/[id] => book object with [id]', function(){
      
      test('Test DELETE /api/books/[id] with id in db',  function(done){
        //console.log("testId", testId);
        chai.request(server)
          .delete('/api/books/' + testId)
          .end(function(err, res){
           //console.log("res.text", res.text);
            assert.equal(res.status, 200);
            assert.equal(res.text, 'delete successful');//
            done();
          });
      });    
    });
  });
});
