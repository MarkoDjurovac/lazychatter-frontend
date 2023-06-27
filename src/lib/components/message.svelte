<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { deleteMessage, editMessage } from '../../services/message';
    import type { Message, User } from '../types';
    import editIcon from '$lib/assets/edit.svg';
    import deleteIcon from '$lib/assets/close.svg';

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

   /*
    * The user that is currently logged in.
    * @type {User}
    */
    export let user: User;

    /*
     * The text that the user wants to edit the message to.
     * @type {string}
     */
    let editedText: string = message.messageText;

    /*
     * Indicates whether the message is in edit mode.
     * @type {boolean}
     */
    let isEditMode: boolean = false;

    /*
     * Handles the edit mode of the message.
     * @function
     */
    function handleEditMode() {
        isEditMode = true;
    }

    /*
     * Deletes the message.
     * @function
     * @async
     */
    async function handleDelete() {
        await deleteMessage(message);
        dispatch('deleted');
    }

    /*
     * Edits the message.
     * @function
     * @async
     */
    async function editMsg(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            message.messageText = editedText;
            await editMessage(message).catch(error => {
                isEditMode = false;
            });
            isEditMode = false;
            dispatch('edited');
        }
    }
</script>

<style>
    div.action {
        display: none;
    }

    div.message[data-sender="true"]:hover div.action{
        display: inline-block;
    }
</style>

<div data-sender={message.sender === user.username} class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer message">
    {#if !isEditMode}
        {message.sender} : {message.messageText}
    {/if}
    {#if isEditMode}
        <input type="text" bind:value={editedText} on:keypress={editMsg}/>
    {/if}
    <div class="action inline-block">
        <button class="inline-block transition duration-500 ease-in-out py-2 px-4 hover:bg-slate-300 rounded cursor-pointer" on:click={handleEditMode}>
            <img src={editIcon} alt="Edit this message" class="w-4 h-4"/>
        </button>
        <button class="inline-block transition duration-500 ease-in-out py-2 px-4 hover:bg-slate-300 rounded cursor-pointer" on:click={handleDelete}>
            <img src={deleteIcon} alt="Delete this message" class="w-4 h-4" />
        </button>
    </div>
</div>

