<script lang="ts">
  import Sidebar from '../components/Sidebar.svelte';
  import ConversationList from '../components/ConversationList.svelte';
  import Conversation from '../components/Conversation.svelte';
  import type { IUser, IConversation } from '../types';

  export let user: IUser;

  let showConversations = false;
  let showConversation = false;
  let selectedConversation: IConversation;
  
  function handleToggleConversations(e: CustomEvent) {
    showConversations = !showConversations;
  }

  function handleSelectConversation(e: CustomEvent) {
    selectedConversation = e.detail;
    showConversation = !showConversation;
  }

  function handleToggleTheme(e: CustomEvent) {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  function handleShowSettings(e: CustomEvent) {
    console.log("Settings");
  }

  const initialTheme = localStorage.getItem('theme');
  if (initialTheme) {
    document.documentElement.setAttribute('data-theme', initialTheme);
  }

</script>

<style>
  .main-view {
    display: flex;
    height: 100%;
  }

  .sidebar {
    width: 20%;
    background-color: #f0f0f0;
    padding: 1rem;
  }

  .conversation-list {
    width: 30%;
    background-color: #e0e0e0;
    padding: 1rem;
  }

  .conversation {
    width: 50%;
    background-color: #d0d0d0;
    padding: 1rem;
  }
</style>

<div class="main-view">
  <div class="sidebar">
    <Sidebar {user} on:toggleconvos={handleToggleConversations}
                    on:toggletheme={handleToggleTheme}
                    on:showsettings={handleShowSettings}/>
  </div>
  {#if showConversations}
    <div class="conversation-list">
      <ConversationList {user} on:selectconversation={handleSelectConversation} />
    </div>
  {/if}
  {#if selectedConversation}
    <div class="conversation">
      <Conversation {selectedConversation}/>
    </div>
  {/if}
</div>