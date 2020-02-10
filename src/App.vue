<template>
  <div>
    <nav class="navbar">
      <div class="link">
        <router-link to="/">home</router-link>
      </div>
      <div class="link">
        <router-link to="/favorite">favorite</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
.navbar {
  display: 'flex';
  justify-content: center;
}
.link {
  margin: 10px;
}
</style>
