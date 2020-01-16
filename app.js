const path = require('path');
const { ServiceBuilder, Options } = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const chromeDriverPath = path.join(__dirname + "/src/plugin/driver", "chromedriver.exe");
const serviceBuilder = new ServiceBuilder(chromeDriverPath);

var XLSX = require('xlsx');

async function start() {
    /**
     * Chrome Setting
     * 
     * * Interact with existing Chrome broswer
     * * * Use cmd execute command
     * * * Run node app.js
     */
    // chrome.exe --remote-debugging-port=9222 --user-data-dir="C:\selenum\AutomationProfile"
    var option = new Options();
    option.options_["debuggerAddress"] = "127.0.0.1:9222";

    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeService(serviceBuilder)
        .setChromeOptions(option)
        .build();

    /*
     * Start
     */
    // await driver.get('https://www.nul.nagoya-u.ac.jp/db/DBannai/ezproxy/index.html');
    // await driver.findElement(By.linkText("聞蔵(きくぞう)II ビジュアル")).click();

    // await new Promise(resolve => setTimeout(resolve, 10000));
    // await driver.sleep(5000);

    // /*
    // * Login
    // */
    // await driver.wait(until.elementLocated(By.name('username')), 5000);
    // await driver.wait(until.elementLocated(By.name('password')), 5000);

    // await driver.findElement(By.name('username')).sendKeys('****');
    // await driver.findElement(By.name('password')).sendKeys('****');
    // await driver.findElement(By.className('btn-submit')).click();

    // await driver.sleep(5000);

    await driver.switchTo().frame(1);

    /*
    * Search
    */
    // 對象報紙名
    // await driver.findElement(By.xpath("//*[@id='optNotNavi2']/nobr[2]/label")).click();
    // await driver.findElement(By.xpath("//*[@id='optNotNavi2']/nobr[3]/label")).click();
    // await driver.findElement(By.xpath("//*[@id='optNotNavi2']/nobr[4]/label")).click();

    // // 關鍵字
    // await driver.findElement(By.id('txtWord_ID')).sendKeys('にくい');

    // // 發行日
    // await driver.findElement(By.xpath("//*[@id='optNotNavi6']/select[1]/option[4]")).click();
    // await driver.findElement(By.xpath("//*[@id='optNotNavi6']/select[2]/option[2]")).click();
    // await driver.findElement(By.xpath("//*[@id='optNotNavi6']/select[3]/option[5]")).click();

    // await driver.findElement(By.xpath("//*[@id='optNotNavi6']/select[5]/option[4]")).click();
    // await driver.findElement(By.xpath("//*[@id='optNotNavi6']/select[6]/option[13]")).click();
    // await driver.findElement(By.xpath("//*[@id='optNotNavi6']/select[7]/option[35]")).click();

    // // 順序
    // await driver.findElement(By.id("rdoDspOrder2")).click();

    // // 搜尋
    // await driver.findElement(By.xpath("//*[@id='optNotNavi4']/input[2]")).click();

    // await driver.sleep(5000);

    let totalNum;
    await driver.findElement(By.xpath("/html/body/center[2]/form/table/tbody/tr[2]/td/table/tbody/tr[4]/td/span[1]/span")).getText().then(function (text) {
        console.log('totalNum > ' + i);
        console.log(text);
        totalNum = text;
    }, console.log);

    let totalPage = totalNum % 20 + 1;
    console.log("totalPage:" + totalPage);

    for (var page = 0; page < totalPage; page++) {
        for (var i = 2; i < 42; i++) {
            let elesTitle = await driver.findElements(By.xpath("/html/body/center[2]/form/table/tbody/tr[4]/td/table/tbody/tr[" + i + "]"));
            elesTitle.forEach(async function (element, index) {
                await element.getText().then(function (text) {
                    console.log('Ttile > ' + i);
                    console.log(text.split(" "));
                }, console.log);
            });

            i++;

            let elesName = await driver.findElements(By.xpath("/html/body/center[2]/form/table/tbody/tr[4]/td/table/tbody/tr[" + i + "]"));
            elesName.forEach(async function (element, index) {
                await element.getText().then(function (text) {
                    console.log('Name > ' + i);
                    console.log(text);

                }, console.log);

                await element.findElement(By.tagName("a")).click();
            });

            await driver.sleep(Math.floor((Math.random() + 2) * 1000));

            await driver.findElement(By.xpath("/html/body/center[2]/form/table/tbody/tr[3]/td/table[2]/tbody/tr[3]/td/span/div")).getText().then(function (text) {
                console.log('Content > ' + i);
                console.log(text);

            }, console.log);

            await driver.findElement(By.xpath("/html/body/center[2]/form/table/tbody/tr[3]/td/table[2]/tbody/tr[3]/td/span/div/span")).getText().then(function (text) {
                console.log('Keyword > ' + i);
                console.log(text);

            }, console.log);

            await driver.findElement(By.xpath("/html/body/center[2]/form/table/tbody/tr[1]/td/table/tbody/tr/td[1]/a")).click();

            await driver.sleep(Math.floor((Math.random() + 3) * 1000));
        }
        await driver.findElement(By.name("next")).click();
        await driver.sleep(Math.floor((Math.random() + 3) * 1000));
    }

    /**
     * Write Data
     */
    // await driver.findElement(By.xpath("//*[@id='optNotNavi4']/input[2]")).click();
    // for(){

    // }

    /**
     * End
     */
    // driver.quit();
}

start();