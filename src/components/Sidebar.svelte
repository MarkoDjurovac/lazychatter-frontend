<script lang="ts">
  import Profile from './Profile.svelte';
  import type { IUser } from '../types';
  import { createEventDispatcher } from 'svelte';

  export let user: IUser;

  const dispatch = createEventDispatcher();

  function handleToggleConversations() {
    if (user) {
      dispatch('toggleconvos');
      const convoBtn = document.getElementById('convo-btn');
      convoBtn.textContent = convoBtn.textContent === 'Hide Conversations' ? 'Show Conversations' : 'Hide Conversations';
    } else {
      alert('Invalid username or access token');
      location.reload();
    }
  }

  function handleToggleTheme() {
    if (user) {
      dispatch('toggletheme');
      const themeBtn = document.getElementById('theme-btn');
      themeBtn.textContent = themeBtn.textContent === 'Light Mode' ? 'Dark Mode' : 'Light Mode';
    } else {
      alert('Invalid username or access token');
      location.reload();
    }
  }

  function handleShowSettingsDialog(){
    if (user) {
      dispatch('showsettings');
    } else {
      alert('Invalid username or access token');
      location.reload();
    }
  }
</script>

<style>
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    margin-top: 1rem;
  }
</style>

<div class="sidebar">
  <Profile {user}/>
  <div class="options">
    <button on:click={handleToggleConversations} id="convo-btn">Show Conversations</button>
    <button on:click={handleToggleTheme} id="theme-btn" disabled>Dark Mode</button>
    <button on:click={handleShowSettingsDialog} id="settings-btn" disabled>Settings</button>
  </div>
</div>