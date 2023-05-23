<script lang="ts">
  import Login from './components/Login.svelte';
  import Main from './views/Main.svelte';
  import type { IUser } from './types';

  let user: IUser;

  function handleLogin(e: CustomEvent) {
    user = e.detail;
  }
</script>

{#if user}
  <Main {user}/>
{:else}
  <Login on:login={handleLogin} />
{/if}