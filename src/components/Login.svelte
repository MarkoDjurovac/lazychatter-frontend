<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { authenticate } from '../mock/auth';
    import type { IUser } from '../types';
  
    const dispatch = createEventDispatcher();
  
    let username: string = '';
    let accessToken: string = '';
  
    async function login(event: Event) {
      event.preventDefault();
  
      const user: IUser = await authenticate(username, accessToken);
  
      if (user) {
        dispatch('login', user);
      } else {
        alert('Invalid username or access token');
      }
    }
  </script>
  
  <form on:submit={login}>
    <label for="username">Username:</label>
    <input id="username" bind:value={username} type="text" required />
    <label for="accessToken">Access Token:</label>
    <input id="accessToken" bind:value={accessToken} type="password" required />
    <button type="submit">Log in</button>
  </form>