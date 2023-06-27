<script lang="ts">
    import ChatListItem from '$lib/components/chatListItem.svelte';
    import newChatIcon from '$lib/assets/new_chat.svg';
    import closeIcon from '$lib/assets/close.svg';
    import { createEventDispatcher } from 'svelte';
    import CreateChat from '$lib/components/createChat.svelte';
    import type { Chat, User } from '$lib/types';
    import { onMount } from 'svelte';
    import { getUserChats } from '../../services/chat';

    const dispatch = createEventDispatcher();

    let allChats: Chat[] = [];
    let chats: Chat[] = [];
    let search: string = '';
    let isStartingNewChat: boolean = false;

    onMount(async () => {
        allChats = await getUserChats();
        chats = [...allChats];
    });

    function handleOpenChat(event: CustomEvent) {
        dispatch('openchat', event.detail);
    }

    function handleCloseChatList() {
        dispatch('closechatlist');
    }

    function handleStartChat() {
        isStartingNewChat = true;
    }

    async function handleCloseDialog(event: CustomEvent) {
        isStartingNewChat = false;
        allChats = await getUserChats();
        chats = [...allChats];
    }

    function filterChats(event: Event) {
        const search = (event.target as HTMLInputElement).value;
        chats = allChats.filter(chat => chat.paritcipants.filter(participant => participant.username?.toLowerCase().includes(search.toLowerCase())).length > 0);
    }
  </script>
  

  <div class="flex flex-col h-full bg-white space-y-4">
    <div class="flex items-center bg-slate-300 p-1">
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
        {/each}
    </div>
</div>

{#if isStartingNewChat}
    <CreateChat on:close={handleCloseDialog} />
{/if}