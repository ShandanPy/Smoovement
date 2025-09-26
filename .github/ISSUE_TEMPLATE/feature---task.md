---
name: Feature / Task
about: Feature or Task to be implemented by Cursor
title: ''
labels: feat
assignees: ''

---

## Summary
[Short description of the feature/task and why it matters]

## Cursor Prompt (step-by-step)
- Goal: [clear goal statement]
- Tasks:
  1) [step one]
  2) [step two]
  3) [etc...]
- Deliverable: [what the PR must include]
- Acceptance: [criteria to mark complete]

## Scope & Constraints
- In scope:
- Out of scope (MVP deferrals):

## Dependencies / Links
- Related issues/PRs:
- External docs/refs:

## Risks & Mitigations
- Risk:
- Mitigation:

## Rollout & Validation
- How to test:
- Post-merge checks:

## Summary
[Short description of the feature/task and why it matters]

## Cursor Prompt (step-by-step)
- Goal: [clear goal statement]
- Tasks:
  1) [step one]
  2) [step two]
  3) [etc...]
- Deliverable: [what the PR must include]
- Acceptance: [criteria to mark complete]

## Scope & Constraints
- In scope:
- Out of scope (MVP deferrals):

## Dependencies / Links
- Related issues/PRs:
- External docs/refs:

## Risks & Mitigations
- Risk:
- Mitigation:

## Rollout & Validation
- How to test:
- Post-merge checks:

---

## Cursor Work Contract
- Write tests alongside code (same PR).
- Keep functions small/pure; add unit tests incl. edge cases.
- Add integration tests for API/DB paths.
- Prove idempotency where specified (re-run test shows no dupes).
- Update README/examples if behavior or env vars change.

## ✅ Testing
### Unit
- [ ] Cover happy + edge cases for helpers in this issue.
- [ ] Errors throw with clear messages.

### Integration (API/DB)
- [ ] Auth/tenancy enforced (no cross-user data).
- [ ] Valid → 2xx; invalid → 4xx; errors handled.
- [ ] Re-run idempotent ops with no duplicates/side effects.

### Manual QA
- [ ] PR describes end-to-end steps.
- [ ] Friendly errors; attach screenshots/GIF for UI.

### Done when
- [ ] CI (lint, typecheck, tests, build) is green.
- [ ] PR links this issue and includes brief test notes.
