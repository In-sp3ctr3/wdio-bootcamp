

const Page = require('./page');

class SignupPage extends Page {

    get signupTitle () {
        return $('.base');
    }

    get inputFirstname () {
        return $('#firstname');
    }

    get inputLastname () {
        return $('#lastname');
    }

    get inputPassword () {
        return $('#password');
    }

    get confirmPassword () {
        return $('#password-confirmation');
    }

    get newsLetterCheckbox () {
        return $('#is_subscribed');
    }

    get email () {
        return $('#email_address');
    }

    get signupButton () {
        return $('.submit');
    }

    get errorFlash () {
        return $('.message-error');
    }

    get successMessage () {
        return $('.message-success');
    }

    async signup (firstname, lastname, newsletter, email, password, confirmPassword ) {
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);

        if( newsletter ) {
            await this.newsLetterCheckbox.click();
        } 

        await this.email.setValue(email);
        await this.inputPassword.setValue(password);
        await this.confirmPassword.setValue(confirmPassword);
        await this.signupButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('customer/account/create/');
    }
}

module.exports = new SignupPage();
