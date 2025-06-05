# Playwright Test Automation Framework

This repository contains Playwright automation scripts designed to test a web application. The framework is built to be robust, maintainable, and scalable, utilizing a clear separation of concerns with page object models and dedicated test files.

## Table of Contents

*   [Prerequisites](#prerequisites)
*   [Installation](#installation)
*   [Project Structure](#project-structure)
*   [Running Tests](#running-tests)
*   [Configuration](#configuration)
*   [Base Classes Overview](#base-classes-overview)
*   [Test Cases Overview](#test-cases-overview)
*   [Authentication](#authentication)
*   [Data Management](#data-management)

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18 or higher.
*   **npm** (Node Package Manager): Comes with Node.js.
*   **Playwright Browsers**: These will be installed automatically during the `npm install` step, but you can also install them manually if needed:
    ```bash
    npx playwright install
    ```

## Installation

To set up the project, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd pat_automation
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Project Structure

The project is organized into the following key directories:

*   `tests/`: Contains all the Playwright test specification files (`.spec.js` or `.spec.ts`). Each file typically focuses on testing a specific feature or flow of the application.
*   `BaseClass/`: Contains Page Object Model (POM) classes and helper functions. These classes encapsulate interactions with specific pages or components of the web application, promoting reusability and maintainability of test code.
*   `playwright.config.js`: The main configuration file for Playwright.
*   `auth.json`: Stores authentication state for logged-in sessions.
*   `loginData.json`: Contains test user login credentials.
*   `validationText.json`: Stores various validation texts or default names used across tests.

## Running Tests

To run the Playwright tests, use the following command:

```bash
npx playwright test
```

You can also run specific tests or use various Playwright CLI options:

*   **Run a specific test file**:
    ```bash
    npx playwright test tests/TC_001_programlistpage_navigation.spec.js
    ```
*   **Run tests in headed mode (browser UI visible)**:
    ```bash
    npx playwright test --headed
    ```
*   **Run tests on a specific browser (e.g., Firefox)**:
    ```bash
    npx playwright test --project=firefox
    ```
*   **Generate an HTML report after tests complete**:
    ```bash
    npx playwright test --reporter=html
    ```
    To open the report:
    ```bash
    npx playwright show-report
    ```

## Test Automation Flow

Here's a high-level overview of how the Playwright test automation scripts operate:

```mermaid
graph TD
    A[Start Test Execution] --> B{Initialize Playwright};
    B --> C[Load Authentication State (auth.json)];
    C --> D[Navigate to Application URL];
    D --> E{Execute Test Cases};
    E --> F[Interact with UI Elements];
    F --> G[Perform Assertions];
    G --> H{Generate Test Reports};
    H --> I[Capture Screenshots/Videos (on failure/configured)];
    I --> J[End Test Execution];
    E --> K{Utilize Base Classes};
    K --> F;
    K --> G;
```

## Configuration

The `playwright.config.js` file defines the Playwright test runner's behavior. Key configurations include:

*   `timeout`: Global timeout for tests (e.g., `120000` ms).
*   `testDir`: Specifies the directory where test files are located (`./tests`).
*   `fullyParallel`: Runs tests in parallel for faster execution.
*   `forbidOnly`: Fails the build if `test.only` is accidentally left in the code.
*   `retries`: Number of times to retry failed tests (e.g., `2` on CI).
*   `workers`: Number of parallel workers to use for running tests.
*   `reporter`: Configures the test reporter (e.g., `'html'` for an HTML report).
*   `use`: Defines shared settings for all projects, such as:
    *   `actionTimeout`: Timeout for individual actions (e.g., `10000` ms).
    *   `navigationTimeout`: Timeout for page navigations (e.g., `10000` ms).
    *   `expect.timeout`: Timeout for `expect` assertions (e.g., `30000` ms).
    *   `video`: Controls video recording for tests (`'on'` to record all videos).
    *   `trace`: Collects trace information for failed tests (`'on-first-retry'`).
*   `projects`: Defines different test projects, typically for various browsers (e.g., `chromium`).

## Base Classes Overview

The `BaseClass/` directory contains the following page object and helper classes:

*   `adminPages.js`: Contains methods for interacting with administrative pages, including user management (add/delete department, college, provost users) and navigation to various admin sections (templates, users, subplans, settings, rollover, recall requests, submit to PeopleSoft).
*   `checksheetCreation.js`: Provides functionalities related to checksheet creation and management, such as navigating to the checksheet page, creating blank checksheets, adding requirements (course, general studies, custom text), creating/editing course lists, approving checksheets, and creating subsections.
*   `programListPage.js`: Manages interactions with the program list page, including navigation, catalog year selection, status filtering, and page scrolling.
*   `ProgramSummary.js`: A foundational class providing common page navigation methods (e.g., `goto()`, `clickProgramsLink()`, `clickTemplateLink()`) and general assertions for program summary pages. It also includes methods for network simulation.
*   `templateCreation.js`: Handles operations related to template creation, including navigating to the template creation page, creating/deleting blank templates, adding/editing sections, adding section notes, managing text options (create/delete groups), and defining validation rules (credit hours, minimum grade).
*   `templateList.js`: Focuses on interactions with the template list page, including navigation, catalog year selection, sorting, and UI label verification.

## Test Cases Overview

The `tests/` directory houses individual test files, each named following a convention like `TC_XXX_feature_description.spec.js`. These files:

*   Import necessary page object classes from `BaseClass/`.
*   Use `test.beforeAll` and `test.afterAll` hooks for setup (e.g., setting up browser context with authentication) and teardown.
*   Contain `test()` blocks for individual test scenarios, using methods from the imported page objects to perform actions and `expect()` for assertions.

Examples of test functionalities include:

*   Program list page navigation, filtering, and status verification.
*   Template list navigation, sorting, and UI verification.
*   Dashboard navigation and details verification.
*   Template creation, section operations, requirement operations, text group operations, and validation.
*   Checksheet navigation, blank checksheet creation, course requirements, approval workflow, and subsection management.
*   Admin page navigation, subplan activation/deactivation, and user management.
*   Submit to PeopleSoft and recall request validations.

## Authentication

The framework uses `auth.json` to store the authentication state, allowing tests to run without repeatedly logging in. The `oneTimeLogin.js` script is used to generate this `auth.json` file initially.

## Data Management

*   `loginData.json`: Contains sensitive login credentials used for authentication.
*   `validationText.json`: Stores predefined text values, such as the default name for a new template, which are used for validation and consistency across tests.
