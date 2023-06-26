<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let chat: any;

    function getParticipants(participants: string[]) {
        return participants.join(', ');
    }

    function handleOpenChat(event: Event) {
        dispatch('openchat', chat);
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={handleOpenChat} class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">Chat with {getParticipants(chat.paritcipants)}</div>