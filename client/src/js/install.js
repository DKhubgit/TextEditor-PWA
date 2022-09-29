const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

//looks for an event with an 'install' functionality and calls this before anything happens
window.addEventListener('beforeinstallprompt', (event) => {
    //saves the event in the window variable
    window.deferredPrompt = event;
    //adds 'hidden' class to the button.
    butInstall.classList.toggle('hidden', false);
});

//when the user clicks on the install fire this event listener
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }   
    // displays the prompts that's within the event
    promptEvent.prompt();

    butInstall.classList.toggle('hidden', true);

});


window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    alert("JATE has been installed!");
});
