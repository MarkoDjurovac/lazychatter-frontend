<script lang="ts">
    import Sidebar from '$lib/components/sidebar.svelte';
    import ChatList from '$lib/components/chatList.svelte';
    import Chat from '$lib/components/chat.svelte';
    import Users from '$lib/components/users.svelte';
    import { fly } from 'svelte/transition';
    
    let isContactsOpen = false;
    let isChatListOpen = false;
    let isChatOpen = false;
    let isSettingsOpen = false;

    let chat: any;

    function handleOpenContacts() {
        isContactsOpen = true;
        isChatListOpen = false;
    }

    function handleOpenChatList() {
        isChatListOpen = true;
        isContactsOpen = false;
    }

    function handleOpenChat(event: CustomEvent) {
        isChatOpen = true;
        chat = event.detail;
    }

    function handleCloseChatList() {
        isChatListOpen = false;
    }

    function handleCloseContacts() {
        isContactsOpen = false;
    }

    function handleCloseChat() {
        isChatOpen = false;
    }

    function handleOpenSettings() {
        isSettingsOpen = true;
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        window.location.reload();
    }

    function handleToggleTheme() {
        // TODO: toggle theme
    }
</script>


<div class="min-h-screen flex items-center justify-center">
    <div class="flex w-full max-w-6xl rounded shadow-lg overflow-hidden mx-auto h-app">
        <div class="flex flex-col justify-between bg-gray-50 p-4 border-r border-gray-500">
            <Sidebar on:opencontacts={handleOpenContacts} 
                        on:openchatlist={handleOpenChatList}
                        on:opensettings={handleOpenSettings}
                        on:logout={handleLogout}
                        on:toggletheme={handleToggleTheme}/>
        </div>
        {#if !isContactsOpen && !isChatListOpen && !isChatOpen}
            <div class="flex-1" transition:fly="{{ x: -10000, duration: 300 }}">
                <div class="flex flex-col justify-center items-center h-full bg-gray-100">
                    <h1 class="text-4xl font-bold">Welcome to lazyChatter!</h1>
                    <p class="text-xl">Click on the icons on the left to get started.</p>
                </div>
            </div>
        {/if}
        {#if isChatListOpen}
            <div class="flex-1" transition:fly="{{ x: -10000, duration: 300 }}"> 
                <ChatList on:openchat={handleOpenChat} on:closechatlist={handleCloseChatList}/>
            </div>
        {/if}
        {#if isContactsOpen}
            <div class="flex" transition:fly="{{ x: -10000, duration: 300 }}">
                <Users on:closecontacts={handleCloseContacts}/>
            </div>
        {/if}
        {#if isChatOpen}
            <div class="flex-1 border-l border-gray-500" transition:fly="{{ x: -10000, duration: 300 }}">
                <Chat on:closechat={handleCloseChat} chat={chat}/>
            </div>
        {/if}
    </div>
</div>