<script lang="ts">
    import type { IUser } from '../types';
    export let user: IUser;
</script>
<style>
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
</style>

{#if user}
    <div>
        <img src={user.profilePicture + ".svg"} alt={user.name} />
        <h2>{user.name}</h2>
    </div>
{:else}
    <div>Loading...</div>
{/if}