Feature: Ixigo Flight Automation Suite
#   Scenario Outline: Search and sort flights by cheapest fare
#     Given I navigate to the ixigo flights page
#     When I select "<Source>" as the source city
#     And I select "<Destination>" as the destination city
#     And I select the departure date "<Date>"
#     And I select 2 adults and click Done
#     And I click on the Search button
#     And I sort the results by "Cheapest"
#     Then I should see the flight results sorted by price

#     Examples:

#       | Source                    | Destination               | Date           |
#       | DELNew Delhi, Delhi,      | BOMMumbai, Maharashtra,   | May 30, 2026 |
#       | BLRBengaluru, Karnataka,  | MAAChennai, Tamil Nadu,   | May 21, 2026 |

#   # =======================================================================================================================
#   Scenario: Search and filter IndiGo flights from Mumbai to Hyderabad
#     Given I navigate to the ixigo flights page
#     When I select "BOMMumbai, Maharashtra," as the source city
#     And I select "HYDHyderabad, Telangana," as the destination city
#     And I select the departure date "May 24, 2026"
#     And I select 2 adults and click Done
#     And I click on the Search button
#     And I filter for the preferred airline
#     And I view and close flight details for the first result
#     And I click on the Book button for the first result
#     Then I should be redirected to the next page

# #=======================================================================================================================
#   Scenario: Search flight from Chennai to Bengaluru and attempt login
#     Given I navigate to the ixigo flights page
#     When I select "MAAChennai, Tamil Nadu," as the source city
#     And I select "BLRBengaluru, Karnataka," as the destination city
#     And I select the departure date "May 30, 2026"
#     And I select 2 adults and click Done
#     And I click on the Search button
#     And I filter for the preferred airline
#     And I select the first available flight
#     And I select the "Assured" fare option
#     And I open the login modal
#     And I enter the mobile number "86398773356" and click Continue
#     Then I should see the login modal or a validation state

# # #===========================================================================================================================
#   Scenario: Search and filter round trip flights from Bangkok to Goa
#     Given I navigate to the ixigo flights page
#     When I select the "Round Trip" tab
#     And I select "BKKBangkok, Bangkok," as the source city
#     And I select "GOIGoa, Goa, IndiaDabolim" as the destination city
#     And I select the departure date "May 20, 2026"
#     And I select the return date "May 25, 2026"
#     And I select 2 adults and click Done
#     And I click on the Search button
#     And I sort the results by "Quickest"
#     And I view and close flight details for the first result
#     And I click on the Book button for the first result
#     Then I should be on the booking review page

# =======================================================================================================================

  Scenario: Search and validate filtered flights from Delhi to Mumbai
  Given I navigate to the ixigo flights page
  When I select "DELNew Delhi, Delhi," as the source city
  And I select "BOMMumbai, Maharashtra," as the destination city
  And I select the departure date "May 28, 2026"
  And I select 2 adults and Business class and click Done
  And I click on the Search button
  And I sort the results by "Cheapest"
  And I view flight details for the first result
  And I close the flight details popup
  Then I should see the filtered list of flights displayed correctly
# =====================================================================================================================






