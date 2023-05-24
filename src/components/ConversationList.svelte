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
    
  async function handleSearch(e: Event) {
    const input = (e.target as HTMLInputElement).value.toLowerCase();
    conversations = await getConversations(user);

    conversations = conversations.filter((conversation) => {
      return conversation.title.toLowerCase().includes(input);
    }); 
  }

  function handleSelect(conversation: IConversation) {
      dispatch('selectconversation', conversation);
  }
</script>

<style>
  .conversation-list {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
  }

  input {
    margin-bottom: 1rem;
  }

  .conversation-title {
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
  }

  .conversation-item__last-message {
    font-size: 0.8rem;
  }
  
  .conversation-item {
    margin-bottom: 1rem;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #ccc;
    height: 80px;
  }

  .conversation-item:hover{
    background-color: #f1f1f1;
  }

  img {
    width: 30px;
    height: 30px;
    margin-left: 1rem;
  }

  .search {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  span {
    margin-left: 1rem;
  }

  input[type="text"] {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    background-image: url("search.png");
    background-size: 20px 20px;
    background-repeat: no-repeat; 
    background-position: 5px center;
    padding-left: 30px;
  }
</style>

<div class="conversation-list">
  <div class="search">
    <input type="text" on:input={handleSearch} placeholder="Search Conversations" />
  </div>
  {#each conversations as conversation}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="conversation-item" on:click={() => handleSelect(conversation)}>
      <div class="conversation-title">
        <img src="default-pp.svg" alt="User" />
        <span>{conversation.title}</span>
      </div>
      <div class="conversation-item__last-message">
        {conversation.messages[conversation.messages.length - 1].text}
      </div>
    </div>
  {/each}
</div>