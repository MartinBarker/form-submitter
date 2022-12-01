const puppeteer = require('puppeteer')

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}

function generateRandomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

main();
async function main() {
  try{
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 800 })
  }catch(err){
    console.log('initial puppeteer setup err: ', err)
  }


  var numberOfSubmissions=0
  while(true){
      try{
      //goto url
      await page.goto("https://www.defendkidstx.com/", { timeout: 0 });

      //wait for button to load and click it
      await page.waitForXPath("//span[text()='Report']")
      const elements = await page.$x("//span[text()='Report']")
      await elements[0].click() 

      var randomCharsNoSpaces='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      var randomCharsSpaces=' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      
      //enter name
      await page.focus('input[data-original_id="name"]')
      await page.keyboard.type(generateRandomString(16, randomCharsNoSpaces))

      //enter email
      await page.focus('input[data-original_id="email"]')
      await page.keyboard.type(`${generateRandomString(8, randomCharsNoSpaces)}@${generateRandomString(8, randomCharsNoSpaces)}.com`)

      //enter location of show
      await page.focus('input[data-original_id="location_of_show"]')
      await page.keyboard.type(generateRandomString(20, randomCharsSpaces))

      //enter other info
      await page.focus('textarea[data-original_id="other_info"]')
      await page.keyboard.type(generateRandomString(69, randomCharsSpaces))

      //click submit
      await page.click('button[type="submit"]') 

      //wait for success 
      await page.waitForXPath("//p[text()='Your report has been sent, thank you!']")

      numberOfSubmissions++
      console.log(`submitted ${numberOfSubmissions} forms`)
    }catch(err){
      console.log('program error:', err)
    }

  }

};


