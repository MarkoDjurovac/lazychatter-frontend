<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Chat, User } from '../types';
    import { Utils } from '../utilities';

    const dispatch = createEventDispatcher();

    export let chat: Chat;

    function handleOpenChat(event: Event) {
        dispatch('openchat', chat);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleOpenChat} class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
    {Utils.getParticipants(chat.paritcipants)}
</div>