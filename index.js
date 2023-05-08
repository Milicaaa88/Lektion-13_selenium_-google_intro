// We want to pull out Bilder, By, Key and until from the selenium library
const { Builder, By, Key, until } = require('selenium-webdriver');
// We import shoult() from chai
const should = require('chai').should();

async function googleSearch() {
    // Create new instance of firefox
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Go to google.com
        await driver.get('https://www.google.com');
        // Find the accept cookies button
        let cookieButton = await driver.findElements(By.css('.QS5gu.sy4vM'));
        // Click the accept cookies button
        await cookieButton[1].click();
        //Whait until the element is located, in this case search bar
        await driver.wait(until.elementLocated(By.name('q')), 10000);
        // Selenium is to fast better wait 1 secont/ 1000 ms
        await driver.sleep(1000);
        // Write something in the searchbar and push enter
        await driver.findElement(By.name('q')).sendKeys('Selenium', Key.ENTER);
        // Whait until elements are located
        await driver.wait(until.elementLocated(By.css('h3')), 10000); 
        // Get the link text 
        let firstLink = await driver.findElement(By.css('h3'));
        let linkText = await firstLink.getText();
        console.log(linkText);

        // Assert linkText
        linkText.should.equal('Selenium');


// Shoul always run if assert above validates correctly
        if (linkText === 'Selenium') {
            await firstLink.click();
        } else {
            console.log('First link is not "Selenium".');
        }
// Whait until site loads and display a title
await driver.wait(until.titleContains('Selenium'), 10000);
// Get the title
let title = await driver.getTitle();
//Assert the title
title.should.include('Selenium');


 } catch(error) {
        console.log(error);
    } finally {
        console.log('Test run successfully');
        await driver.quit();
    }

}

googleSearch();
