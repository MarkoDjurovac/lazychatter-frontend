<script lang="ts">
    import Sidebar from '$lib/components/sidebar.svelte';
    import ChatList from '$lib/components/chatList.svelte';
    import ChatComp from '$lib/components/chat.svelte';
    import Users from '$lib/components/users.svelte';
    import Profile from '$lib/components/profile.svelte';
    import Cookies from 'js-cookie';
    import { fly } from 'svelte/transition';
	import type { User, Chat} from '$lib/types';
    
    /*
     * Control variables for showing and hiding components.
     * @type {boolean}
     */
    let isContactsOpen = false;
    let isChatListOpen = false;
    let isChatOpen = false;
    let isSettingsOpen = false;
    let isProfileOpen = false;
    
    /*
     * The chat to be opened.
     * @type {Chat}
     */
    let chat: Chat;

    /*
     * The user that is logged in.
     * @type {User}
     */
    export let user: User;

    /*
     * Handle the open contacts event.
     * @function
     */
    function handleOpenContacts() {
        isContactsOpen = true;
        isChatListOpen = false;
    }

    /*
     * Handle the open chat list event.
     * @function
     */
    function handleOpenChatList() {
        isChatListOpen = true;
        isContactsOpen = false;
    }

    /*
     * Handle the open chat event.
     * @function
     */
    function handleOpenChat(event: CustomEvent) {
        isChatOpen = true;
        chat = event.detail;
    }

    /*
     * Handle the close chat list event.
     * @function
     */
    function handleCloseChatList() {
        isChatListOpen = false;
    }

    /*
     * Handle the close contacts event.
     * @function
     */
    function handleCloseContacts() {
        isContactsOpen = false;
    }

    /*
    * Handle the close chat event.
    * @function
    */
    function handleCloseChat() {
        isChatOpen = false;
    }

    /*
     * Handle the open settings event.
     * @function
     */
    function handleOpenSettings() {
        isSettingsOpen = true;
    }

    /*
     * Handle logout event.
     * @function
     */
    function handleLogout() {
        Cookies.remove('jwt');
        window.location.reload();
    }

    /*
     * Handle the open profile event.
     * @function
     */
    function handleOpenProfile() {
        isProfileOpen = true;
    }

    /*
     * Handle the close profile event.
     * @function
     */
    function handleCloseProfile() {
        isProfileOpen = false;
    }

    /*
     * Handle the toggle theme event.
     * @function
     */
    function handleToggleTheme() {
        document.documentElement.classList.toggle('dark');
    }

    /*
     * Handle the profileupdatedordeleted event.
     * @function
     */
    function handleProfileUpdatedOrDeleted() {
        handleLogout();
    }
</script>


<div class="min-h-screen flex items-center justify-center">
    <div class="flex w-full max-w-6xl rounded shadow-lg overflow-hidden mx-auto h-app">
        <div class="flex flex-col justify-between bg-gray-50 p-4 border-r border-gray-500">
            <Sidebar on:opencontacts={handleOpenContacts} 
                        on:openchatlist={handleOpenChatList}
                        on:opensettings={handleOpenSettings}
                        on:logout={handleLogout}
                        on:toggletheme={handleToggleTheme}
                        on:openprofile={handleOpenProfile}/>
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
                <ChatList user={user} on:openchat={handleOpenChat} on:closechatlist={handleCloseChatList}/>
            </div>
        {/if}
        {#if isContactsOpen}
            <div class="flex-1" transition:fly="{{ x: -10000, duration: 300 }}">
                <Users on:closecontacts={handleCloseContacts}/>
            </div>
        {/if}
        {#if isChatOpen}
            <div class="flex-1 border-l border-gray-500" transition:fly="{{ x: -10000, duration: 300 }}">
                <ChatComp on:closechat={handleCloseChat} chat={chat} user={user}/>
            </div>
        {/if}
        {#if isProfileOpen}
            <Profile on:closeprofile={handleCloseProfile} on:profileupdatedordeleted={handleProfileUpdatedOrDeleted} />
        {/if}
    </div>
</div>