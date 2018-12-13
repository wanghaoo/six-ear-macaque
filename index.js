const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await login();
  async function login() {
    await page.goto('https://www.zhihu.com');
    await page.click('.SignContainer-switch span');
    var valideImg
    try{
      valideImg = await page.$eval('.Captcha-chineseImg', el => el.getAttribute('src')).then();
      console.log(valideImg);
    }catch(error) {
    }
    
    try{
      valideImg = await page.$eval('.Captcha-englishImg', el => el.getAttribute('src')).then();
      console.log(valideImg);
    }catch(error) {
    }
    if (valideImg != 'data:image/jpg;base64,null') {
      // await login();
      return
    }

    const userNameHtml = await page.$eval('.SignFlow-accountInput input', el => el.outerHTML);
    const passwordHtml = await page.$eval('.SignFlow-password input', el => el.outerHTML);
    await page.type('.SignFlow-accountInput input', 'wang.yu.lion@gmail.com', {delay: 30});
    await page.type('.SignFlow-password input', 'wanghaoo1', {delay: 30});
    
    await page.click('.SignFlow-submitButton', {delay: 2});
  }
  // await browser.close();
})();
