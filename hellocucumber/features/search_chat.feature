Feature: As a user I want to be able to search for a particular chat

    Scenario Outline: I want the searched chat
        Given I am in the card view
        When I am logged with my Inrupt account
        And I write in the search field "<user>"
        And I click on the button next to the search field
        Then I should see my chat with "<user>"

    Examples:
            | user |
            | Mario |
            | Maria |
            | Paola |
