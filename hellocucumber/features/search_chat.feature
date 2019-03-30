Feature: As a user I want to be able to search for a particular chat

Scenario: I want to see the home page
    Given I am in the index view
    When I am logged with my Inrupt account
    When I write in the search field "mario"
    When I click on the button next to the search field
    Then I should see my chat with "Mario"