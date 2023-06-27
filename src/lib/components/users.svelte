<script lang="ts">
    import defaultUserIcon from '$lib/assets/default-pp.svg';
    import closeIcon from '$lib/assets/close.svg';
    import { createEventDispatcher } from 'svelte';
    import {onMount} from 'svelte';
    import {getUserList} from '../../services/user';
	import type { User } from '$lib/types';

    const dispatch = createEventDispatcher();

    let allUsers: User[] = [];
    let users: User[] = [];
    let search = '';

    onMount(async () => {
        allUsers = await getUserList();
        users = [...allUsers];
    });

    function handleCloseContacts() {
        dispatch('closecontacts');
    }

    function filterUsers(event: Event) {
        search = (event.target as HTMLInputElement).value;
        users = allUsers.filter(user => user.username?.includes(search));
    }
  </script>

<div class="flex flex-col h-full bg-white space-y-4">
    <div class="flex items-center bg-slate-300 p-1">
        <input on:input={filterUsers} bind:value={search} type="text" placeholder="Search users..." class="flex-grow py-2 px-4 bg-gray-50 rounded" />
        <button on:click={handleCloseContacts} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
            <img src={closeIcon} alt="Close contacts" class="w-8 h-8"/>
        </button>
    </div>
    <div class="overflow-y-auto space-y-4 flex-grow">
        {#each users as user}
            <div class="transition duration-500 ease-in-out hover:bg-slate-200 py-2 px-4 rounded cursor-pointer">
                <img src={defaultUserIcon} alt="User icon" class="w-8 h-8 inline-block mr-2"/>
                {user.username}
            </div>
        {/each}
    </div>
</div>