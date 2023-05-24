<script lang="ts">
  import type { IMessage} from "../types";

  export let msg: IMessage;
  let isSent = msg.sent;
  let timestamp = new Date(msg.timestamp).toLocaleTimeString("de-DE", {
    hour: "numeric",
    minute: "numeric",
  });
</script>

<style>
  .message {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 0.5rem;
    max-width: 200px;
  }

  .text {
    font-size: 1.2rem;
  }

  .timestamp {
    font-size: 0.8rem;
    color: #000000;
    text-align: right;
  }

  .sent {
  background-color: #068b39;
  color: #fff;
  margin-left: auto;
}

.recieved {
  background-color: #007bff;
  color: #000;
  margin-right: auto;
}

</style>

<div class="message {isSent ? 'sent' : 'recieved'}">
  <div class="text">{msg.text}</div>
  <div class="timestamp"><i>{timestamp}</i></div>
</div>