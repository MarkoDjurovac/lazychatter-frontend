<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { sendMessage, getMessagesByChatId} from '../../services/message';
  import closeIcon from '$lib/assets/close.svg';
  import sendIcon from '$lib/assets/send.svg';

    const dispatch = createEventDispatcher();

    export let chat: any;
    let messageText: string = '';
    let messages: any = [];

    async function sendNewMessage() {
      await sendMessage(chat.chatId, messageText);
      const res = await getMessagesByChatId(chat.chatId);
      messages = res.data;
    }

    function handleCloseChat() {
      dispatch('closechat');
    }

    onMount(async () => {
      const res = await getMessagesByChatId(chat.chatId);
      messages = res.data;
    });
  </script>
  
  <div class="flex flex-col h-full bg-white space-y-4 justify-between">
    <div class="flex items-center bg-slate-300 p-1">
      Chat with {chat.paritcipants.join(', ')}
      <button on:click={handleCloseChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
        <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
      </button>
    </div>
    <div class="overflow-y-scroll">
      {#each messages as message}
        <div class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
          {message.sender} : {message.messageText}
        </div>
      {/each}
    </div>
    <div class="flex items-center bg-slate-300 p-1">
      <input type="text" bind:value={messageText} class="flex-grow py-2 px-4 bg-gray-50 rounded"/>
      <button on:click={sendNewMessage}>
        <img src={sendIcon} alt="Send message" class="w-8">
      </button>
    </div>
  </div>