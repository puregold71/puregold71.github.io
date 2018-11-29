/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed['url'].length).not.toBe(0);
                expect(feed['url']).toBeDefined();
            }
        });
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            for (let feed of allFeeds) {
                expect(feed['name'].length).not.toBe(0);
                expect(feed['name']).toBeDefined();
            }
        });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            const body = document.querySelector('body')
            //body should initially have menu-hidden class
            expect(body.classList).toContain('menu-hidden')
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes when clicked', function() {
            const menuIcon = document.querySelector('.icon-list')
            const body = document.querySelector('body')
            //when menu is clicked
            menuIcon.click()
            //menu-hidden class should not exist
            expect(body.classList).not.toContain('menu-hidden')
            //click menu again
            menuIcon.click();
            //menu should be hidden
            expect(body.classList).toContain('menu-hidden')
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        //make sure the first loadFeed is done running
        beforeEach(function(done) {
            loadFeed(0, function() {
                //signals function is done and testing can continue
                done();
            });
        });
        //check that it has at least one entry
        it('have at least one entry', function(done) {
            const feed = document.querySelector(".feed")
            //make sure the feed div contains at least one entry
            const entries = feed.getElementsByClassName("entry")
            expect(entries.length).toBeGreaterThan(0);
            //signals that this test relies on async execution
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            //load first feed
            loadFeed(0, function() {
                //signals function is done and testing can continue
                done();
            });
        });
        //get the feed after the first one is loaded
        const firstFeed = document.querySelector('.feed').innerHTML
        it('content changes when new feed is loaded', function(done) {
            //load next feed
            const nextFeed = document.querySelector('.feed').innerHTML
            const entries = document.getElementsByClassName("entry")
            loadFeed(1, function() {
                //feed container should be updated with a new feed.
                //first and second feed should be different
                expect(firstFeed).not.toEqual(nextFeed)
                expect(entries[1].innerHTML).not.toEqual(entries[0]
                    .innerHTML);
                done();
            });
        });
    });
}());
