Feature: Error Management in Docker local Petstore API

  Background:
    Given the API base URL is set
    And I have a random pet payload

  # Negative Test 1: Get a pet with a non-existent ID
  Scenario: Try to get a pet with a non-existent ID
    Given I create and then delete a pet using its ID
    When I send a GET request to "/pet/{petId}" with the deleted pet's ID
    Then the response status code should be 404
    And the response message should be "Pet not found"

  # Negative Test 2: Update a pet with invalid data
  Scenario: Try to update a pet's information with a different ID
    Given I create a new pet with a POST request to "/pet"
    And I have an updated payload with a different ID
    When I send a PUT request to "/pet" with the updated payload
    Then the response status code should be 404

  # Negative Test 3: Send requests with invalid content types
  Scenario: Send requests with invalid content types
    Given I have a valid pet payload
    When I send a POST request to "/pet" with "text/plain" Content-Type
    Then the response status code should be 415
    And the response message should include 