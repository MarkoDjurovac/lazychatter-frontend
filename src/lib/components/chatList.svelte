<script lang="ts">
    import ChatListItem from '$lib/components/chatListItem.svelte';
    import CreateChat from '$lib/components/createChat.svelte';
    import Toast from '$lib/components/toast.svelte';
    import { createEventDispatcher } from 'svelte';
    import { onMount, onDestroy} from 'svelte';
    import { getUserChats } from '../../services/chat';
    import type { Chat, User } from '$lib/types';
    import newChatIcon from '$lib/assets/new_chat.svg';
    import closeIcon from '$lib/assets/close.svg';

    export let user: User;

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * All chats that the user is participating in.
     * @type {Chat[]}
     */
    let allChats: Chat[] = [];

    /*
     * The chats that are currently displayed.
     * @type {Chat[]}
     */
    let chats: Chat[] = [];

    /*
     * The search string that is used to filter the chats.
     * @type {string}
     */
    let search: string = '';

    /*
     * Indicates whether the user wants to start a new chat.
     * @type {boolean}
     */
    let isStartingNewChat: boolean = false;

    let pollingInterval: any;

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
     * Gets the chats for the user when the component is mounted.
     * @function
     */
    onMount(async () => {
        try {
            allChats = await getUserChats();
            chats = [...allChats];

            pollingInterval = setInterval(async () => {
                allChats = await getUserChats();
                chats = [...allChats];
            }, 5000);
        }
        catch(error: any) {
            showToast('Error while getting chats', 'error');
        }
    });

    onDestroy(() => {
        clearInterval(pollingInterval);
    });

    /*
     * Handles the openchat event.
     * @param {CustomEvent} event - The event that is dispatched when the user wants to open a chat.
     */
    function handleOpenChat(event: CustomEvent) {
        dispatch('openchat', event.detail);
    }

    /*
     * Handles the closechatlist event.
     */
    function handleCloseChatList() {
        dispatch('closechatlist');
    }

    /*
     * Handles the startchat event.
     */
    function handleStartChat() {
        isStartingNewChat = true;
    }

    /*
     * Handles the closedialog event.
     * @param {CustomEvent} event - The event that is dispatched when the user wants to close the dialog.
     */
    async function handleCloseDialog(event: CustomEvent) {
        isStartingNewChat = false;
    }

    /*
     * Filters the chats based on the search string.
     * @param {Event} event - The event that is dispatched when the user types in the search input.
     */
    function filterChats(event: Event) {
        const search = (event.target as HTMLInputElement).value;
        chats = allChats.filter(chat => chat.paritcipants.filter(participant => participant.username?.toLowerCase().includes(search.toLowerCase())).length > 0);
    }

   /*
    * Shows a toast message.
    * @param {string} message - The message to show.
    * @param {string} type - The type of toast to show.
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
  
{#if isToastVisible}
  <Toast message={toastMessage} type={toastType}/>
{/if}
<div class="flex flex-col h-full bg-white space-y-4">
    <div class="flex items-center bg-slate-200 p-1">
        <input bind:value={search} on:input={filterChats} type="text" placeholder="Search chats..." class="flex-grow py-2 px-4 bg-gray-50 rounded" />
        <button on:click={handleStartChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
            <img src={newChatIcon} alt="Start a new chat" class="w-8 h-8"/>
        </button>
        <button on:click={handleCloseChatList} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
            <img src={closeIcon} alt="Close chat list" class="w-8 h-8"/>
        </button>
    </div>
    <div class="overflow-y-auto space-y-4 flex-grow">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#each chats as chat}
            <ChatListItem on:openchat={handleOpenChat} chat={chat} />
            <div class="border-t border-gray-300 mx-3"></div>
        {/each}
    </div>
</div>

{#if isStartingNewChat}
    <CreateChat user={user} on:close={handleCloseDialog} />
{/if}