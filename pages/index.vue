<template>
  <section class="section">
    <div class="columns is-mobile">
      {{ title }}
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      title: process.env.NUXT_ENV_TITLE
    }
  }
}
</script>
