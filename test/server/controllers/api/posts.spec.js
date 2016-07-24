var Post = require('../../../../models/post')
var api = require('../../support/api')
var user = require('../../support/user')
var expect = require('chai').expect

describe('controllers.api.posts', function(){
    beforeEach(function(done){
        Post.remove({}, done)
    })
    describe('GET /api/posts', function(){
        beforeEach(function(done){
            var posts = [
                {body: 'post1', username: 'test'},
                {body: 'post2', username: 'test'},
                {body: 'post3', username: 'test'},
            ]
            Post.create(posts, done)
        })
        it('has 3 posts', function(done){
            api.get('/api/posts')
                .expect(200)
                .expect(function (posts){
                    if(posts.body.length !== 3){
                        return "posts count should be 3"
                    }
                })
            .end(done)
        })
    })
})

describe('POST /api/posts', function(){
    var token
    beforeEach(function(done){
        Post.remove({}, done)
    })
    beforeEach(function (done){
        user.create('test2', 'abc123', function(err, user){
            token = user.token
            done(err)
        })
    })

    beforeEach(function (done){
        api.post('/api/posts')
        .send({body: 'this is my new post'})
        .set('X-Auth', token)
        .expect(201)
        .end(done)
    })

    it('added 1 new post', function(done){
        Post.findOne(function (err, post){
            expect(post.body).to.equal('this is my new post')
            done(err)
        })
    })
})

