Feature: As a user I want to be able to search for a particular chat

    Scenario Outline: I want the searched chat
        Given I am logged and in the chat view
        When I access to the Chat View
        And I write in the search field "<user>"
        And I click on the button next to the search field
        Then I should see my chat with "<user>"

    Examples:
            | user |
            | Mario |
            | Maria |
            | Paola |
