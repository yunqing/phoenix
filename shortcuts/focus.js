
/* IMPORT */

require ( './magic/terminal.js' );

/* LAUNCHERS */

const launchChrome = `
  tell application "Google Chrome"
    make new window
    activate
  end tell
`;

function launchDevTools () {

  const chrome = Space.active ().windows ().find ( window => /Google Chrome/.test ( window.app ().name () ) );

  if ( !chrome ) return alert ( 'Chrome is not opened' );

  osascript (`
    tell application "Google Chrome" to activate
    tell application "System Events" to tell process "Google Chrome"
      click menu item "Developer Tools" of menu 1 of menu item "Developer" of menu 1 of menu bar item "View" of menu bar 1
    end tell
  `);

}

const launchVSC = () => Task.run ( '/usr/local/bin/code', ['-n'] );

const launchHyper = () => Task.run ( '/usr/local/bin/hyper' );

const launchiTerm = `
  if application "iTerm" is running then
    tell application "iTerm"
      activate
      if not (exists current window) then
        create window with default profile
      end if
    end tell
  else
    tell application "iTerm"
      create window with default profile
    end tell
  end if
`;

const launchTerminal = `
  tell application "Terminal"
    do script ""
    activate
  end tell
`;

const launchFinder = `
  tell application "Finder"
    make new Finder window to (path to downloads folder)
    activate
  end tell
`;

/* CALLBACKS */

function callbackTerminal ( isNewWindow ) {

  if ( !isNewWindow ) return;

  setTimeout ( () => {

    const focused = Window.focused ();

    if ( !focused ) return;

    magicTerminalOpen ( focused );

  }, 600 );

}

function callbackHyper ( isNewWindow ) {

  if ( !isNewWindow ) return;

  setTimeout ( () => {

    const focused = Window.focused ();

    if ( !focused ) return;

    magicHyperOpen ( focused );

  }, 1200 );

}

function callbackiTerm ( isNewWindow ) {

  if ( !isNewWindow ) return;

  setTimeout ( () => {

    const focused = Window.focused ();

    if ( !focused ) return;

    magiciTermOpen ( focused );

  }, 600 );

}

/* FOCUS */

const focus = [
  ['`', HYPER, ['Noty']],
  ['c', HYPER, ['Google Chrome', false, /^(?!Developer Tools)/, launchChrome]],
  ['d', HYPER, ['Google Chrome', true, /(Developer Tools)|(chrome-devtools)/, launchDevTools]],
  ['v', HYPER, ['Code', false, false, launchVSC]],
  // ['t', HYPER, ['Terminal', false, false, launchTerminal, callbackTerminal]], //FIXME: Ugly, but since `windowDidOpen` won't trigger, at least now it will behave as expected
  // ['t', HYPER, ['Hyper', false, false, launchHyper, callbackHyper]], //FIXME: Ugly, but since `windowDidOpen` won't trigger, at least now it will behave as expected
  ['t', HYPER, ['iTerm', false, false, launchiTerm, callbackiTerm]], //FIXME: Ugly, but since `windowDidOpen` won't trigger, at least now it will behave as expected
  ['f', HYPER, ['Finder', false, false, launchFinder]],
  ['g', HYPER, ['Tower']],
  ['z', HYPER, ['Franz']]
];

setHandlers ( focusWindow, focus );
