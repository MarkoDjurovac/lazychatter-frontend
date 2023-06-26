<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * Defines the type of toast to display.
     * @type {string}
     */
    export let type: string;
    
    /*
     * The message to display.
     * @type {string}
     */
    export let message: string;
    
    /*
     * When the component is mounted, it will close after 2 seconds.
     * @function
     * @param {function} the callback function.
     */
    onMount(async () => {
        await new Promise(f => setTimeout(f, 2000));
        dispatch('close');
    });
</script>
    
{#if type === 'error'}
    <div transition:fly={{y: 20, duration: 200}} class="bg-red-500 text-white p-4 fixed bottom-4 left-4 rounded-lg">
        {message}
    </div>
{:else if type === 'success'}
    <div transition:fly={{y: 20, duration: 200}} class="bg-green-500 text-white p-4 fixed bottom-4 left-4 rounded-lg">
        {message}
    </div>
{/if}