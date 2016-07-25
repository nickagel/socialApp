var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = require('chai').expect

var post;
describe('making a post', function(){
    it('logs in and creates a new post', function(){
        browser.get('http://localhost:3001')

        //click login in nav
        element(by.css('body > nav > div > ul > li:nth-child(3) > a')).click()

        //login info
        element(by.model('username')).sendKeys('test')
        element(by.model('password')).sendKeys('abc123')
        element(by.css('body > div > form > input')).click()

        var post = "random post " + Math.random()
        element(by.css('body > div > form > div > div > input')).sendKeys(post)
        element(by.css('body > div > form > div > div > span > button')).click()

        expect(element.all(by.css('ul.list-group li')).first().getText()).
            to.eventually.contain(post)
    })
})