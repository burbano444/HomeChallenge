Feature: Edge Cases for Adding Pets in Docker local Petstore API

  Background:
    Given the API base URL is set
    And I have a random pet payload

  # Edge Case 1: Add a pet with large data fields
  Scenario: Add a pet with large data fields
    Given I assign large data to the pet
    When I send a POST request to "/pet" with the pet payload
    Then the response status code should be 200
    And the response should include the pet's ID as 999
    And the response should include the pet's name with large data
    And the response should include 1000 photo URLs in the pet's details

  # Edge Case 2: Add a pet with minimal data
  Scenario: Add a pet with minimal data
    Given I assign minimal data to the pet
    When I send a POST request to "/pet" with the pet payload
    Then the response status code should be 200
    And the response should include the pet's ID as 1000
    And the response should include the pet's name as "Minimal Pet"
    And the pet's photo URLs array should be empty
    And the pet's tags array should be empty
    And the pet's status should be empty
