<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <ul id="filelist">
    <li v-for="list in lists">
      <form v-bind:action="appurl + '/download'" method="get">
        <input class="sr-only" type="text" v-bind:value="list" name="filename">
        <button>{{list}}</button>
      </form>
  </ul>
</template>
<style>

</style>
<script>
  export default{

  }
</script>
