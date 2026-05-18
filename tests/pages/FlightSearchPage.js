import { expect } from '@playwright/test';

export class FlightSearchPage {
    constructor(page) {
        this.page = page;
        this.fromInput = page.locator('div').filter({ hasText: /^From$/ }).nth(1);
        this.toInput = page.locator('div').filter({ hasText: /^To$/ }).nth(4);
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.doneBtn = page.getByRole('button', { name: 'Done' });
        this.adultsBtn = page.getByTestId('2');
        this.airlineCheckbox = page.locator('.px-20 > div > div:nth-child(4) > .shrink-0.inline-flex.items-center.justify-center.w-20 > .absolute');
        this.flightDetailsBtn = page.getByText('Flight Details').first();
        this.closeIcon = page.locator('#portal-root').getByTestId('CloseIcon');
        this.bookBtn = page.getByRole('button', { name: 'Book' }).first();
    }

    async navigate() {
        await this.page.goto('https://www.ixigo.com');
    }

    async selectSource() {
        await this.fromInput.click();
        await this.page.getByRole('listitem').filter({ hasText: 'BOMMumbai, Maharashtra,' }).click();
    }

    async selectDestination() {
        await this.toInput.click();
        await this.page.getByRole('listitem').filter({ hasText: 'HYDHyderabad, Telangana,' }).click();
    }

    async selectDate() {
        await this.page.getByRole('button', { name: 'March 24, 2026' }).click();
    }

    async setPassengers() {
        await this.adultsBtn.first().click();
        await this.doneBtn.click();
    }

    async clickSearch() {
        await this.searchBtn.click();
        await this.page.waitForURL(/.*search\/result\/flight.*/, { timeout: 60000 });
    }

 async filterByAirline() {
    // 1. Wait for the checkbox to be visible and click it
    await this.airlineCheckbox.waitFor({ state: 'visible', timeout: 15000 });
    await this.airlineCheckbox.check();
    
    // 2. CRITICAL FIX: Wait for the URL to change instead of networkidle
    // This confirms the filter was applied without waiting for background ads/trackers
    await this.page.waitForURL(/.*airlines=.*/, { timeout: 20000 });

    // 3. Give the UI a tiny moment to re-render the list
    await this.page.waitForTimeout(1000);
}


    async viewAndCloseDetails() {
        await this.flightDetailsBtn.click();
        await this.closeIcon.waitFor({ state: 'visible' });
        await this.closeIcon.click();
    }

    async clickBookFirstFlight() {
        await this.bookBtn.click();
    }
}
