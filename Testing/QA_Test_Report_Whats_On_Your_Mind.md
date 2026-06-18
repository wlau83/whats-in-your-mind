# QA Test Report

## Project: What's on your mind

**Tester:** Wan Yee Lau
**Test Date:** June 17, 2026
**Project Type:** Full-stack personal thought journal web application
**Testing Type:** Manual Functional Testing, Smoke Testing, Regression Testing
**Test Environment:**

* Frontend: React / Vite
* Backend: Node.js / Express
* Database: MongoDB Atlas
* Browser: Chrome
* Deployment: Frontend and backend deployed online

---

## 1. Project Overview

**What's on your mind** is a private thought journal web application that allows users to register, log in, create personal thoughts, manage follow-up threads, pin important thoughts, search previous entries, and view thought activity through a calendar.

The purpose of this QA test report is to verify that the main user flows work correctly after development and deployment.

---

## 2. Scope of Testing

The following areas were tested:

* User registration
* User login
* Authentication and protected routes
* Thought creation
* Thought editing
* Thought deletion
* Pin and unpin functionality
* Follow-up thread functionality
* Search functionality
* Calendar date highlighting
* Logout
* Basic post-deployment smoke testing

---

## 3. Features Tested

| Feature            | Description                              | Status |
| ------------------ | ---------------------------------------- | ------ |
| Register           | User can create a new account            | Pass   |
| Login              | User can log in with valid credentials   | Pass   |
| Protected Route    | Dashboard is only accessible after login | Pass   |
| Create Thought     | User can create a new thought            | Pass   |
| Edit Thought       | User can update an existing thought      | Pass   |
| Delete Thought     | User can delete a thought                | Pass   |
| Pin Thought        | User can pin and unpin a thought         | Pass   |
| Follow-up Thread   | User can add follow-up thoughts          | Pass   |
| Search             | User can search thoughts by keyword      | Pass   |
| Calendar Highlight | Dates with thoughts are highlighted      | Pass   |
| Logout             | User can log out successfully            | Pass   |

---

## 4. Test Cases

| Test Case ID | Test Scenario                | Test Steps                                                                 | Expected Result                                                 | Actual Result                                                    | Status |
| ------------ | ---------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| TC-001       | Register new account         | Open Register page, enter valid username, email, and password, submit form | Account is created successfully                                 | Account was created successfully                                 | Pass   |
| TC-002       | Login with valid account     | Open Login page, enter valid email and password, submit form               | User is redirected to dashboard                                 | User was redirected to dashboard                                 | Pass   |
| TC-003       | Access protected dashboard   | Visit dashboard after login                                                | Dashboard loads successfully                                    | Dashboard loaded successfully                                    | Pass   |
| TC-004       | Block unauthenticated access | Log out, then try to access dashboard directly                             | User is redirected to login page                                | User was redirected to login page                                | Pass   |
| TC-005       | Create new thought           | Enter thought content, mood, and tags, then submit                         | New thought appears in recent thoughts list                     | New thought appeared in recent thoughts list                     | Pass   |
| TC-006       | Edit existing thought        | Click edit on an existing thought, update content, save changes            | Updated thought is displayed correctly                          | Updated thought was displayed correctly                          | Pass   |
| TC-007       | Delete thought               | Click delete on an existing thought and confirm                            | Thought is removed from the list                                | Thought was removed from the list                                | Pass   |
| TC-008       | Pin thought                  | Click pin on a thought                                                     | Thought appears in pinned section and button state updates      | Thought appeared in pinned section and button state updated      | Pass   |
| TC-009       | Unpin thought                | Click unpin on a pinned thought                                            | Thought is removed from pinned section and button state updates | Thought was removed from pinned section and button state updated | Pass   |
| TC-010       | Add follow-up thought        | Open a thought thread and submit a follow-up                               | Follow-up appears under the original thought                    | Follow-up appeared under the original thought                    | Pass   |
| TC-011       | Search thoughts              | Enter keyword in search bar                                                | Matching thoughts are displayed                                 | Matching thoughts were displayed                                 | Pass   |
| TC-012       | Calendar highlight           | Create a thought and check calendar                                        | The date with the thought is highlighted                        | The date with the thought was highlighted                        | Pass   |
| TC-013       | Logout                       | Click logout button                                                        | User is logged out and redirected appropriately                 | User was logged out successfully                                 | Pass   |
| TC-014       | Post-deployment smoke test   | Open deployed site and test login, create thought, and logout              | Core features work on deployed version                          | Core features worked on deployed version                         | Pass   |

---

## 5. Defect Log

| Bug ID  | Summary                                       | Steps to Reproduce                          | Expected Result                                             | Actual Result                                | Severity | Priority | Status |
| ------- | --------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------- | -------- | -------- | ------ |
| BUG-001 | 401 error after login                         | Log in and access protected route           | User should access dashboard successfully                   | User received 401 unauthorized error         | High     | High     | Fixed  |
| BUG-002 | CORS issue after deployment                   | Open deployed frontend and call backend API | API request should be accepted                              | Request was blocked by CORS policy           | High     | High     | Fixed  |
| BUG-003 | Pin button state did not update immediately   | Pin or unpin a thought                      | Button should update between Pin and Unpin immediately      | Button state did not update until refresh    | Medium   | Medium   | Fixed  |
| BUG-004 | Follow-up thread displayed duplicated content | Open thought thread with follow-ups         | Original thought and follow-ups should display clearly once | Content appeared duplicated or repetitive    | Medium   | Medium   | Fixed  |
| BUG-005 | Calendar selected date color was inconsistent | Select dates on calendar                    | Selected date should use consistent highlight color         | Different colors appeared depending on state | Low      | Medium   | Fixed  |

---

## 6. Regression Testing Summary

Regression testing was performed after fixing authentication, CORS, pin/unpin, thread display, and calendar UI issues.

The following areas were re-tested:

* Login and protected route access
* Thought CRUD operations
* Pin and unpin behavior
* Follow-up thread display
* Calendar highlighting
* Search results
* Logout behavior
* Deployed application smoke testing

All regression test cases passed successfully.

---

## 7. Test Summary

| Metric             | Count |
| ------------------ | ----: |
| Total Test Cases   |    14 |
| Passed             |    14 |
| Failed             |     0 |
| Pending            |     0 |
| Bugs Found         |     5 |
| Bugs Fixed         |     5 |
| Open Critical Bugs |     0 |

---

## 8. Overall Result

The main user flows of **What's on your mind** were tested manually, including authentication, thought management, pinning, follow-up threads, search, calendar highlighting, and logout.

Several issues were found during development and deployment, including authentication errors, CORS configuration issues, UI state update problems, and display inconsistencies. These issues were debugged, fixed, and included in regression testing.

All 14 manual test cases passed. No critical open bugs remain at the time of testing. The project is stable for portfolio demonstration.

---

## 9. Recommendation

Before presenting the project in a portfolio or job application, the following improvements are recommended:

* Add screenshots of key test results
* Add a short QA summary to the README
* Add one automated test demo using Selenium or Playwright
* Keep a separate bug report file for fixed issues
* Re-test the deployed version after future updates
