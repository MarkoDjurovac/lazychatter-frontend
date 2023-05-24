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

<style>
  div.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f1f1f1;
    height: 100vh;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  img {
    margin-top: 1rem;
    width: 100px;
    height: 100px;
  }
</style>

<div class="login">
  <img src="logo.png" alt="lazyChatter logo" />
  <p>
    <b>
      Welcome to lazyChatter (pre-α)!
    </b>
  </p>
  <form on:submit={login}>
    <label for="username">Username:</label>
    <input id="username" bind:value={username} type="text" required />
    <label for="accessToken">Access Token:</label>
    <input id="accessToken" bind:value={accessToken} type="password" required />
    <button type="submit">Log in</button>
  </form>
</div>