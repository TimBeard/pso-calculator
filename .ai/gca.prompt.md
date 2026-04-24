---
description: "Amend the previous commit with current changes (no new commit, no push)"
agent: "agent"
argument-hint: "Optional new commit message"
tools: ['runCommands', 'runTasks']
---

Fold the current working-tree changes into the **previous** commit. Do not create a new commit.

Steps:
1. Run `git log -1 --oneline` to show which commit will be amended.
2. Run `git status` and `git diff` to see what will be folded in.
3. Check whether the previous commit has already been pushed: compare `git rev-parse HEAD` with `git rev-parse @{u}` (if an upstream exists). If `HEAD` is already on the remote, **stop and warn the user** that amending will require a force-push, and ask for confirmation before continuing.
4. Stage everything with `git add -A`.
5. Amend the commit:
   - If the user provided a message in `${input:message}`, use `git commit --amend -m "<message>"` (Conventional Commits, subject ≤ 72 chars).
   - Otherwise, if the diff makes the existing message stale or inaccurate, rewrite it to match the new contents (still Conventional Commits) and use `git commit --amend -m "<message>"`.
   - Otherwise keep the existing message with `git commit --amend --no-edit`.
6. Show the new `git log -1 --oneline`.

Do **not** push.
