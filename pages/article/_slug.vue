<template>
  <div class="article-slug">
    <article>
      <header class="has-text-centered">
        <!-- {{ post.fields }} -->
        <p class="title is-1">
          {{ post.fields.title }}
        </p>
        <section class="flex flex-j-center flex-center">
          <div>
            {{ ( new Date(post.fields.publishDate)).toDateString() }}
          </div>
          <div class="tags-container">
            <span v-for="tag in post.fields.tags" :key="tag" class="tag is-rounded">
              {{ tag }}
            </span>
          </div>
        </section>
          <!-- <img :src="post.fields.thumbnail.fields.file.url" width="320"/> -->
          <!-- <img :src="post.fields.thumbnail.fields.file.url" :alt="post.fields.heroImage.fields.description" width="320"/> -->
      </header>
      <div class="post-body content">
        <div v-html="$md.render(post.fields.body)"></div>
      </div>
    </article>
  </div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  layout: 'no-top',
  head () {
    return {
      title: `${this.post.fields.title} - Taishi Kato`,
      meta: [
        { hid: 'description', name: 'description', content: this.post.fields.description },
        { hid: 'og:title', name: 'og:title', content: `${this.post.fields.title} - Taishi Kato` },
        { hid: 'og:type', name: 'og:type', content: 'article' },
        { hid: 'og:description', name: 'og:description', content: this.post.fields.description },
        { hid: 'og:image', name: 'og:image', content: `https:${this.post.fields.heroImage.fields.file.url}?w=1200` },
      ]
    }
  },
  asyncData ({ env, params }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': params.slug
    }).then(entries => {
      return {
        post: entries.items[0]
      }
    })
    .catch(console.error);
  }
}
</script>

<style scoped lang="scss">
header {
  background-color: white;
  padding: 100px 0;
  .title {
    width: 800px;
    margin: 0 auto 20px;
  }
}
.post-body {
  width: 600px;
  margin: 30px auto 50px;
}

.tags-container {
  margin-left: 20px;
}
</style>