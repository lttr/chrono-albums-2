# Users, Roles & Permissions

## Overview

Chrono Albums uses a project-centric access model. Users can participate in multiple projects, each with an independent role. There is no shared "team" entity across projects—each project manages its own members.

## Users

Users authenticate via Google OAuth. A user account consists of:

- **Name** – display name from Google
- **Email** – unique identifier, from Google account

A single user can be associated with many projects, with a different role in each.

## Projects & Membership

```
User A ──┬──→ Project X (owner)
         ├──→ Project Y (member)
         └──→ Project Z (owner)

User B ──┬──→ Project X (member)
         └──→ Project Y (owner)
```

Each project has:

- **Exactly one owner** – the user who created the project
- **Zero or more members** – users invited by the owner

Ownership cannot be transferred (for now).

## Roles

| Role       | Description                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| **Owner**  | Created the project. Full control including deletion and member management.            |
| **Member** | Invited collaborator. Can create and edit content, but cannot delete structural items. |

### Role Independence

Roles are scoped to individual projects. A user's role in Project A has no effect on their role in Project B:

- User can be **owner** of some projects and **member** of others
- User can leave a project without affecting other memberships
- Removing a user from one project doesn't affect their access to other projects

## Permissions

| Action          | Owner | Member |
| --------------- | :---: | :----: |
| **Project**     |       |        |
| Edit project    |   ✓   |   ✗    |
| Delete project  |   ✓   |   ✗    |
| **Members**     |       |        |
| View members    |   ✓   |   ✓    |
| Invite members  |   ✓   |   ✗    |
| Remove members  |   ✓   |   ✗    |
| **Categories**  |       |        |
| Create category |   ✓   |   ✓    |
| Edit category   |   ✓   |   ✓    |
| Delete category |   ✓   |   ✗    |
| **Albums**      |       |        |
| Create album    |   ✓   |   ✓    |
| Edit album      |   ✓   |   ✓    |
| Delete album    |   ✓   |   ✓    |
| **Media**       |       |        |
| Upload media    |   ✓   |   ✓    |
| Edit media      |   ✓   |   ✓    |
| Delete media    |   ✓   |   ✓    |

## Summary

- **One owner per project** – the creator
- **Members are optional** – owner can work alone or invite others
- **Roles are per-project** – no global admin or team hierarchy
- **Owner has full control** – members can contribute but not delete structural elements (project, categories)
