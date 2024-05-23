# Running the Tests

To run the tests, follow these steps:

1.  **Clone the Repository: Clone the repository to your local machine using the following command:**

     `git clone https://github.com/SibelUlufer/spriteCloud.git`

2.  **Install Dependencies: Navigate to the project directory and install the necessary dependencies by running:**

     `npm install`

3.  **Run Cypress Tests: Execute the Cypress tests using the following command:**

     `npm run cy:e2e`

4.  **View Test Reports:**

    After the tests have been completed, you can view the test reports located in the cypress/results directory.
    mochawesome-report is being created after each run for the HTML report on the root.
    This HTML report is also being created on the Github actions as artifacts

# Test Description

    UI test environment `http://www.uitestingplayground.com/`

    The web application is based on the some actions that can be taken in any web applications.

    Before analyzing the importance of the actions, I took an action as considering the app as a usual web application.

  # UI TESTS

    Testing redirection of each links and checking the page texts, URL is the most important test case here.
      - Should click each item and match with the redirected page title

    Others are based on the functionality basically.
      - Should not login with invalid password
      - Should wait load time
      - Should scroll to the button

    API test environment  `https://petstore.swagger.io/`

    The swagger petstore is based on checking three different endpoints.
      - pet & order APIs
      - user APIs

    Created two different spec file based on the relation between the APIs.
    Created the tests based on the user journey covering negative scenarios.

  # pet & order API TESTS

    - Should create a pet and check
    - Should update the pet and check
    - Should not update the pet info with invalid petID
    - Should not return pet info with invalid ID
    - Should purchase the pet and check
    - Should delete the pet

  # user API TESTS

    - Should create a user and check
    - Should update user and check
    - Should delete the user

    Test datas are created dynamicaly via faker library.
    Used cypress-api-plugin to see request response flow on the Cypress open mood run.

# Script Description

  - `delete:reports` deletes all existing report files before running tests. Uses 'rm' command to remove files and folders recursively. The '|| true' ensures that the script continues even if there are no files to delete.
  - `report` runs Cypress tests and generates a test report using multiple reporters. The '--reporter' option specifies the reporter to use, and '--reporter-options' specifies additional options for the reporter, such as the configuration file.
  - `mochawesome:merge` merges all Mochawesome JSON report files into a single file called 'mochawesome.json', then generates an HTML report using 'marge'. The 'npx' command is used to execute packages installed locally.
  - `junit:merge` mMerges all JUnit XML report files into a single file called 'result.xml'. This command is typically used to merge test results from multiple test runs.
  - `cypress:run` runs Cypress tests after performing pre-test actions defined in the 'prereport' script. The '--browser' option specifies the browser to use for testing, in this case, Chrome.
  - `cy:e2e` runs end-to-end (e2e) Cypress tests, merges the JUnit and Mochawesome reports, and generates a combined HTML report. This script is used to execute all test-related tasks in sequence. Therefore is used in github workflow.


**Note:** There are many more test that can be run, and many more features that can be implemented. This is structured based on the assignment specifications.
