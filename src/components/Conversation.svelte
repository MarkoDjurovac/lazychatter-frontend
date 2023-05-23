<script lang="ts">
  import type { IConversation, IUser, IMessage } from '../types';
  import Message from './Message.svelte';

  export let selectedConversation: IConversation;

  let message = '';

  function handleSendMessage() {
    console.log('Send message: ' + message);
  }

  let isHoldingSend = false;
  let showSendingOptions = false;

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
</script>

<style>
  .sending-options {
    position: absolute;
    bottom: 50px;
    left: 0;
    z-index: 1;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    padding: 10px;
  }

  .sending-options button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .sending-options button:hover {
    background-color: #ddd;
  }

  /* Add this style to the parent element of the send button */
  .send-button-container {
    position: relative;
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
    <input bind:value={message} type="text" placeholder="Type a message..." />
    <!-- Add the send-button-container class to the parent element of the send button -->
    <div class="send-button-container">
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <button
        on:mousedown={handleMouseDown}
        on:mouseup={handleMouseUp}
        on:click={handleSendMessage}>
        Send
      </button>
      {#if showSendingOptions}
        <div
          class="sending-options"
          on:mouseleave={() => showSendingOptions = false}>
          <button>I'm lazy!</button>
        </div>
      {/if}
    </div>
    <button on:click={handleCloseConversation}>Close conversation</button>
  </div>
{:else}
  <div>Please select a conversation</div>
{/if}