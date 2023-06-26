<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import closeIcon from '$lib/assets/close.svg';
  import sendIcon from '$lib/assets/send.svg';

    const dispatch = createEventDispatcher();
    let chatMessages = [
      { sender: 'User', message: 'Hello' },
      { sender: 'Bot', message: 'Hi there!' },
      { sender: 'User', message: 'How are you?' },
      { sender: 'Bot', message: 'I\'\m doing great, thank you!' }
    ];
  
    let newMessage = '';
  
    function sendMessage() {
      chatMessages = [...chatMessages, { sender: 'User', message: newMessage }];
      newMessage = '';
    }

    function handleCloseChat() {
      dispatch('closechat');
    }
  </script>
  
  <div class="flex flex-col h-full bg-white space-y-4">
    <div class="flex items-center bg-slate-300 p-1">
      Chat with User
      <button on:click={handleCloseChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
        <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
      </button>
    </div>
    <div>
      {#each chatMessages as message}
        <div class="flex items-center p-1">
          {message.sender}: {message.message}
        </div>
      {/each}
    </div>
    <div class="flex items-center bg-slate-300 p-1">
      <input type="text" bind:value={newMessage} class="flex-grow py-2 px-4 bg-gray-50 rounded"/>
      <button on:click={sendMessage}>
        <img src={sendIcon} alt="Send message" class="w-8">
      </button>
    </div>
  </div>