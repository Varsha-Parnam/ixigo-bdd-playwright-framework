import { expect } from '@playwright/test';

export class IxigoFlightsPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.ixigo.com/flights');
  }

  async selectCities() {
    await this.page.getByText('From').nth(1).click();
    await this.page.getByRole('listitem').filter({ hasText: 'DELNew Delhi' }).click();
    await this.page.getByRole('listitem').filter({ hasText: 'BOMMumbai' }).click();
  }

  async selectDate() {
    await this.page.getByRole('button', { name: 'May 28, 2026' }).click();
    
  }

 async selectPassengersAndClass() {
    await this.page.getByTestId('2').first().click();   // ✅ 2 adults
    await this.page.getByText('Business').click();      // ✅ Business class
    await this.page.getByRole('button', { name: 'Done' }).click(); // ✅ Done
}


  async searchFlight() {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  async filterNonStop() {
    await this.page.getByText('Non-stop').click();
  }

  async sortByCheapest() {
    await this.page.getByText('Cheapest').click();
  }

  async viewFlightDetails() {
    await this.page.getByText('Flight Details').first().click();
  }

  async closeFlightDetails() {
    await this.page.locator('.absolute.top-\\[25px\\] > svg > path').click();
  }
}
``