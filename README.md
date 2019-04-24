# Lanny Heidbreder’s Mediacurrent Front-End Test
Notes and caveats:
- I used the Mac app CodeKit for compilation. The free version of CodeKit will compile existing projects, so long as you don’t change compilation settings, if you need to do that for any reason.
- To show my typical process, I developed this with my usual set of starting files, so there are more SCSS files than are strictly necessary for a single-page project; I hope this is okay.
- `/www/src/scss/base/`has four files in which I organize variables and mixins. There’s another README in that folder that explains my system.
- I make extensive use of CSS custom properties and SCSS variables. My variable naming scheme is described in `/www/src/scss/base/__dimensions.scss`.
- If the user manually selects a color mode, it’s stored in Local Storage and used on future page loads.
- Light Mode is active by default, unless the browser supports the `prefers-color-scheme` media query, in which case the operating system’s color scheme is used. You can change the OS color scheme to change the page’s  mode as well, unless you’ve manually changed the scheme with the buttons; the buttons take precedence over everything.

Thank you for your time!