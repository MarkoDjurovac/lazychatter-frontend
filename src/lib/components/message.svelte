<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Message } from '../types';

    const dispatch = createEventDispatcher();

    export let message: Message;
</script>

<div class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
    {message.sender} : {message.messageText}
</div>

