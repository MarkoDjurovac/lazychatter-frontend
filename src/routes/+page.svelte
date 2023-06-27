<script lang="ts">
	import type { User } from '../lib/types';
	import Home from '../lib/components/home.svelte';
	import Login from '../lib/components/login.svelte';
	import Toast from '../lib/components/toast.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { getMyUserData } from '../services/user';

	let isLoggedIn = false;
	let isRegisterSuccessful = false;
	let user: User;

	function handleLogin(event: CustomEvent) {
		user = event.detail;
		// if JWT is valid, set isLoggedIn to true and save the JWT in local storage
		if (user) {
			isLoggedIn = true;
		}
	}

	function handleRegister(event: CustomEvent) {
		// show toast
		console.log(event.detail.data);
		isRegisterSuccessful = true;
	}

	onMount(async () => {
		if (Cookies.get('jwt')) {
			user = await getMyUserData();
			isLoggedIn = true;
		}
	});
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