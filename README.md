# auto-time-tracker

This extension automatically record how much time you spent on different workspaces and allows you to check a report.

## Motivation

All existing time tracking extensions require you to manually enter a lot of information, creating some friction and bothering people trying to use them. This just does everything by itself as long as you remember to close a workspace if you are not working with it.

## Features

- automatic time tracking
- a notification when tracking starts
- stops when you change your workspace or if you close vs code
- time tracking won't stop if you are idle
- You can go to command palette default(CRTL + SHIFT + P) and type `openReport` to have a report of the time you spent on each workspace.
- it is just 100 lines of code