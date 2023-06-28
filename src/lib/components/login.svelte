<script lang="ts">
    import Cookies from 'js-cookie';
    import Toast from '$lib/components/toast.svelte';
    import { createEventDispatcher } from 'svelte';
    import { login } from '../../services/login';
    import { register } from '../../services/user';
    import { Utils } from '$lib/utilities'; 
    import type { User, UserInput } from '../types';
    import logoIcon from '$lib/assets/logo.svg';

    /*
     * Dispatches events to the parent component.
     * @function
     */
    const dispatch = createEventDispatcher();

    /*
     * Indicates whether the user wants to login or register.
     * @type {boolean}
     */
    let isRegistering: boolean = false;

    /*
     * The user that is currently logged in.
     * @type {User}
     */
    let user: User | null;

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
     * Toggles the form based on login or register.
     * @function
     */
    function toggleRegisterForm() {
        isRegistering = !isRegistering;
    }

    /*
     * Handles the login of an existing user. Displays a toast message on success or error.
     * @async
     * @function
     * @param event The event that triggered the function call.
     */
    async function handleLogin(event: Event) {
        try {
            const userInput: UserInput = Utils.getUserInput(event);
            user = await login(userInput);
            if (Cookies.get('jwt')) {
                dispatch('login', user);
            }
        }
        catch(error: any) {
            switch(error.response.status) {
                case 401:
                    error = 'Invalid credentials.';
                    break;
                case 404:
                    error = 'User not found.';
                    break;
                default:
                    error = 'Something went wrong.';
                    break;
            }
            showToast(error, 'error');
        }  
    }

    /*
     * Handles the registration of a new user, displays a toast message on success or error.
     * @function
     * @param event The event that triggered the function call.
     */
    async function handleRegister(event: Event) {
        const userInput: UserInput = Utils.getUserInput(event);
        const validation: any = Utils.validateUserInput(userInput);
    
        if(!validation.isValid) {
            showToast(validation.message, 'error');
            highlightInvalidFields(validation.location);
        }
        else {
            try {
                const result = await register(userInput);
                showToast(result.data, 'success');
            }
            catch(error: any) {
                showToast(error.response.data, 'error');
            }
        }
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
</script>

{#if isToastVisible}
    <Toast message={toastMessage} type={toastType} on:close={() => (isToastVisible = false)} />
{/if}

<div class="flex items-center justify-center h-screen shadow-lg">
    <div class="bg-white p-6 rounded-lg">
        <img src={logoIcon} alt="Default profile icon" class="w-64 mx-auto"/>
        {#if isRegistering}
            <h1 class="text-3xl font-bold mb-4 text-center">
                Welcome to lazyChatter (BETA)!
            </h1>
            <form on:submit|preventDefault={handleRegister}>
                <input type="text" name="username" placeholder="Username" class="w-full mb-4 rounded-md" required/>
                <input type="password" name="password" placeholder="Password" class="w-full mb-4 rounded-md" required/>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div>Go <u on:click={toggleRegisterForm} class="cursor-pointer">back</u> to login.</div>
            </form>
        {:else}
            <h1 class="text-3xl font-bold mb-4 text-center">
                Welcome back to lazyChatter (BETA)!
            </h1>
            <form on:submit|preventDefault={handleLogin} class="w-full">
                <input type="text" name="username" placeholder="Username" class="w-full mb-4 rounded-md" required/>
                <input type="password" name="password" placeholder="Password" class="w-full mb-4 rounded-md" required/>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div>Not registered? Click <u on:click={toggleRegisterForm} class="cursor-pointer">here</u> to register.</div>
            </form>
        {/if}
    </div>	
</div>