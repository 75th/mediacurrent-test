var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

(() => {
	var $body = $('body');

	var colorIcon = '<svg height="30" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="m15 0a15 15 0 1 0 15 15 15 15 0 0 0 -15-15zm0 1.76a13.24 13.24 0 0 1 0 26.48z" fill="#003954"/></svg>';

	// Add color mode buttons
	$('div.color-modes').innerHTML =
		`<button class="to-dark">${colorIcon}<span>Dark Mode</button><button class="to-light">${colorIcon}<span>Light Mode</span></button>`
	;

	// Keep track of whether the user has manually chosen a color scheme,
	// so we can stop monitoring the OS setting in the middle of a session.
	var manualColorMode = false;

	/**
	 * Handle all aspects of switching color modes.
	 *
	 * @param {bool} toDark - If true, switch to Dark Mode; if false, Light Mode.
	 * @param {bool} manualSwitch - If true, the user manually chose a mode by clicking; if false, we're switching for another reason.
	 * @param {bool} transition - Whether or not to use a transition duration for this switch
	 *
	 * @return {undefined}
	 */
	var colorModeSwitch = (toDark = true, manualSwitch = true, transition = manualSwitch) => {
		const transitionDuration = transition ? 500 : 0;
		const transitionDurationCSS = `${transitionDuration}ms`;

		if(manualSwitch) {
			manualColorMode = true;
			localStorage.setItem('prefersDark', toDark);
		}

		// Disable mode buttons during transition
		const $$buttons = $$('.color-modes button');
		$$buttons.forEach(($button) => { $button.disabled = true });

		// Temporarily adjust transition duration
		$body.style.setProperty('--transition-duration', transitionDurationCSS);

		// Toggle classes
		$body.classList.add('mode-shifting');
		$body.classList.remove(toDark ? 'light' : 'dark');
		$body.classList.add(toDark ? 'dark' : 'light');

		// Clean up after switch completes
		setTimeout(
			() => {
				$body.classList.remove('mode-shifting');
				$body.style.setProperty('--transition-duration', '0s');
				$$buttons.forEach(($button) => { $button.disabled = false });
			},
			transitionDuration
		);
	};

	// Attach listeners to color mode buttons
	$('button.to-dark').addEventListener('click', () => { colorModeSwitch(true); });
	$('button.to-light').addEventListener('click', () => { colorModeSwitch(false); });

	// Fetch user's manual color preference from storage
	var prefersDark = localStorage.getItem('prefersDark');
	// Local storage only stores strings, not booleans
	prefersDark = prefersDark === 'false' ? false : prefersDark === 'true' ? true : null;

	// Apply user's manual preference if one exists
	if(prefersDark !== null) {
		colorModeSwitch(prefersDark, false);
	} else {
		// If no manual preference, use OS settings
		const darkModeMQ = matchMedia('(prefers-color-scheme: dark)');
		colorModeSwitch(darkModeMQ.matches, false);

		// Respond to changes in OS setting, unless the user has manually
		// selected a mode during this page load
		darkModeMQ.addListener((e) => {
			if(!manualColorMode) {
				colorModeSwitch(e.matches, false, true);
			}
		});
	}
})();
