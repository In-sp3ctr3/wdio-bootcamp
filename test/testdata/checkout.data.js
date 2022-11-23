const signupData = require("./signup.data");

const checkoutData = 
{
    "firstName": signupData[2].firstName,
    "lastName": signupData[2].lastName,
    "company": "Company",
    "streetAddress": "123 Main St",
    "city": "New York",
    "state": "Alabama",
    "zipCode": "10001",
    "country": "Jamaica",
    "phoneNumber": "1234567890"
}

module.exports = checkoutData;