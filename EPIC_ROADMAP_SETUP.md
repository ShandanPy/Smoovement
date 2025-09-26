# Epic to Roadmap Automation Setup

This document explains how to set up and test the GitHub Action that automatically adds epic-labeled issues to your organization's roadmap.

## Overview

The workflow `.github/workflows/epics_to_roadmap.yml` automatically adds any issue labeled with `epic` to your organization's Projects v2 roadmap when:
- An issue is opened or labeled
- The issue has the `epic` label
- The `AUTOMATION_ENABLED` variable is set to `'1'`

## Required Setup

### 1. Repository Secrets

Add the following secret to your repository:

- **`ORG_PROJECT_TOKEN`**: A GitHub Personal Access Token (PAT) with the following permissions:
  - `repo` (full repository access)
  - `read:org` (read organization membership)
  - `project` (full project access)

### 2. Repository Variables

Add the following variables to your repository:

- **`ORG_LOGIN`**: Your organization's login name (e.g., `my-org`)
- **`ORG_ROADMAP_NUMBER`**: The project number of your roadmap project (e.g., `123`)
- **`AUTOMATION_ENABLED`**: Set to `'1'` to enable the automation, `'0'` to disable

### 3. How to Set Variables and Secrets

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Under **Repository secrets**, add `ORG_PROJECT_TOKEN`
4. Under **Repository variables**, add:
   - `ORG_LOGIN`
   - `ORG_ROADMAP_NUMBER` 
   - `AUTOMATION_ENABLED`

### 4. Finding Your Project Number

To find your organization's roadmap project number:

1. Go to your organization's Projects v2 page
2. Open the roadmap project
3. The project number is in the URL: `https://github.com/orgs/YOUR_ORG/projects/PROJECT_NUMBER`

## Testing the Workflow

### Test Scenario 1: Enable Automation and Add Epic Label

1. Ensure `AUTOMATION_ENABLED` is set to `'1'`
2. Create a new issue in the repository
3. Add the `epic` label to the issue
4. Check the **Actions** tab to see if the workflow runs successfully
5. Verify the issue appears in your organization's roadmap project

### Test Scenario 2: Disable Automation

1. Set `AUTOMATION_ENABLED` to `'0'`
2. Create a new issue and add the `epic` label
3. The workflow should not run (check the Actions tab)

### Test Scenario 3: Non-Epic Issues

1. Ensure `AUTOMATION_ENABLED` is set to `'1'`
2. Create a new issue without the `epic` label
3. The workflow should not run

## Troubleshooting

### Common Issues

1. **"Resource not accessible by integration"**
   - Ensure your `ORG_PROJECT_TOKEN` has the correct permissions
   - Verify the token is not expired

2. **"Project not found"**
   - Double-check your `ORG_LOGIN` and `ORG_ROADMAP_NUMBER` variables
   - Ensure the project number is correct and the project exists

3. **Workflow not triggering**
   - Verify the issue has the exact label `epic` (case-sensitive)
   - Check that `AUTOMATION_ENABLED` is set to `'1'`

### Debugging

- Check the **Actions** tab in your repository for workflow run logs
- Look for any error messages in the workflow output
- Verify all secrets and variables are set correctly

## Security Notes

- The `ORG_PROJECT_TOKEN` should be a dedicated PAT with minimal required permissions
- Consider using organization-level secrets if this workflow will be used across multiple repositories
- Regularly rotate your PAT for security

## Workflow Details

The workflow uses the GitHub GraphQL API to add issues to Projects v2. It:
1. Triggers on issue `opened` and `labeled` events
2. Checks if the issue has the `epic` label
3. Verifies that automation is enabled
4. Calls the `addProjectV2ItemById` mutation to add the issue to the roadmap
5. Logs the result for debugging purposes
