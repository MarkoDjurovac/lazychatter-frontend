<script lang="ts">
    import Toast from '$lib/components/toast.svelte';
    import { createEventDispatcher } from 'svelte';
    import { onMount }  from 'svelte';
    import { getUserList } from '../../services/user';
    import { startNewChat } from '../../services/chat';
	import type { Chat, User} from '$lib/types';
    import defaultUserIcon from '$lib/assets/default-pp.svg';
    import closeIcon from '$lib/assets/close.svg';

    export let user: User;
    
   /*
    * Dispatches events to the parent component.
    * @function
    */
    const dispatch = createEventDispatcher();

   /*
    * All users that are currently registered.
    * @type {User[]}
    */
    let allUsers: User[] = [];

    /*
     * The users that are currently selected.
     * @type {User[]}
     */
    let selectedUsers: User[] = [];

        /*
     * Indicates whether the message toast is visible.
     * @type {boolean}
     */
     let isToastVisible: boolean = false;

    /*
    * The message to show in the toast.
    * @type {string}
    */
    let toastMessage: string = '';

    /*
    * The type of toast to show.
    * @type {string}
    */
    let toastType: string = '';

    /*
     * Gets all users when the component is mounted.
     */
    onMount(async () => {
        try {
            allUsers = await getUserList();
            allUsers = allUsers.filter(u => u.username !== user.username);
        }
        catch(error: any) {
            showToast('Error while fetching users.', 'error');
        }
    });

    /*
     * Handles the close event.
     */
    function handleCloseDialog() {
        dispatch('close');
    };

    /*
     * Handles the startchat event.
     */
    async function handleStartChat() {
        try {
            const chat: Chat = await startNewChat(selectedUsers);
            dispatch('close', chat);
        }
        catch(error: any) {
            showToast('Error while starting chat.', 'error');
        }
    }

    /*
     * Handles the selection of a chat participant.
     * @param {Event} event - The event that is dispatched when the user selects a chat participant.
     */
    function handleSelectParticipant(event: Event) {
        const username: string = (event.target as HTMLInputElement).value;
        
        if (selectedUsers.find(user => user.username === username)) {
            selectedUsers = selectedUsers.filter(user => user.username !== username);
        } else {
            selectedUsers.push(allUsers.find(user => user.username === username)!);
        }
    }

    /*
    * Shows a toast message.
    * @param {string} message - The message to show.
    * @param {string} type - The type of toast to show.
    */
    function showToast(message: string, type: string) {
        toastMessage = message;
        toastType = type;
        isToastVisible = true;

        setTimeout(() => {
            isToastVisible = false;
        }, 3000);
    }
</script>

{#if isToastVisible}
    <Toast message={toastMessage} type={toastType}/>
{/if}
<div class="fixed inset-0 flex items-center justify-center z-10">
    <div class="bg-black opacity-50 fixed inset-0" style="backdrop-filter: blur(5px);"></div>
    <dialog open class="border rounded-md relative bg-white">
        <div class="flex items-center bg-slate-200">
            Chat with User
            <button on:click={handleCloseDialog} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
              <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
            </button>
        </div>
        <div class="p-5">
            {#each allUsers as user}
                <div class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
                    <input type="checkbox" value={user.username} on:change={handleSelectParticipant}/>
                    <img src={defaultUserIcon} alt="User icon" class="w-8 h-8 inline-block mr-2"/>
                    {user.username}
                </div>
            {/each}
            <button on:click={handleStartChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
                Start new chat
            </button>
        </div>
    </dialog>    
</div>