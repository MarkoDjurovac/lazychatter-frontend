<script lang="ts">
	
	import Home from '../lib/components/home.svelte';
	import Login from '../lib/components/login.svelte';
	import Toast from '../lib/components/toast.svelte';
	import Cookies from 'js-cookie';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { getMyUserData } from '../services/user';
	import type { User } from '../lib/types';

	/*
	 * Indicates whether the user is logged in or not.
	 * @type {boolean}
	 */
	let isLoggedIn = false;

	/*
	 * Indicates whether the registration was successful or not.
	 * @type {boolean}
	 */
	let isRegisterSuccessful = false;

	/*
	 * The user that is currently logged in.
	 * @type {User}
	 */
	let user: User;

	/*
	 * If there is a JWT stored, automatically log the user in.
	 * @function
	 */
	 onMount(async () => {
		if (Cookies.get('jwt')) {
			user = await getMyUserData();
			isLoggedIn = true;
		}
	});

	/*
	 * Handles the login of an existing user.
	 * @function
	 * @param event The event that triggered the function call.
	 */
	function handleLogin(event: CustomEvent) {
		user = event.detail;
		// if JWT is valid, set isLoggedIn to true and save the JWT in local storage
		if (user) {
			isLoggedIn = true;
		}
	}

	/*
	 * Handles the registration of a new user.
	 * @function
	 * @param event The event that triggered the function call.
	 */
	function handleRegister(event: CustomEvent) {
		// show toast
		console.log(event.detail.data);
		isRegisterSuccessful = true;
	}
</script>

{#if !isLoggedIn}
	<div in:fly="{{ x: -1000, duration: 500 }}" out:fly="{{ x: 1000, duration: 300 }}">
		<Login on:login={handleLogin} on:register={handleRegister} />
	</div>	
{:else if isLoggedIn}
	<div in:fly="{{ x: 1000, duration: 600 }}" out:fly="{{ x: 1000, duration: 300 }}">
		<Home user={user}/>
	</div>
{/if}
{#if isRegisterSuccessful}
	<Toast type="success" message={"OK!"} />
{/if}