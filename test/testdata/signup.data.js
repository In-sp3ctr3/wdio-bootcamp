
const signupData = [
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: `test${ Date.now() }@email.com`,
        newsletter: false,
        password: `test`
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: `roni_cost@example.com`,
        newsletter: false,
        password: `Password123`
    },
    {
        firstName: 'Test',
        lastName: 'User',
        email: `test${ Date.now() }@email.com`,
        newsletter: true,
        password: `JadanTest${ Date.now() }`
    }
];

module.exports = signupData;