<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import MessageBubble from '$lib/components/message.svelte';
  import type {Message, Chat, User} from '../types';
  import { Utils } from '$lib/utilities';
  import { sendMessage, getMessagesByChatId} from '../../services/message';
  import closeIcon from '$lib/assets/close.svg';
  import sendIcon from '$lib/assets/send.svg';

    const dispatch = createEventDispatcher();

    export let chat: Chat;
    export let user: User;
    let messageText: string = '';
    let messages: Message[] = [];

    async function sendNewMessage(event: Event) {

      let message: Message = {
        id: null,
        sender: user.username,
        messageText: messageText,
        chatID: chat.chatId,
        aiOptions: null,
      }

      await sendMessage(message);
      messages = await getMessagesByChatId(chat.chatId);
      messageText = '';
    }

    async function handleAiChat(aiOption: string) {
      let message: Message = {
        id: null,
        sender: user.username,
        messageText: "",
        chatID: chat.chatId,
        aiOptions: aiOption
      };

      await sendMessage(message);
      messages = await getMessagesByChatId(chat.chatId);
      showPopover = false;
    }

    function handleCloseChat() {
      dispatch('closechat');
    }

    onMount(async () => {
      messages = await getMessagesByChatId(chat.chatId);
    });

    let pressTimer: any;
    let showPopover = false;

    function handleMousedown() {
      pressTimer = setTimeout(() => showPopover = true, 1000);
    }

    function handleMouseup() {
      clearTimeout(pressTimer);
    }
  </script>
  
  <div class="flex flex-col h-full bg-white space-y-4 justify-between">
    <div class="flex items-center bg-slate-300 p-1">
      <b>Chat with {Utils.getParticipants(chat.paritcipants)}</b>
      <button on:click={handleCloseChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
        <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
      </button>
    </div>
    <div class="overflow-y-scroll">
      {#each messages as message}
        <MessageBubble message={message} />
      {/each}
    </div>
    <div class="flex items-center bg-slate-300 p-1 relative">
      <input type="text" bind:value={messageText} class="flex-grow py-2 px-4 bg-gray-50 rounded pr-10"/> 
      <button 
        on:click={sendNewMessage}
        on:mousedown={handleMousedown} 
        on:mouseup={handleMouseup} 
        on:mouseleave={handleMouseup}
        class="absolute right-2 bottom-2">
        <img src={sendIcon} alt="Send message" class="w-8">
      </button>
      {#if showPopover}
        <div class="absolute bottom-10 right-0 bg-white border border-gray-300 rounded shadow-lg p-2">
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-200" on:click|preventDefault={() => handleAiChat("GPT")}>I'm lazy</button>
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-200" on:click|preventDefault={() => handleAiChat("INSULT")}>I'm angry</button>
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-200" on:click|preventDefault={() => handleAiChat("COMPLIMENT")}>I'm nice</button>
        </div>
      {/if}
  </div>
  </div>