agentation

$ npx skills add https://github.com/benjitaylor/agentation --skill 

agentation

SKILL.md

Agentation Setup
Set up the Agentation annotation toolbar in this project.

Steps
Check if already installed

Look for agentation in package.json dependencies
If not found, run npm install agentation (or pnpm/yarn based on lockfile)
Check if already configured

Search for <Agentation or import { Agentation } in src/ or app/
If found, report that Agentation is already set up and exit
Detect framework

Next.js App Router: has app/layout.tsx or app/layout.js
Next.js Pages Router: has pages/_app.tsx or pages/_app.js
Add the component

For Next.js App Router, add to the root layout:

import { Agentation } from "agentation";

// Add inside the body, after children:
{process.env.NODE_ENV === "development" && <Agentation />}
For Next.js Pages Router, add to _app:

import { Agentation } from "agentation";

// Add after Component:
{process.env.NODE_ENV === "development" && <Agentation />}
Confirm setup

Tell the user to run their dev server and look for the Agentation toolbar (floating button in bottom-right corner)
Notes
The NODE_ENV check ensures Agentation only loads in development
Agentation requires React 18
No additional configuration needed — it works out of the box