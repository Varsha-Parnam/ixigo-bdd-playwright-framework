class BrowserManager{
static async launch(browserType = 'chromium') {
    const headless = String(process.env.HEADLESS || 'false').toLowerCase() === 'true';
    const slowMo = Number(process.env.SLOWMO || 0);
    const opts = { headless, slowMo };
 
    if (browserType === 'firefox') return firefox.launch(opts);
    if (browserType === 'webkit')  return webkit.launch(opts);
    return chromium.launch(opts); // default: chromium
  }
}
 
module.exports = { BrowserManager };