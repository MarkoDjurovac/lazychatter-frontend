<script lang="ts">
	import type { User } from '../lib/types';
	import Home from '../lib/components/home.svelte';
	import Login from '../lib/components/login.svelte';
	import { fly } from 'svelte/transition';
	import {  onMount } from 'svelte';

	let isLoggedIn = false;
	let user: User;

	function handleLogin(event: CustomEvent) {
		const jwt = event.detail;
		// if JWT is valid, set isLoggedIn to true and save the JWT in local storage
		if (jwt) {
			localStorage.setItem('jwt', jwt);
			isLoggedIn = true;
		}
	}

	function handleRegister(event: CustomEvent) {
		
	}

	onMount(() => {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
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
		<Home />
	</div>
{/if}