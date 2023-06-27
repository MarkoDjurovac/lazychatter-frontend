<script lang="ts">
    import defaultProfileIcon from '$lib/assets/default-pp.svg';
    import closeIcon from '$lib/assets/close.svg';
    import { onMount } from 'svelte';
	import { getMyUserData, updateUserData } from '../../services/user';
    import { createEventDispatcher } from 'svelte';
	import type { UserInput, User } from '$lib/types';
	import { Utils } from '$lib/utilities';

    const dispatch = createEventDispatcher();
    let user: User;
    
    onMount(async () => {
        user = await getMyUserData();
    });

    function handleCloseDialog() {
        dispatch('closeprofile');
    }

    async function handleSaveChanges(event: Event) {
        const userInput: UserInput = Utils.getUserInput(event);
        const result = await updateUserData(userInput);

        if( result.status === 200) {
            dispatch('profileupdated');
        }
    }
</script>


<div class="fixed inset-0 flex items-center justify-center z-10">
    <div class="bg-black opacity-50 fixed inset-0" style="backdrop-filter: blur(5px);"></div>
    <dialog open class="border rounded-md relative bg-white">
        <div class="flex items-center bg-slate-300">
            Edit Profile
            <button on:click={handleCloseDialog} class="hover:bg-slate-200 text-black font-bold py-2 px-4 rounded transition duration-500 ease-in-out ml-2">
              <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
            </button>
        </div>
        <div class="p-5">
            <form on:submit|preventDefault={handleSaveChanges}>
                <input type="text" name="username" placeholder="New username" value={user?.username} class="w-full mb-4 rounded-md"/>
                <input type="password" name="password" placeholder="New password" class="w-full mb-4 rounded-md"/>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save changes
                </button>
            </form>
        </div>
    </dialog>    
</div>