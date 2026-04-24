---
description: "Stage all changes and create a commit (no push)"
agent: "agent"
argument-hint: "Optional commit message"
tools: ['runCommands', 'runTasks']
---

Create a git commit for the current changes. Do **not** push.

Steps:
1. Run `git status` to see what is modified, added, or deleted.
2. Run `git diff --staged` and `git diff` to understand the changes.
3. If the user provided a message in `${input:message}`, use it verbatim. Otherwise, write a concise commit message following the **Conventional Commits** spec (e.g. `feat(web): add radar chart legend`), based on the actual diff. Keep the subject ≤ 72 chars; add a short body only if it adds real value.
4. Stage everything with `git add -A`.
5. Commit with `git commit -m "<message>"` (use a heredoc / multiple `-m` flags if a body is needed).
6. Run `git status` to confirm a clean tree, then show the resulting `git log -1 --oneline`.

Do **not** run `git push` under any circumstance.
