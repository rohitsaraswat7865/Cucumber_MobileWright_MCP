Feature: Smoke test

  Predonditions:
   Given Launch app 

  Scenario: App shows expected text
    Then I should see the text "Google"
    When I click on input text field
    And I type "claude"
    Then results should contain "Claude"
    And results should contain "https://claude.ai"