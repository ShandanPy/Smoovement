# Test Instructions for PR Status Sync Workflow

## Overview
This PR implements a GitHub Action that automatically syncs the Execution board status based on PR lifecycle events and linked issues.

## What the Workflow Does

### Triggers
- **Pull Request Events**: `opened`, `reopened`, `review_requested`, `closed`
- **Issue Events**: `closed`, `reopened`

### Status Mapping
- **PR opened/reopened** → `In progress`
- **PR review_requested** → `In review` 
- **PR merged or issue closed** → `Done`
- **Issue reopened** → `To do`

### Key Features
- Parses `Closes #<n>` patterns in PR body to find linked issues
- Uses Projects v2 GraphQL API to update project item field values
- Safety gate: only runs when `vars.AUTOMATION_ENABLED == '1'`
- Handles multiple linked issues in a single PR
- Robust error handling with detailed logging

## Testing Instructions

### Prerequisites
1. Ensure `vars.AUTOMATION_ENABLED` is set to `'1'` in repository settings
2. Ensure `vars.REPO_EXEC_NUMBER` contains the Execution project number
3. Ensure `vars.ORG_LOGIN` contains the organization name
4. Ensure the repository has a token with project write permissions

### Test Scenarios

#### Test 1: PR with "Closes #" Pattern
1. Create a test issue in the repository
2. Create a PR with body containing `Closes #<issue_number>`
3. **Expected**: Issue status should change to "In progress" when PR opens
4. **Expected**: Issue status should change to "In review" when review is requested
5. **Expected**: Issue status should change to "Done" when PR is merged

#### Test 2: Issue Direct Events
1. Create a test issue in the Execution project
2. Close the issue directly
3. **Expected**: Issue status should change to "Done"
4. Reopen the issue
5. **Expected**: Issue status should change to "To do"

#### Test 3: PR Without "Closes #" Pattern
1. Create a PR without any "Closes #" patterns in the body
2. **Expected**: Workflow should run but skip status updates (no linked issues found)

#### Test 4: Multiple Linked Issues
1. Create multiple test issues
2. Create a PR with body containing multiple "Closes #" patterns
3. **Expected**: All linked issues should have their status updated

### Monitoring
- Check the Actions tab for workflow execution logs
- Verify status changes in the Execution project board
- Look for detailed console logs showing the sync process

### Troubleshooting
- If workflow fails, check token permissions
- Verify all required repository variables are set
- Check that the Status field exists in the Execution project
- Ensure status options match exactly: "To do", "In progress", "In review", "Done"

## Files Changed
- `.github/workflows/sync_status_from_pr.yml` - New workflow file

## Dependencies
- Uses `actions/github-script@v7` for GraphQL operations
- Requires Projects v2 API access
- Uses existing repository variables and secrets
