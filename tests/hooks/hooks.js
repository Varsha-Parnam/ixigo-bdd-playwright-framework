import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

setDefaultTimeout(60000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});


//----------------------------------CROSS BROWSER=============================
// const { Before, After, AfterStep, Status, setDefaultTimeout } = require('@cucumber/cucumber');
// const { chromium, firefox, webkit } = require('playwright');
// const fs = require('fs');
// const path = require('path');
 
// setDefaultTimeout(90 * 1000);
 
// // Toggle via env without code changes
// const ALWAYS_ATTACH_VIDEO = String(process.env.ALWAYS_ATTACH_VIDEO || 'true').toLowerCase() === 'true';
// const ALWAYS_ATTACH_SCREENSHOT = String(process.env.ALWAYS_ATTACH_SCREENSHOT || 'false').toLowerCase() === 'true';
 
// function pickEngine(name = 'chromium') {
//   if (name === 'firefox') return firefox;
//   if (name === 'webkit')  return webkit;
//   return chromium;
// }
 
// Before(async function () {
//   const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
//   const headless = String(process.env.HEADLESS || 'false').toLowerCase() === 'true';
//   const slowMo = Number(process.env.SLOWMO || 0);
 
//   const engine = pickEngine(browserName);
//   this.browser = await engine.launch({ headless, slowMo });
 
//   // Record a video per scenario
//   this.context = await this.browser.newContext({
//         recordVideo:{dir:'videos/'}
//     });
 
//   this.page = await this.context.newPage();
//   this.page.setDefaultTimeout(20000);
//   this.page.setDefaultNavigationTimeout(35000);
 
//   // Tiny proof that the formatter consumes attachments
//   await this.attach(`HOOK: launched ${browserName} (headless=${headless}, slowMo=${slowMo})`, 'text/plain');
// });
 
// After(async function(scenario){
//     if(scenario.result.status ==='FAILED'){
//         const screenshot = await this.page.screenshot({fullPage:true});
//     }
 
//     //attach video
//     const videoPath=await this.page.video()?.path();
//     if(videoPath){
//         const video=fs.readFileSync(videoPath);
//         await this.attach(video,'video/webm');
//     }
//     await this.browser.close();
// });
// //-----------------------------------------------------------------------------------