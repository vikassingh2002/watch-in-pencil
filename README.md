# Watch in Pencil — mobile installation host

Published at https://vikassingh2002.github.io/watch-in-pencil/ .
This separate origin avoids Chrome for Android confusing Watch with Agentic AI
installed from vikasinpencil.com. Desk and Agentic links return to the main site.

The application is adapted from the Watch source in
https://github.com/vikassingh2002/vikasinpencil/tree/main/watch .
Keep the two copies in sync when changing the app. The manifest, install helper,
worker and internal cross-app links use this hosting prefix.

No backend or authentication was added. Storage is local to this origin.
If you previously used Watch on vikasinpencil.com, export a backup at
https://vikasinpencil.com/watch/?legacy=1#/settings then import it in this app's
Settings. The old origin's stored data is not erased or transferred automatically.

See ATTRIBUTION.md for original Deepwatch credits.
