---
description: "Stage all changes, commit, then push"
agent: "agent"
argument-hint: "Optional commit message"
tools: ['runCommands', 'runTasks']
---

Create a commit for the current changes **and** push it.

Steps:
1. Run `git status`, `git diff --staged`, and `git diff` to understand the changes.
2. If the user provided a message in `${input:message}`, use it verbatim. Otherwise, write a concise **Conventional Commits** message based on the actual diff (subject ≤ 72 chars, optional short body).
3. Stage everything with `git add -A`.
4. Commit with `git commit -m "<message>"`.
5. Push with `git push` (fall back to `git push -u origin <branch>` if no upstream is set).
6. Show `git log -1 --oneline` and confirm the push succeeded.

Do **not** use `--force` unless the user explicitly asks.
