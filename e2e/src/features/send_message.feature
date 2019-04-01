Feature: As a user I want to be able to send a message to other user

    Scenario Outline: I want to send a message and see it
        Given I am logged and in the chat view
        When I choose the first chat of the list
        And I write a "<message>" on the input_msg_write
        Then I should see the new message on the chat
        And The other user should be able to see it too

    Examples:
        | message |
        | example |
        | prueba |
        | heyyyy |