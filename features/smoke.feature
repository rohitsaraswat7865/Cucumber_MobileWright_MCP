Feature: Smoke test

  Scenario: App shows expected text
    When I open new chrome tab in incognito mode
    Then I should see the text "Google"
    When I click on input text field
    And I type "claude"
    Then results should contain "Claude"
    And results should contain "https://claude.ai"
    When I clear input text filed
    And I click on input text field
    And I type "ChatGpt"
    Then results should contain "ChatGpt"
    