Feature: As a user I want to be able to search for a particular chat

Scenario: I want to see the home page
    Given I am logged and in the chat view
    When I write in the search field "mario"
    And I click on the button next to the search field
    Then I should see my chat with "Mario"