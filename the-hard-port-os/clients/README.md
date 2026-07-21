# Clients

Active and archived client workspaces.

## Template

Duplicate [`_TEMPLATE/`](./_TEMPLATE/) for each new entity. Assign ID at application receipt (e.g. `THP-CLIENT-001`).

## Rules

- Client source data in `00`–`08`
- THP institutional learning in `09-institutional-learning/` only
- Track pipeline in [`operations/first-client-readiness/templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv`](../operations/first-client-readiness/templates/THP-LIFECYCLE-PIPELINE-TRACKER.csv)
- **One active diagnostic or intervention client** during field-validation cycle

Do not commit sensitive client data to git unless explicitly intended and secured.
