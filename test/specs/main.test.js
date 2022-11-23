const signUpPage = require('../pageobjects/signup.page');
const signupData = require('../testdata/signup.data');
const AddToCartPage = require('../pageobjects/addtocart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const checkoutData = require('../testdata/checkout.data');
const OrderHistoryPage = require('../pageobjects/orderHistory.page');

const orderDetails = {
    orderNumber: '',
    productName: '',
    productQuantity: 0,
    productColor: '',
    productSize: '',
    orderTotal: 0
}

describe('Sign up', () => {
    it('should sign up with valid credentials', async () => {
            //open sign up page
            await signUpPage.open();

            //verify url
            await expect(browser).toHaveUrl('https://magento.softwaretestingboard.com/customer/account/create/');

            //Check title
            await expect(signUpPage.signupTitle).toBeExisting();
            await expect(signUpPage.signupTitle).toHaveTextContaining(
                'Create New Customer Account');

            //Verify newsletter checkbox is clickable
            await expect(signUpPage.newsLetterCheckbox).toBeClickable();

            //Click sign up button to check validation
            signUpPage.signupButton.click();

            //Validation checks starts here
            const requiredFields = [ 'inputFirstname', 'inputLastname', 'email', 'inputPassword', 'confirmPassword' ];
            
            for ( const field of requiredFields ) {
                let error = ` ${await signUpPage[field].selector}` + '-error';
                
                await expect(signUpPage[field]).toHaveAttribute('aria-required', 'true');
                await expect(signUpPage[field]).toHaveAttribute('aria-invalid', 'true');
                await expect($(error)).toBeExisting();
            }

            //Password validation
            await signUpPage.signup(signupData[0].firstName, signupData[0].lastName, signupData[0].newsletter, signupData[0].email, signupData[0].password, signupData[0].password);
            await expect($('#password-error')).toBeExisting();
            await expect($('#password-error')).toHaveTextContaining('Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.');

            //Password confirmation validation
            await signUpPage.signup(signupData[2].firstName, signupData[2].lastName, signupData[2].newsletter, signupData[2].email, signupData[2].password, 'incorrectPassword');
            await $('#password-confirmation-error').waitForExist();
            await expect($('#password-confirmation-error')).toHaveTextContaining('Please enter the same value again.');

            //Email validation
            await signUpPage.signup(signupData[1].firstName, signupData[1].lastName, signupData[1].newsletter, signupData[1].email, signupData[1].password, signupData[1].password);
            await signUpPage.errorFlash.waitForExist();
            await expect(signUpPage.errorFlash).toHaveTextContaining('There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.');

            //valid sign up
            await expect(signUpPage.signupButton).toBeClickable();
            await expect(signUpPage.signupButton).toHaveAttributeContaining('type', 'submit');

            await signUpPage.signup(signupData[2].firstName, signupData[2].lastName, signupData[2].newsletter ,signupData[2].email, signupData[2].password, signupData[2].password);
            
            await expect(signUpPage.successMessage).toBeExisting();
            await expect(signUpPage.successMessage).toHaveTextContaining('Thank you for registering with');
        });

    describe('Add Product to Cart', () => {
        it('should successfully add product to cart', async () => {

            //wait for logo to be visible and click it to go to home page
            browser.waitUntil(AddToCartPage.storeLogo.isExisting(), 5000, 'Store logo is not displayed');
            await AddToCartPage.storeLogo.click();

            //check if products are already in cart and store the number in a variable
            const counterNumber = await AddToCartPage.counterNumber.isExisting() 
                ? await AddToCartPage.counterNumber.getText() : 0;
            
            //click on the call to action button
            await expect(AddToCartPage.shopButton).toBeClickable();
            await expect(AddToCartPage.shopButton).toBeExisting();
            await expect(AddToCartPage.shopButton).toHaveTextContaining('Shop');
            await AddToCartPage.shopButton.click();
            
            //check and click on the first product
            await expect(AddToCartPage.product).toBeExisting();
            await expect(AddToCartPage.product).toBeClickable();
            await AddToCartPage.product.click();

            //store product details in a an object
            orderDetails.productName =  await AddToCartPage.productTitle.getText();
            orderDetails.productQuantity = 1;
            orderDetails.productColor = await AddToCartPage.colorButton.getAttribute('option-label');
            orderDetails.productSize = await AddToCartPage.sizeButton.getText();

            //add to cart validation
            await (AddToCartPage.addToCartButton).waitForClickable();
            await AddToCartPage.addToCartButton.click();  
            await expect($('.mage-error')).toBeExisting();

            //select color, size and quantity and add to cart
            await AddToCartPage.sizeButton.click();
            await AddToCartPage.colorButton.click();
            await AddToCartPage.quantity.setValue(orderDetails.productQuantity);
            await AddToCartPage.addToCartButton.click();   

            await expect(AddToCartPage.alertMessage).toBeExisting();
            await expect(AddToCartPage.alertMessage).toHaveTextContaining('You added');

            //check if product is added to cart by verifying the counter number
            await AddToCartPage.counterNumber.waitForExist();
            await expect(AddToCartPage.counterNumber).toBeExisting();
            await expect(AddToCartPage.counterNumber).toHaveTextContaining(counterNumber + orderDetails.productQuantity);

            });
    }); 

    // describe checkout 
    describe('Checkout', () => {
        it('should successfully checkout', async () => {

            //click on the cart icon
            await CheckoutPage.cartButton.click();

            //click on the proceed to checkout button
            await CheckoutPage.proceedToCheckoutButton.waitForClickable();
            await CheckoutPage.proceedToCheckoutButton.click();

            //fill in the billing address form
            await CheckoutPage.firstNameInput.waitForEnabled();
            await CheckoutPage.fillCheckoutForm(checkoutData.firstName, checkoutData.lastName, checkoutData.company, checkoutData.streetAddress, checkoutData.city, checkoutData.state, checkoutData.zipCode, checkoutData.country, checkoutData.phoneNumber);
            await CheckoutPage.shippingMethod.click();
            await CheckoutPage.continueButton.click();

            //checkout
            orderDetails.orderTotal = await CheckoutPage.orderTotal.getText();
            await CheckoutPage.placeOrderButton.waitForClickable();
            await CheckoutPage.placeOrderButton.click();

            //success message
            await expect(CheckoutPage.pageTitle).toBeExisting();
            await expect(CheckoutPage.pageTitle).toHaveTextContaining('Thank you for your purchase!');
            orderDetails.orderNumber = await CheckoutPage.orderNumber.getText();
        });
    });

    describe('View Order History', () => {
        it('should successfully view order history', async () => {

            await OrderHistoryPage.accountDropdown.click();
            await OrderHistoryPage.accountLink.waitForClickable();
            await OrderHistoryPage.accountLink.click();

            await OrderHistoryPage.myOrdersButton.waitForClickable();
            await OrderHistoryPage.myOrdersButton.click();

            await OrderHistoryPage.viewOrderButton.waitForClickable();
            await OrderHistoryPage.viewOrderButton.click();

            //verify details match
            await expect(OrderHistoryPage.orderNumber).toHaveTextContaining(orderDetails.orderNumber);
            await expect(OrderHistoryPage.totalAmount).toHaveTextContaining(orderDetails.orderTotal);
            await expect(OrderHistoryPage.productName).toHaveTextContaining(orderDetails.productName);
            await expect(OrderHistoryPage.productQuantity).toHaveTextContaining(orderDetails.productQuantity);
            await expect(OrderHistoryPage.productColor).toHaveTextContaining(orderDetails.productColor);
            await expect(OrderHistoryPage.productSize).toHaveTextContaining(orderDetails.productSize);

        });
    });
});

