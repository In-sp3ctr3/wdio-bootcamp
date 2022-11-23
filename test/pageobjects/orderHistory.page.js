
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OrderHistoryPage extends Page {

    get accountDropdown () {
        return $(".panel.header>ul>li:nth-child(2)>span>button");
    }

    get accountLink () {
        return $(".header.links>li>a:nth-child(1)");
    }

    get myOrdersButton () {
        return $(".nav.items>li:nth-child(2)>a");
    }

    get viewOrderButton () {
        return $("//span[.='View Order']")
    }

    get orderNumber () {
        return $(".page-title>span");
    }

    get productName () {
        return $("//strong[@class='product name product-item-name']");
    }

    get productSize () {
        return $(".item-options>dd:nth-of-type(1)");
    }

    get productColor () {
        return $(".item-options>dd:nth-of-type(2)");
    }

    get productQuantity () {
        return $(".items-qty>li>span:nth-of-type(2)");
    }

    get totalAmount () {
        return $("[data-th='Grand Total'] .price");
    }
    
}

module.exports = new OrderHistoryPage();