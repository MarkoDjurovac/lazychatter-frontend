<script lang="ts">
    import ChatListItem from '$lib/components/chatListItem.svelte';
    import newChatIcon from '$lib/assets/new_chat.svg';
    import closeIcon from '$lib/assets/close.svg';
    import { createEventDispatcher } from 'svelte';
    import CreateChat from '$lib/components/createChat.svelte';
    import { onMount } from 'svelte';

    const dispatch = createEventDispatcher();

    let chats = [];
    let search = '';
    let isStartingNewChat = false;

    function handleOpenChat() {
        dispatch('openchat');
    }

    function handleCloseChatList() {
        dispatch('closechatlist');
    }

    function handleStartChat() {
        isStartingNewChat = true;
    }

    function handleCloseDialog() {
        isStartingNewChat = false;
    }
  </script>
  

  <div class="flex flex-col h-full bg-white space-y-4">
    <div class="flex items-center bg-slate-300 p-1">
        <input bind:value={search} type="text" placeholder="Search chats..." class="flex-grow py-2 px-4 bg-gray-50 rounded" />
        <button on:click={handleStartChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
            <img src={newChatIcon} alt="Start a new chat" class="w-8 h-8"/>
        </button>
        <button on:click={handleCloseChatList} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
            <img src={closeIcon} alt="Close chat list" class="w-8 h-8"/>
        </button>
    </div>
    <div class="overflow-y-auto space-y-4 flex-grow">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={handleOpenChat} class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">Chat 1</div>
    </div>
</div>

{#if isStartingNewChat}
    <CreateChat on:close={handleCloseDialog} />
{/if}