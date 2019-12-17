<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <b-navbar-item>
        <n-link class="title" to="/">
          {{ title }}
        </n-link>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <p class="subtitle">
          Headless blog
        </p>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      title: process.env.NUXT_ENV_TITLE || 'Seamless'
    }
  }
}
</script>
