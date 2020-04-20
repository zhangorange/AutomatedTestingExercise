const puppeteer = require('puppeteer');
const config = require('./config');
(async () => {
    const browser = await puppeteer.launch({headless: false});
    // const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1366, height: 768});
    await page.goto('https://www.google.com/imghp');
    await page.waitForSelector('.BwoPOe');
    await page.click('.BwoPOe');
    await page.click('#Ycyxxc');
    await page.keyboard.sendCharacter(config.image_url);
    await page.click('#aoghAf');
    await page.waitForSelector('.GMzDwb');
    await page.waitForNavigation();
    const results = await page.$$eval('cite', items => items.map(item => item.textContent));
    results.forEach(result => {
        if (result.toLowerCase().includes(config.verify_string.toLowerCase())) {
            console.log("OK");
        }
    });
    if (results.length >= config.visit_result) {
        await page.click('#rso > div:nth-child('+config.visit_result+') > div > div.r > a');
        await page.screenshot({path: 'result.png'});

    }

    await browser.close();
})();