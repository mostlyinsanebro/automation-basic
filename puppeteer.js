//docs->pptr.dev
//also need chromium command line args
//docs also on git puppeteer
//Also , flaviocopes.com/puppeteer article can be referenced

let puppeteer = require("puppeteer");


//Every puppeteer function returns a promise

//.launch fun launches the browser
let browserStartPromise = puppeteer.launch({

    //makes browser visible
    headless: false,

    //does the work in slow motion
    slowMo: 100,

    //viewport -landscape, mobile etc
    defaultViewport: null,

    //settings
    args: ["--start-maximized", "--disable-notifications"],

})

//we are using this page for the purpose that the type and enter operations will be done on the object 
//that will be present in the page var at that time. 
let page,browser,rtab;

//browserStartPromise will give the representative of the browser i.e the browserObj
browserStartPromise.then(function (browserObj) {
    // console.log("Browser launched")

    //will give us the promise of opening a new Tab
    let newTabOpenedPromise = browserObj.newPage();

    browser=browserObj;
    //when object is returned in newTabOpened function in "then" is called
    return newTabOpenedPromise;
}).then(function (newTab) {

    page=newTab;

    //will return a promise of going to the given link
    let googlePageOpenPromise = newTab.goto("https://www.google.com");

    //then called
    return googlePageOpenPromise;
}).then(function () {
    // console.log("google home page opened");

    //used to type from keyboard in a form element selected using css "selectors" on page
    let textwillbetypedPromise=page.type(".gLFyf.gsfi","pepcoding",{delay:400});

    return textwillbetypedPromise;
}).then(function(){

    //used to press the specific buttons
    let enterWillBePressedPromise=page.keyboard.press("Enter");
    
    return enterWillBePressedPromise;
}).then(function(){

    //will wait for a selector-> used everytime a new page is loaded
    let waitForSelectorPromise=page.waitForSelector('.BYM4Nd .eKjLze',{visible:true});

    return waitForSelectorPromise;
}).then(function(){
    
    //will click on the selector element
    let clickpromise=page.click('.BYM4Nd .eKjLze');

    return clickpromise;
}).then(function(){
    //wait for nav bar to load and be visible on screen
    let waitFornavBarPromise=page.waitForSelector(".nav",{visible:true});

    return waitFornavBarPromise;
})
.then(function(){
    //return an array of all the elements with selector .site-nav-li
    let arrayreturnPromise=page.$$(".site-nav-li");
    return arrayreturnPromise;
}).then(function(array){

    //clicks on the selected element
    let clickonElementPromise=array[7].click();

    return clickonElementPromise;
}).then(function(){

    //added static wait here because next page will take time to load
    let waitPromise=page.waitFor(2000);
    return waitPromise;
})
.then(function()
{
    //will give the no of pages opened in browser
    let noofpagespromise=browser.pages();

    return noofpagespromise;
}).then(function(pagesarray)
{
    //will set the page as the last page in the broeser
    page=pagesarray[pagesarray.length-1];

    //will wait for the level-1 part
    let waitforlevel1Promise=page.waitForSelector('.card.free-resource-card.show-on-hover.border-radius',{visible:true});

    return waitforlevel1Promise;
}).then(function()
{
    //will click on the level 1 part
    let clickonleve1Promise=page.click('.card.free-resource-card.show-on-hover.border-radius');

    return clickonleve1Promise;
}).then(function(){
    console.log("clicked on level 1");
})