Feature: Search


  Scenario: Type in a search-term
    Given I am on the angular.io site
    When I type "foo" into the search input field 
    Then I should see some results in the search overlay