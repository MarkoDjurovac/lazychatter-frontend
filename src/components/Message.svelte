<script lang="ts">
  import type { IMessage} from "../types";

  export let msg: IMessage;
  let isSent = msg.sent;
</script>

<style>
  .message {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: #f0f0f0;
  }

  .text {
    font-size: 1.2rem;
  }

  .timestamp {
    font-size: 0.8rem;
    color: #d8d5d5;
  }

  .sent {
  background-color: #007bff;
  color: #fff;
  margin-left: auto;
}

.recieved {
  background-color: #f0f0f0;
  color: #000;
  margin-right: auto;
}

</style>

<div class="message {isSent ? 'sent' : 'recieved'}">
  <div class="text">{msg.text}</div>
  <div class="timestamp">{msg.timestamp}</div>
</div>