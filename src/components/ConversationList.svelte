<script lang="ts">
  import { onMount } from 'svelte';
  import type { IConversation, IUser } from '../types';
  import { getConversations } from '../mock/conversations';
  import { createEventDispatcher } from 'svelte';

  export let user: IUser;

  const dispatch = createEventDispatcher();

  let conversations: IConversation[] = [];

  onMount(async () => {
      conversations = await getConversations(user);
  });
    
  function handleSearch(e: Event) {
      const query = (e.target as HTMLInputElement).value;
      conversations = conversations.filter(conversation => conversation.title.includes(query));
  }

  function handleSelect(conversation: IConversation) {
      dispatch('selectconversation', conversation);
  }
</script>

<style>
  .conversation-list {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-bottom: 1rem;
  }

  .conversation-item {
    margin-bottom: 1rem;
    cursor: pointer;
  }

  .conversation-item:hover {
    background-color: #eee;
  }
</style>

<div class="conversation-list">
  <input type="text" on:input={handleSearch} placeholder="Search Conversations" />
  {#each conversations as conversation}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="conversation-item" on:click={() => handleSelect(conversation)}>
      {conversation.title}
    </div>
  {/each}
</div>