# Flights page Test Strategy
## Overview
Next, the solution to problem 3 is presented. It is intended to address the main functionalities and cover the key points of a web application such as user interface, accessibility, performance, and connectivity.

After carrying out an exploratory test session on the page according to the core functionality described in the problem, the following is determined:

1. **Search**: in this section, the users can filter the options and book the flight accordingly. The form has the following fields:  
    * **Journey type**:
        * **Roundtrip**: the user should indicate the date of departure and return.
        * **One-way**: the user should indicate the date of departure.
        * **Multi-city**: the user is redirected to the "Book a flight" page where is displayed a full form with all required fields according to the "Multi-city" option.
    * **Travel option**: this list displays information about travel classes and quantity of travelers. 
        * **Travel Class**: Economy is the default option, Premium economy, and Business or First options are available and filtered according to the user's requirements.
        * **Travelers**: list the options according to age, coming from Infants on lap to Seniors (65+), the user should select the quantity according to the age range. Adults (18-64) equal 1 as the default option.
    * **Promo code**: users can input a valid promo code.
    * **Book with miles**: list of the type of payment user can select between "Book with cash", the default option, and "Book with miles".
    * **From**: city of origin.
    * **To**: city of destination.
    * **Departure**: date of departure.
    * **Returture**: date of retutn.
2. **Daily Fares for Flights to San Francisco from Chicago**: this section lists 3 of the options available for the "Economy" class, by default the last 3 months starting from the current month. When the user clicks on the box, a bar graph of prices by day of the month is displayed for 30 days starting from the current day if it is the current month, otherwise for the first day of the month. There are the following fields to filter:
    * **Travel class**: the flight can be filtered by "Economy", "Bussiness", and "Premium economy"
    * **From**: city of origin.
    * **To**: city of destination.
    * **Switch button**: switch the cities selected previously.
    * **Next and **previous** arrows**: users can navigate to the next months. The previous arrow is disabled.
    * **Graph bar**: in the hover the shows some details such as cities, dates, lowest price, and quote by month.
3. **Information Panel**:
    * **Ads**: display the banner of the add
    * **Weather of the destination city**: shows info about the weather in of the days of the week, starting from the current day. It's possible to filter by unit: Fahrenheit, option by default, and Celsius.
    * **Explore more United flights**: list of the cities of the origin, max 15 options. Users can click on the "View more" button to list the rest of the options.
    * **Explore United Airlines's Top-Pick Destinations**: list of the cities of destination, max 15 options. Users can click on the "View more" button to list the rest of the options.
4. **More United deals on Chicago (ORD) to San Francisco (SFO) flights**: list max 20 items of other deals available. The table displays the following information: From, To, Fare type Dates and Price. Users can filter the options by the following fields:
    * **Input departure airport**: airport of origin.
    * **Input arrival airport**: airport of destination.
    * **Input your budget**: indicates the maximum budget in numbers.
    * **Select Cabin Class**: the flight can be filtered by the "Economy", option by default, "Bussiness", and "Premium economy".
## Test types and tools
To ensure the functionality of the application it is recommended to apply the following types of tests:
* **Performance testing**: Study the application's performance under *Load* or *Stress* scenarios, similar to those that may occur in production.
    * **Tools**: *JMeter* to simulate HTTP requests.
* **Accessibility testing**: The objective of accessibility testing is to create an inclusive digital environment by removing any accessibility barriers.
    * **Tools**: *axe DevTools* to scan and generate full reports. 
* **Functional testing**: Verify test scenarios of the functionalities as a set, simulating a real environment of use, this includes manual and automated testing.
    * **Tools**: *Cypress* to perform End-to-end testing.
* **Visual Regression testing**: Compare the changes of a previous and current version to ensure that changes made to the code don't accidentally break how the application appears to users.

This solution will focus on automated **Functional testing** using **Cypress** since according to the technologies of the application allow the interaction.

## Test cases definition
I selected functionality 4 "**More United deals on Chicago (ORD) to San Francisco (SFO) flights**" to develop the solution.

### Test case 001 
* **Scenario**: Verify table info view
* **Preconditions**: 
    * Stay flight page
    * Departure and arrival information for Roundtrip was submitted
* **Steps**:
    * Scroll down to the table section
    * Verify items
* **Expected results**:
    * "From" value should be equal to "Input departure airport"
    * "To" value should be equal to "Input arrival airport"
    * "Date" should not be empty
    * "Price" should contain the "From price"
    * "Price" should contain the "From price" monthly quote
    * "Price" should contain the "view" input

### Test case 002
* **Scenario**: Verify the functionality of the pagination controls
* **Preconditions**: 
    * Stay flight page
    * Departure and arrival information for Roundtrip was submitted
    * View more button should be visible at the bottom
* **Steps**:
    * Scroll down to the table section
    * Clicks on the "View more" button
* **Expected results**:
    * It should allow users to navigate through different pages
    * It should display all items

### Test case 003
* **Scenario**: Verify filtering functionality by maximum budget
* **Preconditions**:
  * Stay flight page
  * Departure and arrival information for Roundtrip was submitted
  * Set maximum budget as 300  
* **Expected results**:
    * The price of the deals should be smaller or equal to 300

### Test case 004
* **Scenario**: Verify filtering functionality by cabin class and not getting results
* **Preconditions**: 
    * Stay flight page
    * Departure and arrival information for Roundtrip was submitted
* **Steps**:
    * Scroll down to the table section
    * Selects "Premium economy"
* **Expected results**:
    * The travel class parameter should be equal to PREMIUM_ECONOMY
    * Error banner should contain "There are no fares that match your filter"

### Test case 005
* **Scenario**: Verify select flight functionality
* **Preconditions**: 
    * Stay flight page
    * Departure and arrival information for Roundtrip was submitted
* **Steps**:
    * Scroll down to the table section
    * Select a random item
* **Expected results**:
    * Should display a modal with flight details
    * The information should be showing as expected
    
## How do I get set up?
* Install [Npm](https://docs.npmjs.com/cli/v7/commands/npm-install)
* Install [Node js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) v12.x or v14.x and above
* Clone repository locally
* Go to main directory of the project
* Run `npm install`
* Run `npx cypress open` to open Cypress application and execute the `*.cy.js` files. [Documentation](https://docs.cypress.io/guides/getting-started/installing-cypress)
* Run `npx cypress run` to execute the tests in headless mode. [Documentation](https://docs.cypress.io/guides/guides/command-line#How-to-run-commands)
> [!NOTE]  
> Remember to update the values of the selectors, path, and domain before running the test script. The data used is referential.
### Custom scripts
The scripts are declared in `package.json` file. Call them with the prefix `npm run`. [Documentation](https://docs.cypress.io/guides/guides/command-line)
* `test`: opens Cypress debug view in local environment
* `test:run`: it will run all tests headlessly
### Repository guidelines
* The settings of the test suites are in `cypress.config.json`. Set the values such as domain and data provided in the main file.
* Data for tests into `fixtures/`. [Documentation](https://docs.cypress.io/api/commands/fixture)
* The test cases are into `e2e/` and the file naming is `<test-name>.cy.js`
* Custom commands `support/commands.js`







    







