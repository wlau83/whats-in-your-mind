# Bug Report

## Project: What's on your mind

**Tester:** Wan Yee Lau
**Test Date:** June 17, 2026
**Project Type:** Full-stack personal thought journal web application
**Testing Type:** Manual Testing, Regression Testing, Deployment Smoke Testing

---

## 1. Overview

This bug report documents the main defects found during the development, testing, and deployment of **What's on your mind**, a full-stack private thought journal web application.

The bugs listed below were identified through manual testing, debugging, and post-deployment smoke testing. All listed bugs were fixed and re-tested.

---

## 2. Bug Summary

| Bug ID  | Summary                                                     | Severity | Priority | Status |
| ------- | ----------------------------------------------------------- | -------- | -------- | ------ |
| BUG-001 | 401 error after login when accessing protected routes       | High     | High     | Fixed  |
| BUG-002 | CORS issue after deployment                                 | High     | High     | Fixed  |
| BUG-003 | Pin / Unpin button state did not update immediately         | Medium   | Medium   | Fixed  |
| BUG-004 | Follow-up thread displayed duplicated or repetitive content | Medium   | Medium   | Fixed  |
| BUG-005 | Calendar selected date color was inconsistent               | Low      | Medium   | Fixed  |

---

## 3. Detailed Bug Reports

---

### BUG-001: 401 Error After Login

**Summary:**
User received a 401 unauthorized error after logging in and trying to access protected routes.

**Environment:**

* Frontend: React / Vite
* Backend: Node.js / Express
* Browser: Chrome
* Database: MongoDB Atlas

**Steps to Reproduce:**

1. Open the login page.
2. Enter valid email and password.
3. Submit the login form.
4. Access the protected dashboard route.

**Expected Result:**
User should be authenticated and able to access the dashboard.

**Actual Result:**
User received a 401 unauthorized error.

**Severity:** High
**Priority:** High
**Status:** Fixed

**Root Cause / Notes:**
The authentication token was not being handled correctly between the frontend and backend. The backend expected a valid token from either cookie or Authorization header.

**Fix Applied:**
Updated authentication handling to support token retrieval from cookies and Bearer token headers.

**Re-test Result:**
Passed. User can now log in and access protected dashboard routes successfully.

---

### BUG-002: CORS Issue After Deployment

**Summary:**
Deployed frontend was blocked when making API requests to the deployed backend.

**Environment:**

* Frontend: Deployed site
* Backend: Render
* Browser: Chrome

**Steps to Reproduce:**

1. Open the deployed frontend.
2. Log in or perform an action that sends an API request.
3. Check browser console and network tab.

**Expected Result:**
Frontend should successfully communicate with backend API.

**Actual Result:**
Request was blocked due to CORS configuration.

**Severity:** High
**Priority:** High
**Status:** Fixed

**Root Cause / Notes:**
The backend CORS origin did not match the deployed frontend URL.

**Fix Applied:**
Updated backend environment variable `CLIENT_URL` to match the deployed frontend URL and redeployed the backend.

**Re-test Result:**
Passed. Deployed frontend can now communicate with deployed backend successfully.

---

### BUG-003: Pin / Unpin Button State Did Not Update Immediately

**Summary:**
After pinning or unpinning a thought, the button state did not update immediately in the UI.

**Environment:**

* Frontend: React / Vite
* Browser: Chrome

**Steps to Reproduce:**

1. Log in to the application.
2. Create or select an existing thought.
3. Click the Pin button.
4. Observe the button state.
5. Click Unpin and observe the button state again.

**Expected Result:**
Button should update immediately between “Pin” and “Unpin”. The thought should also move correctly between Recent Thoughts and Pinned Thoughts.

**Actual Result:**
The thought was pinned or unpinned, but the UI button state did not update immediately.

**Severity:** Medium
**Priority:** Medium
**Status:** Fixed

**Root Cause / Notes:**
Frontend state was not updated immediately after the pin/unpin API response.

**Fix Applied:**
Updated the React state after successful pin/unpin action so the UI reflects the latest thought status without requiring a page refresh.

**Re-test Result:**
Passed. Pin and unpin actions now update immediately in the UI.

---

### BUG-004: Follow-up Thread Displayed Duplicated Content

**Summary:**
The follow-up thread section displayed duplicated or repetitive content, making the thread difficult to read.

**Environment:**

* Frontend: React / Vite
* Browser: Chrome

**Steps to Reproduce:**

1. Log in to the application.
2. Create a thought.
3. Add one or more follow-up thoughts.
4. Open the follow-up thread panel.

**Expected Result:**
The original thought should appear once, followed by its follow-up entries in a clear thread layout.

**Actual Result:**
The original thought or follow-up content appeared duplicated or visually repetitive.

**Severity:** Medium
**Priority:** Medium
**Status:** Fixed

**Root Cause / Notes:**
The thread UI had overlapping labels and repeated display elements.

**Fix Applied:**
Updated the follow-up thread layout. The section title was changed to “Follow-up Thread”, and repeated follow-up badges were removed to reduce duplication.

**Re-test Result:**
Passed. Follow-up thread now displays clearly without duplicated content.

---

### BUG-005: Calendar Selected Date Color Was Inconsistent

**Summary:**
Calendar selected date color was inconsistent depending on whether the date had a thought entry.

**Environment:**

* Frontend: React / Vite
* Browser: Chrome

**Steps to Reproduce:**

1. Log in to the application.
2. Open the dashboard calendar.
3. Select different dates, including dates with and without thoughts.

**Expected Result:**
Selected dates should use a consistent highlight color.

**Actual Result:**
Different selected colors appeared depending on the date state.

**Severity:** Low
**Priority:** Medium
**Status:** Fixed

**Root Cause / Notes:**
Calendar styling rules were inconsistent between selected dates and dates containing thoughts.

**Fix Applied:**
Updated calendar CSS so selected dates use the same highlight color consistently.

**Re-test Result:**
Passed. Calendar selected date color is now consistent.

---

## 4. Final Bug Status

| Metric               | Count |
| -------------------- | ----: |
| Total Bugs Reported  |     5 |
| Fixed Bugs           |     5 |
| Open Bugs            |     0 |
| High Severity Bugs   |     2 |
| Medium Severity Bugs |     2 |
| Low Severity Bugs    |     1 |

---

## 5. Conclusion

All documented bugs were fixed and re-tested successfully.

The most critical issues were related to authentication and deployment configuration. After fixing the 401 authentication error and CORS issue, the application was successfully tested in the deployed environment.

The remaining issues were related to UI state management and display consistency. These were fixed and confirmed through regression testing.

At the time of this report, there are no known critical open bugs.
