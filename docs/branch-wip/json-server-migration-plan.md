# JSON Server Migration Plan

## Goal

Replace the previous in-repo TypeScript mock implementation with a real HTTP mock layer based on `json-server`, while keeping the frontend structure aligned with a future Rust backend.

The frontend should behave like a real app:

- pages do not import mock data directly
- hooks do not know whether the backend is mock or real
- API clients speak stable HTTP contracts
- mock-specific query syntax does not leak into frontend code

## Current Status

The migration is now functionally complete.

Completed:

- old `src/api/modules/*` chain removed
- old `src/composables/*` chain removed from runtime
- old in-memory `src/mock/*` implementation removed
- frontend runtime uses only `src/api/*/http.ts`
- local `mock-server/*` is the only mock data source

Current active structure:

```text
src/
  api/
    account/
      account.client.ts
      account.contract.ts
      account.http.ts
      account.types.ts
    auth/
      auth.client.ts
      auth.contract.ts
      auth.http.ts
      auth.types.ts
    events/
      events.client.ts
      events.contract.ts
      events.http.ts
      events.types.ts
    profiles/
      profiles.client.ts
      profiles.contract.ts
      profiles.http.ts
      profiles.types.ts
    shared/
      http.ts
  hooks/
  mappers/
  types/vm/
mock-server/
    db.json
    config.js
    server.js
```

## Design Principles

### 1. Frontend contracts follow future Rust API, not `json-server`

Frontend requests look like:

- `GET /api/profiles/self`
- `GET /api/profiles/family`
- `GET /api/profiles/:id`
- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/account/overview`
- `POST /api/auth/login`
- `POST /api/auth/register`

Frontend must not rely on:

- `?_expand=`
- `?_embed=`
- `?_like=`
- raw collection names as public API
- `json-server` pagination conventions as contract

### 2. `db.json` is storage only

`db.json` holds normalized or semi-normalized source data.

Recommended top-level collections:

- `profiles`
- `events`
- `accounts`
- `user_registrations`
- `favorite_profiles`
- `message_threads`
- `privacy_settings`
- `auth_users`

Recommended key rules:

- every collection uses stable `id`
- relations use explicit foreign keys
- no page-level view model fields in `db.json`
- no frontend-only display labels in `db.json`

### 3. Middleware owns aggregation

The following endpoints are implemented in `mock-server/server.js`, not by raw `json-server` passthrough:

- profile directory filtering
- profile directory sorting
- profile directory pagination
- profile directory facets
- event detail related-profiles recommendation
- account overview aggregation
- login/register response shaping

This mirrors the real backend boundary and prevents frontend leakage of mock-specific logic.

### 4. i18n remains frontend-owned

Localized copy that is already in i18n stays in i18n.

API should only return:

- stable enums
- raw values
- localized content only when the resource itself is multilingual content

Examples:

- `membership: "gold"` is API
- `membership.gold.title` remains i18n
- `profile.city` or `event.title` may stay localized resource fields for now

## What Was Removed

The following implementation layers are no longer part of runtime:

- `src/api/modules/*`
- `src/composables/*`
- `src/mock/data/*`
- `src/mock/types/*`
- `src/mock/shared.ts`
- `src/mock/async/request.ts`
- all `*.mock.ts`
- provider switching for mock vs http

## Remaining Work

The migration document is now mostly historical. The remaining work is not “finish json-server migration”, but:

1. keep `mock-server/db.json` aligned with current UI needs
2. verify endpoint parity against future Rust contracts
3. add tests or regression checks around critical HTTP paths
4. replace `mock-server` endpoint-by-endpoint with real backend services

## Why This Matters

`profiles` was the hardest domain because it exercises:

- list endpoint
- detail endpoint
- filters
- sorting
- pagination
- facets
- localized text

Now that `profiles`, `events`, `account`, and `auth` are all on the same HTTP boundary, the next backend migration should be incremental rather than another frontend rewrite.
