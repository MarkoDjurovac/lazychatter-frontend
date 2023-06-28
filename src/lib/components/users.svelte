<script lang="ts">
    import Toast from '$lib/components/toast.svelte';
    import { createEventDispatcher } from 'svelte';
    import {onMount, onDestroy} from 'svelte';
    import {getUserList} from '../../services/user';
	import type { User } from '$lib/types';
    import defaultUserIcon from '$lib/assets/default-pp.svg';
    import closeIcon from '$lib/assets/close.svg';

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
     * The users that are currently displayed.
     * @type {User[]}
     */
    let users: User[] = [];

    /*
     * The search string.
     * @type {string}
     */
    let search: string = '';

    /*
     * Contains the interval that polls for all registered users.
     * @type {any}
     */
    let pollingInterval: any;

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
    * @function
    */
    onMount(async () => {
        try {
            allUsers = await getUserList();
            users = [...allUsers];

            pollingInterval = setInterval(async () => {
                allUsers = await getUserList();
                users = [...allUsers];
            }, 1000);
        }catch(error: any) {
            showToast('Error while fetching users.', 'error');
        }
    });

    /*
     * Handles the close event.
     * @function
     */
    function handleCloseContacts() {
        dispatch('closecontacts');
    }

    /*
     * Filter users by search string.
     * @param {Event} event - The event that provides the search string.
     */
    function filterUsers(event: Event) {
        search = (event.target as HTMLInputElement).value;
        users = allUsers.filter(user => user.username?.includes(search));
    }

    /*
     * Shows a toast message.
     * @function
     * @param message The message to show.
     * @param type The type of toast to show.
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
<div class="flex flex-col h-full bg-white space-y-4">
    <div class="flex items-center bg-slate-200 p-1">
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