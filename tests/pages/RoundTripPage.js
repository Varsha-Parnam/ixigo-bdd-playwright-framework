import { expect } from '@playwright/test';

export class RoundTripPage {
    constructor(page) {
        this.page = page;
        this.roundTripTab = page.getByRole('tab', { name: 'Round Trip' });
        this.quickestRadio = page.getByRole('radio').nth(1);
        this.closeDetailsBtn = page.locator('.absolute.top-\\[25px\\] > svg > path');
    }

    async selectRoundTrip() {
        await this.roundTripTab.click();
    }

    async sortByQuickest() {
        await this.quickestRadio.waitFor({ state: 'attached' });
        await this.quickestRadio.click({ force: true });
        await this.page.waitForURL(/.*sort_type=quickest.*/, { timeout: 20000 });
    }
}

