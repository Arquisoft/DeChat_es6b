Feature: As a user I want to start a new chat with other user

    Scenario Outline: I want to start a new chat
        Given I am logged and in the chat view
        Then I write in input_add_webid the "<webID>"
        And I press the button next to the field
        Then I should see in the list of active chats the new chat

    Examples:
        | webID |
        |  |
        |  |