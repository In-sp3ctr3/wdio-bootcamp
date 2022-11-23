
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AddToCartPage extends Page {
    /**
     * define selectors using getter methods
     */
    get storeLogo () {
        return $(".logo>img");
    }

    get shopButton () {
        return $("//span[@class='action more button']");
    }

    get productContainer () {
        return $('products list items product-items');
    }

    get product () {
        return $(".list > li:nth-of-type(1) > div > a");
    }

    get stock () {
        return $(".stock > span");
    }

    get sizeButton () {
        return $("//div[@class='swatch-option text']");
    }

    get colorButton () {
        return $("//div[@class='swatch-option color']");
    }

    get quantity () {
        return $("//input[@id='qty']");
    }

    get addToCartButton () {
        return $('#product-addtocart-button');
    }

    get alertMessage () {
        return $("//div[@class='page messages']");
    }

    get counterNumber () {
        return $("//span[@class='counter-number']");
    }

    get counterIcon () {
        return $("[data-bind='css: { empty: !!getCartParam(\'summary_count\') == false && !isLoading() }, blockLoader: isLoading']");
    }

    get productTitle () {
        return $("//h1[@class='page-title']");
    }

}

module.exports = new AddToCartPage();