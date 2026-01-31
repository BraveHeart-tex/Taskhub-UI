# Project Architecture & Onboarding Guide

A Trello-like collaborative board application built with **TanStack Router**, **React Query**, **Zustand**, **shadcn/ui**, and **PostgreSQL + Drizzle ORM**.

This document explains the **architecture, data flow, routing responsibilities, and design philosophy** so new contributors (human or AI) can onboard quickly and make consistent decisions.

---

## Frontend Architecture

### Routing (TanStack Router)

Workspace-scoped routing with clear responsibility boundaries:

```

/\_app/workspaces/$workspaceId/\_layout/
├─ index.tsx → Workspace home (summary)
├─ boards/
│ ├─ index.tsx → Board list for workspace
│ └─ $boardId/
│ └─ index.tsx → Board page

```

### Route Responsibilities

| Route          | Responsibility                                          |
| -------------- | ------------------------------------------------------- |
| Workspace home | Fetch workspace summary, recent boards, members preview |
| Boards list    | Fetch lightweight board previews                        |
| Board route    | Fetch **BoardContext** (identity + permissions only)    |
| Board content  | Lists & cards fetched separately via React Query        |

> **Rule:** Route loaders fetch _page identity & permissions_, not interactive data.

---

## Data Fetching Philosophy

We follow a **CQRS-style separation**:

- **Route loaders**
  - Identity
  - Permissions
  - Page chrome
- **React Query**
  - Lists
  - Cards
  - Drag & drop data
  - Frequently mutating content

This avoids over-fetching, improves cache reuse, and keeps navigation fast.

---

## DTO Design

### Workspace Summary DTO

Used on workspace home page.

Includes:

- `id`, `name`
- `isCurrentUserOwner`
- `memberCount`
- `membersPreview[]`
- `recentBoards[]`

---

### Board Preview DTO

Used in board lists.

```ts
WorkspaceBoardPreview {
  id
  title
  workspaceId
  isCurrentUserOwner
  memberCount
  createdAt
  updatedAt
}
```

---

### Board Context DTO

Fetched by the board route loader.

Purpose: **access control + identity**, not content.

```ts
BoardContext {
  id
  title
  workspaceId
  myRole // owner | member
  createdAt
  updatedAt
}
```

---

### Board Content DTO

Fetched separately via React Query.

```ts
BoardContentDto {
  boardId
  lists: {
    id
    title
    position
    cards: {
      id
      listId
      title
      description
      position
      createdBy
      createdAt
      updatedAt
    }[]
  }[]
  users: Record<
    string,
    {
      id
      fullName
      avatarUrl
    }
  >
}
```

**Notes**

- Board metadata is **not duplicated** (already provided by `BoardContext`)
- User info is returned as a **lookup map** to avoid repetition on cards

---

## Permissions Model

- Workspace membership required to access workspace
- Board membership required to access board
- Board owner can:
  - Rename board
  - Delete board

- UI adapts based on `myRole`

---

## Modal System

- Central modal host
- Implemented with **Zustand**
- Lazy-loaded modal components
- Modals are **not route-based**

Current modals:

- Create workspace
- Create board

Planned:

- Rename board
- Invite members
- Delete confirmations

---

## UI & Design System

- Desktop-first (Trello-like)
- shadcn/ui components
- Shared typography system:
  - `<H1 />`, `<H2 />`, `<H3 />`, `<Muted />`, etc.

- Minimal, fast, readable UI
- No visual clutter

---

## Non-Goals (For Now)

- No mobile-first design
- No realtime collaboration (websockets)
- No conflict resolution / CRDTs
- No optimistic drag-drop yet

---

## Guiding Principles

- Fetch **only what the page needs**
- Separate identity from content
- Avoid duplicated data across layers
- Prefer clarity over premature abstraction
- DTOs are designed for **UI needs**, not DB shape

---

## How to Extend the App

When adding a feature:

1. Decide if data is **identity** or **interactive**
2. Identity → route loader
3. Interactive → React Query
4. Design a DTO specifically for the page
5. Respect permission boundaries
6. Keep routes thin and predictable

## Result-Based Programming Approach

This project follows a **result-based programming model** for all async and side-effectful operations (API calls, parsing, validation)
Instead of throwing exceptions or relying on implicit control flow, **every operation returns an explicit `Result<T, E>`** that must be handled by the caller.

This makes:

- Error handling explicit
- Control flow predictable
- UI state easier to reason about
- Failures impossible to “forget”

---

## Core Concept

All API functions return:

```ts
Result<SuccessType, ErrorUnion>;
```

Where:

- `SuccessType` is the validated, schema-safe payload
- `ErrorUnion` is a **closed union of all known failure cases**

No function throws.
No function returns `null`.
No function returns untyped `unknown` data.

---

## Anatomy of an API Function

Using `board.api.ts` as the reference implementation, every API function follows the same structure:

### 1. Perform the HTTP request

```ts
const res = await httpClient.get<BoardContext>(endpoint);
```

- `httpClient` itself returns a `Result`
- Network, timeout, and HTTP errors are already normalized

---

### 2. Map transport errors to **domain errors**

```ts
if (!res.ok) {
  if (res.error.type === "HttpError") {
    if (res.error.status === HttpStatus.UNAUTHORIZED) {
      return Err({ type: "Unauthorized" });
    }
    if (res.error.status === HttpStatus.NOT_FOUND) {
      return Err({ type: "BoardMemberNotFound" });
    }
  }
  return Err({ type: "Unexpected" });
}
```

**Rules**

- HTTP status codes are translated into **meaningful domain errors**
- Callers never see raw HTTP concepts
- Unknown failures collapse into `Unexpected`

---

### 3. Validate the response payload

```ts
const parsed = parseWithSchema(boardContextSchema, res.value, () => ({
  type: "ValidationFailed",
}));
```

**Why this matters**

- Backend bugs are caught early
- Frontend logic never works with invalid data
- Runtime safety is enforced at boundaries

---

### 4. Return a typed success value

```ts
return Ok(parsed.value);
```

At this point:

- The data is valid
- The shape is known
- The caller can trust it completely

---

## Error Modeling Rules

Every API function defines its own **explicit error union**:

```ts
type GetBoardContextError =
  | UnauthenticatedError
  | { type: "BoardMemberNotFound" }
  | UnauthorizedError
  | ValidationFailedError
  | UnexpectedError;
```

### Guidelines

- Errors are **descriptive**, not generic
- Error unions are **closed** (no `string`, no `any`)
- New failure modes require updating the union
- Callers can exhaustively handle errors

---

## Why Not Exceptions?

Exceptions:

- Are implicit
- Break control flow
- Are easy to forget to handle
- Do not compose well

`Result<T, E>`:

- Is explicit
- Forces handling
- Composes naturally
- Works seamlessly with React Query, loaders, and UI state

---

## Integration with React Query

API functions returning `Result` integrate cleanly:

```ts
const useBoardContent = ({ workspaceId, boardId }: BoardRouteParams) => {
  return useQuery({
    queryKey: queryKeys.boards.content(boardId),
    queryFn: async () => {
      const result = await getBoardContent({ workspaceId, boardId });

      return unwrapResult(result);
    },
  });
};
```

This keeps:

- Fetch logic predictable
- Error boundaries intentional
- UI logic clean

---

## Integration with Route Loaders

Route loaders **do not guess** — they act on results:

```ts
const result = await getBoardContext(params);

if (!result.ok) {
  throw redirect({ to: "/workspaces" });
}

return { board: result.value };
```

Routing decisions are driven by **domain outcomes**, not assumptions.

---

## Mental Model

> HTTP errors are transport concerns
> Result errors are **business concerns**

The API layer is where transport turns into meaning.

---

## Design Principles

- No thrown errors from API modules
- No unvalidated data crosses module boundaries
- All failures are modeled
- Success paths are clean and obvious
- Error paths are intentional and typed

---

## When Adding a New API Function

1. Define the success DTO
2. Define a closed error union
3. Perform the request
4. Map HTTP → domain errors
5. Validate with schema
6. Return `Result`

If any step is skipped, the function is incomplete.

---

## Summary

Result-based programming is not an abstraction choice —
it is a **discipline**.

It ensures correctness, clarity, and confidence across the entire codebase.

---

## End of Document

This README is the source of truth for architectural decisions.
All new features should align with the patterns described above.
