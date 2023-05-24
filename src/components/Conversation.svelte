<script lang="ts">
  import type { IConversation, IUser, IMessage } from '../types';
  import { sendMessage, sendAiMessage } from '../mock/messaging';
  import Message from './Message.svelte';

  export let selectedConversation: IConversation;
  export let user: IUser;

  let message = '';

  async function handleSendMessage() {
    if (message) {
      selectedConversation = await sendMessage(user, selectedConversation, message);
    }
  }

  async function handleSendAiMessage() {
    selectedConversation = await sendAiMessage(user, selectedConversation);
  }

  let isHoldingSend = false;
  let showSendingOptions = false;
  let showAiPrompt = false;

  function handleMouseDown() {
    console.log('Mouse down');
    isHoldingSend = true;
    setTimeout(() => {
      if (isHoldingSend) {
        console.log('Show sending options');
        showSendingOptions = true;
      }
    }, 1000);
  }

  function handleMouseUp() {
    console.log('Mouse up');
    isHoldingSend = false;
    showSendingOptions = false;
  }

  function handleCloseConversation() {
    selectedConversation = null;
  }

  function handleAiMessage(){
    showAiPrompt = true;
  }
</script>

<style>
  h2 {
    border-bottom: 1px solid #4b4a4a;
  }
  
  .sending-options {
    position: absolute;
    bottom: 60px;
    left: 400px;
    z-index: 1;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  }

  .sending-options button {
    display: block;
    padding: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .sending-options button:hover {
    background-color: #ddd;
  }

  .send-button-container {
    position: relative;
  }

  .send-button {
    margin-left: -48px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    width: 35px;
    height: 35px;
    background-image: url("send.png");
    background-size: 35px 35px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .send-button:hover {
    background-color: #ddd;
  }

  .send-button:active {
    background-color: #ccc;
  }

  .send-button-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-left: 10px;
  }
</style>

{#if selectedConversation}
  <div>
    <h2>{selectedConversation.title}</h2>
    <div>
      {#each selectedConversation.messages as msg (msg.id)}
        <Message {msg}/>
      {/each}
    </div>
    <div class="send-button-container">
      <input bind:value={message} type="text" placeholder="Type a message..." />
      <button
        class="send-button"
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp}
        on:click={handleSendMessage}>
      </button>
      {#if showSendingOptions}
        <div
          class="sending-options"
          on:mouseleave={() => showSendingOptions = false}>
          <button on:click={handleSendAiMessage}>I'm lazy!</button>
        </div>
      {/if}
    </div>
  </div>
  <button on:click={handleCloseConversation}>Close conversation</button>
{:else}
  <div>Please select a conversation</div>
{/if}