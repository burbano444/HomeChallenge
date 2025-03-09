Feature: CRUD Operations in Docker local Petstore API

  Background:
    Given the API base URL is set
    And I have a random pet payload

  # Positive Tests
  Scenario: Add a new pet and verify its details
    When I send a POST request to "/pet" with the pet payload
    Then the response status code should be 200
    And the response should include the created pet's details
    And the pet's data structure should be valid

    When I send a GET request to "/pet/{petId}"
    Then the response status code should be 200
    And the response should include the created pet's details
    And the pet's data structure should be valid

  Scenario: Update a pet's information and confirm changes
    Given I create a new pet with a POST request to "/pet"
    And I have an updated payload for the same pet ID
    When I send a PUT request to "/pet" with the updated payload
    Then the response status code should be 200

    When I send a GET request to "/pet/{petId}"
    Then the response status code should be 200
    And the response should reflect the updated pet's details
    And the name of the pet should not match the original

  Scenario: Delete a pet and ensure it is removed from the system
    Given I create a new pet with a POST request to "/pet"
    When I send a DELETE request to "/pet/{petId}"
    Then the response status code should be 200
    And the response message should be "Pet deleted"

    When I send a GET request to "/pet/{petId}"
    Then the response status code should be 404
    And the response message should indicate "Pet not found"
