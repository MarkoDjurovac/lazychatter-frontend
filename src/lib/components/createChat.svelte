<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount }  from 'svelte';
    import { getUserList } from '../../services/user';
    import { startNewChat } from '../../services/chat';
    import defaultUserIcon from '$lib/assets/default-pp.svg';
    import closeIcon from '$lib/assets/close.svg';

    const dispatch = createEventDispatcher();
    let allUsers: string[] = [];
    let selectedUsers: string[] = [];

    onMount(async () => {
        const res = await getUserList();
        allUsers = res.data;
    });

    function handleCloseDialog() {
        dispatch('close');
    };

    async function handleStartChat() {
        const res = await startNewChat(selectedUsers);
        dispatch('close', res.data);
    }

    function handleSelectParticipant(event: Event) {
        const user = (event.target as HTMLInputElement).value;
        
        if (!selectedUsers.includes(user)) {
            selectedUsers.push(user);
        } else {
            selectedUsers = selectedUsers.filter((selectedUser) => selectedUser !== user);
        }
    }
</script>

<div class="fixed inset-0 flex items-center justify-center z-10">
    <div class="bg-black opacity-50 fixed inset-0" style="backdrop-filter: blur(5px);"></div>
    <dialog open class="border rounded-md relative bg-white">
        <div class="flex items-center bg-slate-300">
            Chat with User
            <button on:click={handleCloseDialog} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
              <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
            </button>
        </div>
        <div class="p-5">
            {#each allUsers as user}
                <div class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
                    <input type="checkbox" value={user} on:change={handleSelectParticipant}/>
                    <img src={defaultUserIcon} alt="User icon" class="w-8 h-8 inline-block mr-2"/>
                    {user}
                </div>
            {/each}
            <button on:click={handleStartChat} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
                Start new chat
            </button>
        </div>
    </dialog>    
</div>