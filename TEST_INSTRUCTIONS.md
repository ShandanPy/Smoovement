# Test Instructions for Tasks to Execution Automation

## Overview
This PR adds a GitHub Action that automatically adds non-epic issues to the Execution (Projects v2) board when they are opened.

## Prerequisites
Before testing, ensure the following are configured:

### Repository Variables
- `AUTOMATION_ENABLED` = `'1'` (enables the automation)
- `ORG_LOGIN` = Your organization name
- `REPO_EXEC_NUMBER` = The project number of your Execution board

### Repository Secrets
- `GITHUB_TOKEN` (default) or `ORG_PROJECT_TOKEN` (fallback)
- Token must have `project` write permissions

## Test Scenarios

### Test 1: Non-Epic Issue Should Be Added to Execution Board
1. Create a new issue **without** the `epic` label
2. Verify the issue appears in your Execution project board
3. Check the Actions tab to confirm the workflow ran successfully
4. Expected result: Issue should be automatically added to Execution board

### Test 2: Epic Issue Should NOT Be Added to Execution Board
1. Create a new issue **with** the `epic` label
2. Verify the issue does NOT appear in your Execution project board
3. Check the Actions tab - the workflow should not run
4. Expected result: Issue should remain only in the Roadmap board (handled by existing epic workflow)

### Test 3: Safety Gate - Automation Disabled
1. Temporarily set `AUTOMATION_ENABLED` = `'0'`
2. Create a new non-epic issue
3. Verify the issue is NOT added to Execution board
4. Check Actions tab - workflow should not run
5. Set `AUTOMATION_ENABLED` back to `'1'`

### Test 4: Token Fallback
1. Ensure `GITHUB_TOKEN` is not available or lacks permissions
2. Ensure `ORG_PROJECT_TOKEN` is properly configured
3. Create a new non-epic issue
4. Verify the issue is still added to Execution board
5. Check Actions logs to confirm fallback token was used

## Verification Steps

### Check Workflow Execution
1. Go to Actions tab in your repository
2. Look for "Add Tasks to Execution" workflow runs
3. Verify successful completion with green checkmark
4. Review logs for any error messages

### Check Project Board
1. Navigate to your Execution project board
2. Look for newly created issues in the appropriate columns
3. Verify issue details are correctly displayed

### Check Issue Labels
1. Confirm non-epic issues don't have the `epic` label
2. Confirm epic issues have the `epic` label
3. Verify proper routing based on label presence

## Troubleshooting

### Common Issues
1. **Workflow not running**: Check `AUTOMATION_ENABLED` variable
2. **Permission errors**: Verify token has project write access
3. **Project not found**: Check `REPO_EXEC_NUMBER` variable
4. **Organization not found**: Check `ORG_LOGIN` variable

### Debug Information
- Workflow logs will show detailed error messages
- GraphQL queries and responses are logged
- Token fallback behavior is logged

## Rollback Plan
If issues arise:
1. Set `AUTOMATION_ENABLED` = `'0'` to disable automation
2. Manually remove any incorrectly added issues from Execution board
3. Fix configuration issues
4. Re-enable automation when ready

## Success Criteria
- ✅ Non-epic issues are automatically added to Execution board
- ✅ Epic issues are NOT added to Execution board
- ✅ Safety gate prevents execution when disabled
- ✅ Token fallback works correctly
- ✅ Comprehensive error handling and logging
- ✅ No impact on existing epic workflow functionality
