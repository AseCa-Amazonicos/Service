describe('template spec', () => {
    it('passes', () => {
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/api/stock',
            },
            {
                statusCode: 200,
                body: [
                    {
                        productId: 1,
                        quantity: 10,
                        itemName: 'item1',
                    },
                    {
                        productId: 2,
                        quantity: 0,
                        itemName: 'item2',
                    },
                ],
            }
        ).as('getStock')

        cy.intercept(
            {
                method: 'POST',
                url: 'http://localhost:8080/api/order',
            },
            {
                statusCode: 200,
                body: {
                    status: 'NOT_STARTED',
                    totalAmount: 1,
                    address: 'Pilar',
                    products: [
                        {
                            productId: 1,
                            quantity: 1,
                        },
                    ],
                },
            }
        )
        cy.visit('http://localhost:3001/')
        cy.wait(3000)
        cy.wait('@getStock')
        cy.wait(3000)
        cy.get('#cart-list').should('be.empty')
        cy.wait(3000)
        cy.get('#product-list').children().should('have.length', 2)
        cy.wait(3000)
        cy.get('#product-list').children().eq(0).find('button').click()
        cy.wait(3000)
        cy.get('#cart-list').children().should('have.length', 1)
        cy.wait(3000)
    })
})
