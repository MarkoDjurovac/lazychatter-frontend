<script lang="ts">
    import Toast from '$lib/components/toast.svelte';
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
    let editedText: string = '';

    /*
     * Indicates whether the message is in edit mode.
     * @type {boolean}
     */
    let isEditMode: boolean = false;

        /*
     * Indicates whether the message toast is visible.
     * @type {boolean}
     */
     let isToastVisible: boolean = false;

    /*
    * The message to show in the toast.
    * @type {string}
    */
    let toastMessage: string = '';

    /*
    * The type of toast to show.
    * @type {string}
    */
    let toastType: string = '';

    /*
     * Handles the edit mode of the message.
     * @function
     */
    function handleEditMode() {
        editedText = message.messageText;
        isEditMode = true;
    }

    /*
     * Deletes the message.
     * @function
     * @async
     */
    async function handleDelete() {
        try {
            await deleteMessage(message);
            dispatch('deleted');
        }
        catch(error: any) {
            showToast('Error while deleting message.', 'error');
        }
    }

    /*
     * Edits the message.
     * @function
     * @async
     */
    async function editMsg(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            message.messageText = editedText;
            try {
                await editMessage(message);
                isEditMode = false;
                dispatch('edited');
            }
            catch(error: any) {
                showToast('Error while editing message.', 'error');
                isEditMode = false;
            }
        }
    }

    /*
     * Shows a toast message.
     * @function
     * @param message The message to show.
     * @param type The type of toast to show.
     */
    function showToast(message: string, type: string) {
        toastMessage = message;
        toastType = type;
        isToastVisible = true;

        setTimeout(() => {
            isToastVisible = false;
        }, 3000);
    }
</script>

<style>
    div.action {
        display: none;
    }

    div.message[data-sender="true"]:hover div.action {
        display: inline-block;
    }
</style>

{#if isToastVisible}
    <Toast message={toastMessage} type={toastType}/>
{/if}
<div data-sender={message.sender === user.username} class={`transition duration-500 ease-in-out py-2 m-2 px-4 rounded cursor-pointer message ${message.sender === user.username ? 'bg-green-200 rounded-lg p-2 hover:bg-green-300' : 'hover:bg-blue-300 bg-blue-200 rounded-lg p-2'}`}>
    <div class="text-gray-500">{message.sender}</div>
    {#if !isEditMode}
        <div>{message.messageText}</div>
    {/if}
    {#if isEditMode}
        <input type="text" bind:value={editedText} on:keypress={editMsg} class="flex-grow py-2 px-4 bg-gray-50 rounded pr-10"/>
    {/if}
    <div class="action inline-block">
        <button class="inline-block transition duration-500 ease-in-out py-2 px-4 hover:bg-green-400 rounded cursor-pointer" on:click={handleEditMode}>
            <img src={editIcon} alt="Edit this message" class="w-4 h-4"/>
        </button>
        <button class="inline-block transition duration-500 ease-in-out py-2 px-4 hover:bg-green-400 rounded cursor-pointer" on:click={handleDelete}>
            <img src={deleteIcon} alt="Delete this message" class="w-4 h-4" />
        </button>
    </div>
</div>