Feature: As a user I want to be able to delete a chat from de list of active chats

    Scenario: I want to delete a chat
        Given I am logged and in the chat view
        And I press the delete button of the first chat from the list
        Then I should not see the chat anymore