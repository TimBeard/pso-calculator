---
description: "Push the current branch to its remote"
agent: "agent"
tools: ['runCommands', 'runTasks']
---

Push the current branch to the remote.

Steps:
1. Run `git status` to ensure there is something to push and the working tree state is known.
2. Run `git rev-parse --abbrev-ref HEAD` to get the current branch name.
3. Run `git push`. If the branch has no upstream configured, fall back to `git push -u origin <branch>`.
4. Report the push result (commits pushed, remote URL).

Do **not** create new commits. Do **not** use `--force` unless the user explicitly asks.
