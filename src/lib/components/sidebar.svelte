<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import defaultProfileIcon from '$lib/assets/default-pp.svg';
    import settingsIcon from '$lib/assets/settings.svg';
    import chatIcon from '$lib/assets/chat.svg';
    import contactsIcon from '$lib/assets/contacts.svg';

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * Indicates whether settings popup is open or not.
     * @type {boolean}
     */
    let isSettingsOpen: boolean = false;

    /*
     * Handles the open contacts event.
     * @function
     */
    function handleOpenContacts() {
        dispatch('opencontacts');
    }

    /*
     * Handles the open chat event.
     * @function
     */
    function handleOpenChat() {
        dispatch('openchatlist');
    }

    /*
     * Handles the open settings event.
     * @function
     */
    function handleOpenSettings() {
        isSettingsOpen = !isSettingsOpen;
    }

    /*
     * Handles the logout event.
     * @function
     */
    function handleLogout() {
        dispatch('logout');
    }

    /*
     * Handles the toggle theme event.
     * @function
     */
    function handleToggleTheme() {
        dispatch('toggletheme');
    }

    /*
     * Handles the open profile event.
     * @function
     */
    function handleOpenProfile() {
        dispatch('openprofile');
    }
</script>

<div class="flex flex-col justify-between bg-gray-50 p-4 space-y-4 h-full">
    <button on:click={handleOpenProfile} class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded">
        <img src={defaultProfileIcon} alt="Default profile icon" class="w-12 self-center"/>
    </button>
    <button on:click={handleOpenChat} class="flex items-center justify-center transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded">
        <img src={chatIcon} alt="Chat" class="w-8"/>
    </button>
    <button on:click={handleOpenContacts} class="flex items-center justify-center transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded">
        <img src={contactsIcon} alt="Contacts" class="w-8"/>
    </button>
    <div class="relative self-center mb-auto">
        <button on:click={handleOpenSettings} class="flex items-center justify-center transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded">
            <img src={settingsIcon} alt="Settings" class="w-8"/>
        </button>
        {#if isSettingsOpen}
            <div class="absolute right-0 top-0 transform translate-y-[-100%] bg-white rounded shadow-lg">
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-200" on:click={handleLogout}>Logout</button>
                <button class="block w-full text-left px-4 py-2 hover:bg-gray-200" on:click={handleToggleTheme}>Toggle Dark/Light Mode</button>
            </div>
        {/if}
    </div>
</div>