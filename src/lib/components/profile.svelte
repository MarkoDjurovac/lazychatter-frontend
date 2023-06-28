<script lang="ts">
    import Toast from '$lib/components/toast.svelte';
    import { onMount } from 'svelte';
	import { getMyUserData, updateUserData, deleteUser } from '../../services/user';
    import { createEventDispatcher } from 'svelte';
	import { Utils } from '$lib/utilities';
    import type { UserInput, User } from '$lib/types';
    import closeIcon from '$lib/assets/close.svg';

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * The user that is currently logged in.
     * @type {User}
     */
    let user: User;

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
     * Gets the user data when the component is mounted.
     * @function
     */
    onMount(async () => {
        try {
            user = await getMyUserData();
        } catch (error) {
            showToast('Error while fetching user data.', 'error');
        }
    });
    
    /*
     * Handles the closeprofile event.
     */
    function handleCloseDialog() {
        dispatch('closeprofile');
    }

    /*
     * Handles the savechanges event.
     * @param {Event} event - The event that is dispatched when the user saves the changes.
     */
    async function handleSaveChanges(event: Event) {
        const userInput: UserInput = Utils.getUserInput(event);
        const validation: any = Utils.validateUserInput(userInput);
        
        if(!validation.isValid) {
            showToast(validation.message, 'error');
            highlightInvalidFields(validation.location);
        }
        else {
            try {
                await updateUserData(userInput);
                dispatch('profileupdatedordeleted');
            } catch (error: any) {
                showToast('Error while updating user.', 'error');
            }
        }
    }

    /*
     * Deletes the logged in user.
     * @function
     * @async
     */
    async function handleDeleteUser() {
        try {
            await deleteUser();
            dispatch('profileupdatedordeleted');
        } catch (error: any) {
            showToast('Error while deleting user.', 'error');
        }
    }

    /*
     * Highlights invalid fields and removes the highlight when the user starts typing.
     * @function
     * @param location The location of the invalid field.
     */
     function highlightInvalidFields(location: string) {
        const input = document.querySelector(`input[name=${location}]`);
        console.log(input);
        input?.classList.add('border-red-500');
        input?.addEventListener('input', () => {
            input.classList.remove('border-red-500');
        });
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
<div class="fixed inset-0 flex items-center justify-center z-10">
    <div class="bg-black opacity-50 fixed inset-0" style="backdrop-filter: blur(5px);"></div>
    <dialog open class="border rounded-md relative bg-white p-0">
        <div class="flex items-center justify-between bg-slate-300 p-2">
            <b>Edit Profile</b>
            <button on:click={handleCloseDialog} class="hover:bg-slate-200 text-black font-bold p-2 rounded transition duration-500 ease-in-out ml-2">
              <img src={closeIcon} alt="Close chat" class="w-8 h-8"/>
            </button>
        </div>
        <div class="p-5">
            <form on:submit|preventDefault={handleSaveChanges}>
                <input type="text" name="username" placeholder="New username" value={user?.username} class="w-full mb-4 rounded-md" required/>
                <input type="password" name="password" placeholder="New password" class="w-full mb-4 rounded-md" required/>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save changes
                </button>
                <button on:click={handleDeleteUser} class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Delete this profile
                </button>
            </form>
        </div>
    </dialog>    
</div>