<template>
  <section class="section">
    <div v-if="posts.length > 0" class="top-article-list">
      <article v-for="post in posts" :key="post.sys.id">
        <header>
          <!-- {{ post.fields }} -->
          <n-link :to="`/article/${post.fields.slug}`" class="title is-2">
            {{ post.fields.title }}
            <!-- <img :src="post.fields.thumbnail.fields.file.url" width="320"/> -->
            <!-- <img :src="post.fields.thumbnail.fields.file.url" :alt="post.fields.heroImage.fields.description" width="320"/> -->
          </n-link>
        </header>
        <div class="post-body content">
          {{ post.fields.description }}
        </div>
      </article>
    </div>
    <div v-else>
      No post yet
    </div>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  asyncData({ env }) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_PERSON_ID
      }),
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
    ])
      .then(([entries, posts]) => {
        return {
          person: entries.items[0],
          posts: posts.items
        }
    })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.section {
  margin-top: 50px;
}
.top-article-list {
  header {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    .title {
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .post-body {
    width: 600px;
    margin: 30px auto 50px;
  }
}
</style>