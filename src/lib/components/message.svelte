<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Message } from '../types';

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * Message object to be displayed.
     * @type {Message}
     */
    export let message: Message;
</script>

<div class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
    {message.sender} : {message.messageText}
</div>

