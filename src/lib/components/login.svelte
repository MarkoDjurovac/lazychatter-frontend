<script lang="ts">
    import type { User, UserInput } from '../types';
    import logoIcon from '$lib/assets/logo.svg';
    import { createEventDispatcher } from 'svelte';
    import { login } from '../../services/login';
    import { register } from '../../services/user';
    import { Utils } from '$lib/utilities';

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
     * Toggles the form based on login or register.
     * @function
     */
    function toggleRegisterForm() {
        isRegistering = !isRegistering;
    }

    /*
     * Handles the login of an existing user.
     * @async
     * @function
     * @param event The event that triggered the function call.
     */
    async function handleLogin(event: Event) {
        const userInput: UserInput = Utils.getUserInput(event);
        const jwt = await login(userInput);
        
        if (jwt) {
            localStorage.setItem('jwt', jwt);
            dispatch('login', localStorage.getItem('jwt'));
        }
    }

    /*
     * Handles the registration of a new user.
     * @function
     * @param event The event that triggered the function call.
     */
    function handleRegister(event: Event) {
        const userInput: UserInput = Utils.getUserInput(event);
        
        // TODO: validate input
        const result = {
            isValid: true,
            message: "OK"
        };//Utils.validateUserInput(userInput);
    

        if(!result.isValid) {
            // The error message should be displayed as a toast.
            console.log(result.message);
        }
        else {
            const result = register(userInput);
            console.log(result);
        }
    }
</script>

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
                <input type="text" name="username" placeholder="Username" class="w-full mb-4 rounded-md"/>
                <input type="password" name="password" placeholder="Password" class="w-full mb-4 rounded-md"/>
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div>Not registered? Click <u on:click={toggleRegisterForm} class="cursor-pointer">here</u> to register.</div>
            </form>
        {/if}
    </div>	
</div>