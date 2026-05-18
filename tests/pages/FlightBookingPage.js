import { expect } from '@playwright/test';

export class FlightBookingPage {
    constructor(page) {
        this.page = page;
        // Airline filter (usually the 4th child in the airline section)
        this.airlineCheckbox = page.locator('.px-20 > div > div:nth-child(4) > .shrink-0.inline-flex.items-center.justify-center.w-20 > .absolute');
        this.firstBookBtn = page.getByRole('button', { name: 'Book' }).first();
        this.assuredFareRadio = page.getByRole('radio', { name: 'Assured Most Popular Free' });
        this.loginTrigger = page.getByRole('button', { name: 'user-avatar Log in/Sign up' }).first();
        this.mobileInput = page.getByRole('textbox', { name: 'Enter Mobile Number' });
        this.continueBtn = page.locator('#portal-root').getByRole('button', { name: 'Continue' });
    }

   async filterByAirline() {
    // 1. HANDLE POPUP: Check if an ad is covering the filters and close it
    const closeAd = this.page.locator('[data-testid="CloseIcon"], .ixigo-popup-close').first();
    if (await closeAd.isVisible()) {
        await closeAd.click();
    }

    // 2. CLICK FILTER: Wait for the airline checkbox and check it
    await this.airlineCheckbox.waitFor({ state: 'visible', timeout: 15000 });
    await this.airlineCheckbox.check();
    
    // 3. FIX CODE ERROR: Wait for the URL to change instead of 'networkidle'
    // This confirms the filter worked by checking the address bar
    await this.page.waitForURL(/.*airlines=.*/, { timeout: 20000 });
}


    async bookFirstFlight() {
        await this.firstBookBtn.click();
    }

    async selectAssuredFare() {
        // Use force: true as these are often custom-styled radio buttons
        await this.assuredFareRadio.click({ force: true });
    }

    async openLoginModal() {
        await this.loginTrigger.waitFor({ state: 'visible' });
        await this.loginTrigger.click();
    }

    async enterMobileAndContinue(mobile) {
        await this.mobileInput.waitFor({ state: 'visible' });
        await this.mobileInput.fill(mobile);
        await this.continueBtn.click();
    }

    async verifyLoginState() {
        const modalContent = this.page.locator('#portal-root').getByText(/OTP|Mobile Number/i).first();
        await expect(modalContent).toBeVisible({ timeout: 10000 });
    }
}
