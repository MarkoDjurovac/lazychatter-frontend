<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { Utils } from '../utilities';
    import type { Chat } from '../types';

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * The chat that is currently open.
     * @type {Chat}
     */
    export let chat: Chat;

    /*
     * Handles the openchat event.
     * @param {Event} event - The event that is dispatched when the user wants to open a chat.
     */
    function handleOpenChat(event: Event) {
        dispatch('openchat', chat);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleOpenChat} class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
    {Utils.getParticipants(chat.paritcipants)}
</div>