
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CheckoutPage extends Page {
    /**
     * define selectors using getter methods
     */
    get cartButton () {
        return $(".showcart");
    }

    get proceedToCheckoutButton () {
        return $("#top-cart-btn-checkout");
    }

    get firstNameInput () {
        return $("[name='firstname']");
    }
    
    get lastNameInput () {
        return $("[name='lastname']");
    }

    get companyInput () {
        return $("[name='company']");
    }

    get streetAddressInput () {
        return $("[name='street[0]']");
    }

    get cityInput () {
        return $("[name='city']");
    }

    get stateInput () {
        return $("[name='region_id']");
    }

    get zipCodeInput () {
        return $("[name='postcode']");
    }

    get countryInput () {
        return $("[name='country_id']");
    }
    
    get phoneNumberInput () {
        return $("[name='telephone']");
    }

    get shippingMethod () {
        return $(".col.col-method>input:nth-of-type(1)");
    }

    get continueButton () {
        return $("//button[@class='button action continue primary']");
    }

    get placeOrderButton () {
        return $("//button[@class='action primary checkout']");
    }

    get pageTitle () {
        return $("//h1[@class='page-title']");
    }

    get orderNumber () {
        return $(".order-number>strong");
    }

    get orderTotal () {
        return $("//tr[@class='grand totals']//span[@class='price']");
    }
        
    async fillCheckoutForm (firstName, lastName, company, streetAddress, city, state, zipCode, country, phoneNumber) {
        await (await this.firstNameInput).setValue(firstName);
        await (await this.lastNameInput).setValue(lastName);
        await (await this.companyInput).setValue(company);
        await (await this.streetAddressInput).setValue(streetAddress);
        await (await this.cityInput).setValue(city);
        await (await this.stateInput).selectByVisibleText(state);
        await (await this.zipCodeInput).setValue(zipCode);
        await (await this.countryInput).selectByVisibleText(country);
        await (await this.phoneNumberInput).setValue(phoneNumber);
    }
}

module.exports = new CheckoutPage();