import { expect } from '@playwright/test';

export class FlightPage {
    constructor(page) {
        this.page = page;
        this.fromInput = page.locator('div').filter({ hasText: /^From$/ }).nth(1);
        this.toInput = page.locator('div').filter({ hasText: /^To$/ }).nth(4);
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.doneBtn = page.getByRole('button', { name: 'Done' });
        this.adultsBtn = page.getByTestId('2');
        this.cheapestRadio = page.getByRole('radio').first();
    }

    async navigate() {
        await this.page.goto('https://www.ixigo.com/flights');
    }

    async selectSource(city) {
        await this.fromInput.click();
        await this.page.getByRole('listitem').filter({ hasText: city }).click();
    }

    async selectDestination(city) {
        await this.toInput.click();
        await this.page.getByRole('listitem').filter({ hasText: city }).click();
    }

    async selectDate(dateText) {
        await this.page.getByRole('button', { name: dateText }).click();
    }

    async setPassengers() {
        await this.adultsBtn.first().click();
        await this.doneBtn.click();
    }

    async clickSearch() {
        await this.searchBtn.click();
        await this.page.waitForURL(/.*search\/result\/flight.*/, { timeout: 60000 });
    }

    async sortByCheapest() {
        await this.cheapestRadio.waitFor({ state: 'attached', timeout: 30000 });
        await this.cheapestRadio.click({ force: true });
        // Wait for URL to confirm sort applied
        await this.page.waitForURL(/.*sort_type=cheapest.*/, { timeout: 20000 });
    }

    async verifySort() {
        await expect(this.page).toHaveURL(/.*sort_type=cheapest.*/);
    }
}
