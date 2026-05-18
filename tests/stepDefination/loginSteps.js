import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { FlightPage } from '../pages/FlightPage.js';
import { FlightSearchPage } from '../pages/FlightSearchPage.js';
import { FlightBookingPage } from '../pages/FlightBookingPage.js';
import { RoundTripPage } from '../pages/RoundTripPage.js';
import { IxigoFlightsPage } from '../pages/IxigoFlightsPage.js';



//--- SCENARIO 1 ---//

Given('I navigate to the ixigo flights page', async function () {
    await this.page.goto('https://www.ixigo.com');
});

When('I select {string} as the source city', async function (source) {
    const flightPage = new FlightPage(this.page);
    await flightPage.selectSource(source);
});


When('I select {string} as the destination city', async function (dest) {
    const flightPage = new FlightPage(this.page);
    await flightPage.selectDestination(dest);
});

When('I select the departure date {string}', async function (dateText) {
    await this.page.getByRole('button', { name: dateText }).click();
});

When('I select 2 adults and click Done', async function () {
    await this.page.getByTestId('2').first().click();
    await this.page.getByRole('button', { name: 'Done' }).click();
});

When('I click on the Search button', async function () {
    const searchPage = new FlightSearchPage(this.page);
    await searchPage.clickSearch();
});

When('I sort the results by "Cheapest"', { timeout: 60000 }, async function () {
    const flightPage = new FlightPage(this.page);
    await flightPage.sortByCheapest();
});

Then('I should see the flight results sorted by price', async function () {
    await expect(this.page).toHaveURL(/.*sort_type=cheapest.*/);
});


/**
  ===================================================================
  TestCase Number - 1
  Description -  Search and sort flights by cheapest fare
  Created By - Varsha Sree Parnam
  Reviewed By - SME
  Positive Test Case - Validate
  ===================================================================
*/
 

//--- SCENARIO 2 ---//

When('I filter for the preferred airline', { timeout: 60000 }, async function () {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.filterByAirline();
});


When('I view and close flight details for the first result', async function () {
    await this.page.getByText('Flight Details').first().click();
    const closeBtn = this.page.locator('#portal-root').getByTestId('CloseIcon').first();
    await closeBtn.click();
});

When('I click on the Book button for the first result', async function () {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.bookFirstFlight();
});

Then('I should be redirected to the next page', async function () {
    await expect(this.page).not.toHaveURL(/.*search\/result\/flight.*/);
});

/**
  ===================================================================
  TestCase Number - 2
  Description -  Search and filter IndiGo flights from Mumbai to Hyderabad
  Created By - Varsha Sree Parnam
  Reviewed By - SME
  Positive Test Case - Validate
  ===================================================================
*/

//--- SCENARIO 3 ---//


When('I select the first available flight', async function () {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.bookFirstFlight();
});

When('I select the "Assured" fare option', async function () {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.selectAssuredFare();
});

When('I open the login modal', async function () {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.openLoginModal();
});

When('I enter the mobile number {string} and click Continue', async function (mobile) {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.enterMobileAndContinue(mobile);
});

Then('I should see the login modal or a validation state', async function () {
    const bookingPage = new FlightBookingPage(this.page);
    await bookingPage.verifyLoginState();
});

/**
  ===================================================================
  TestCase Number - 3
  Description -  Search flight from Chennai to Bengaluru and attempt login
  Created By - Varsha Sree Parnam
  Reviewed By - SME
  Positive Test Case - Invalidate
  ===================================================================
*/



//--- SCENARIO 4 ---//


When
('I select the {string} tab', async function (tabName) {
    const rtPage = new RoundTripPage(this.page);
    await rtPage.page.getByRole('tab', { name: tabName }).click();
});

When('I select the return date {string}', async function (date) {
    await this.page.getByRole('button', { name: date }).click();
});

When('I sort the results by "Quickest"', async function () {
    const rtPage = new RoundTripPage(this.page);
    await rtPage.sortByQuickest();
});

Then('I should be on the booking review page', async function () {
    await expect(this.page).toHaveURL(/.*flight\/booking.*/);
});


/**
  ===================================================================
  TestCase Number - 4
  Description -  Search and filter round trip flights from Bangkok to Goa
  Created By - Varsha Sree Parnam
  Reviewed By - SME
  Positive Test Case - Validate
  ===================================================================
*/

//--- SCENARIO 5 ---//



//--- SCENARIO 5 ---//

When('I select 2 adults and Business class and click Done', async function () {
    const ixigoPage = new IxigoFlightsPage(this.page);
    await ixigoPage.selectPassengersAndClass();
});

When('I filter flights by non-stop option', async function () {
    const ixigoPage = new IxigoFlightsPage(this.page);
    await ixigoPage.filterNonStop();
});

When('I sort the results by {Cheapest}', async function (sortType) {
    const ixigoPage = new IxigoFlightsPage(this.page);

    if (sortType === 'Cheapest') {
        await ixigoPage.sortByCheapest();
    }
});

When('I view flight details for the first result', async function () {
    const ixigoPage = new IxigoFlightsPage(this.page);
    await ixigoPage.viewFlightDetails();
});

When('I close the flight details popup', async function () {
    const ixigoPage = new IxigoFlightsPage(this.page);
    await ixigoPage.closeFlightDetails();
});

Then('I should see the filtered list of flights displayed correctly', async function () {
    await expect(this.page.locator('body')).toBeVisible();
});
































