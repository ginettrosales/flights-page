describe("More United deals on Chicago (ORD) to San Francisco (SFO) flights", () => {
  let departure, arrival;

  before(() => {
    cy.intercept("/url").as("@req")
    cy.visit("/slug")
    cy.get("departureInput")
      .invoke("val")
      .then((val) => {
        departure = val
      })
    cy.get("arrivalInput")
      .invoke("val")
      .then((val) => {
        arrival = val
      })
  })
  context("Test case 001 - Validate first table info view", () => {
    it('Should From value be equal to "Input departure airport"', () => {
      cy.results(
        "table > tbody > tr:nth-child(n) > td:nth-child(1)",
        "contain",
        departure
      )
    })
    it('Should To value be equal to "Input arrival airport"', () => {
      cy.results(
        "table > tbody > tr:nth-child(n) > td:nth-child(2)",
        "contain",
        arrival
      )
    })
    it("Should date cell not be empty", () => {
      cy.results(
        "table > tbody > tr:nth-child(n) > td:nth-child(3)",
        "not.be.empty",
        ""
      )
    })
    it('Should the price cell contain the "From price"', () => {
      cy.results(
        'table > tbody > tr:nth-child(n) > td:nth-child(5) > div.[data-test="price"]',
        "not.be.empty",
        ""
      )
    })
    it('Should the price cell contain the "From price" monthly quote', () => {
      cy.results(
        "table > tbody > tr:nth-child(n) > td:nth-child(5) > div.up-flight-pill > a.up-info-open",
        "not.be.empty",
        ""
      )
    })
    it('Should price cell contain the "view" input', () => {
      cy.results(
        'table > tbody > tr:nth-child(n) > td:nth-child(5) > p[data-test="last-seen"]',
        "not.be.empty",
        ""
      )
    })
  })

  context(
    "Test case 002 - Validate the functionality of the pagination controls",
    () => {
      beforeEach(() => {
        cy.get('button[data-test="view-more"]').click()
      })
      it("Should allow to navigate to next page", () => {
        cy.wait("@req").its("response.statusCode").should("eq", 200)
        cy.wait("@req").its("request.body.param").should("eq", 2)
        cy.get("table > tbody > tr").its("length").should("be.gt", 20)
      })

      it("Should allow to navigate to previus page", () => {
        cy.get('button[data-test="view-more"]').click()
        
        cy.wait("@req").its("response.statusCode").should("eq", 200)
        cy.wait("@req").its("request.body.param").should("eq", 1)
        cy.get("table > tbody > tr").its("length").should("be.lt", 21)
      })
    }
  )

  context(
    "Test case 003 - Verify filtering functionaly by maximum budget",
    () => {
      it("Should price be smaller or equal to 300", () => {
        cy.get("input").type("300")

        cy.wait("@req").its("response.statusCode").should("eq", 200)
        cy.wait("@req").its("request.body.param").should("eq", 300)
        cy.prices(
          'table > tbody > tr:nth-child(n) > td:nth-child(5) > div.[data-test="price"]',
          "be.lte",
          "300"
        )
      })
    }
  )

  context(
    "Test case 004 - Verify filtering functionality by cabin class",
    () => {
      it("Should display info banner", () => {
        cy.get("select").select("PREMIUM_ECONOMY")

        cy.wait("@req").its("response.statusCode").should("eq", 200)
        cy.wait("@req")
          .its("request.body.param")
          .should("eq", "PREMIUM_ECONOMY")
        cy.get("banner").should(
          "contain",
          "There are no fares that match your filter"
        )
      })
    }
  )

  context("Test case 005 - Verify select flight functionality", () => {
    it("Should display a modal with flight details", () => {
      cy.randomItem("flightItem")

      cy.get("modal").should("be.visible")
      cy.get("modalTitle").should("be.eq", "Book your flight")
      cy.get("modalFrom").should("contain", departure)
      cy.get("modalTo").should("contain", arrival)
      cy.get("modalDeparture").should("not.be.empty")
      cy.get("modalReturn").should("not.be.empty")
    })
  })
})
