<template>
  <section>
    <section class="hero is-large">
      <div class="hero-body">
        <div class="container columns is-gapless">
          <div class="column is-4">
            <a href="/">
            </a>
          </div>
          <div class="column profile-text content is-size-5 has-text-left has-text-weight-medium">
            <p>2019年4月にヤフーを退職し、カナダはバンクーバーに移住しました。</p>
            <p>バンクーバーにいながらインディーメイカー（個人開発者）として毎月サービスを作りつつ、大好きな東南アジアでデジタルノマドをしています。</p>
          </div>
        </div>
      </div>
    </section>
    <div>
      <div v-for="post in posts" :key="post.sys.id" class="portfolio-wrap">
        <a :href="`/article/${post.fields.slug}`">
          <!-- <img :src="post.fields.thumbnail.fields.file.url" width="320"/> -->
          <!-- <img :src="post.fields.thumbnail.fields.file.url" :alt="post.fields.heroImage.fields.description" width="320"/> -->
          <span class="title is-3 portfolio-title">{{ post.fields.title }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
  asyncData ({ env }) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_PERSON_ID
      }),
      client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
    ]).then(([entries, posts]) => {
      return {
        person: entries.items[0],
        posts: posts.items
      }
    }).catch(console.error);
  }
}
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  background-image: url(/img/Federation_Square_Melbourne_Victoria_Australia.jpg);
  background-size: cover;
  background-position: 50%;
  .hero-body {
    background-color: rgba(191, 7, 7, 0.5);
    .container {
      max-width: 900px;
      margin: 0 auto;
      img {
        width: 150px;
        height: 150px;
      }
      .profile-text {
        color: white;
        margin-top: 20px;
      }
    }
  }
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>