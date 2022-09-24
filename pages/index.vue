<template>
  <div class="xs:m-8 md:my-12 md:mx-48">
    <TheHeader />
    <div class="border-b border-gray-300">
      <ul class="flex flex-wrap mb-4 md:text-center sm:text-left">
        <li
          v-for="tag of tags"
          :key="tag.slug"
          class="xs:w-full md:w-1/3 lg:flex-1 px-2 md:text-center sm:text-left"
        >
          <NuxtLink :to="`/blog/tag/${tag.slug}`" class="">
            <p
              class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss hover:opacity-75"
            >
              {{ tag.name }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <h1 class="font-bold text-4xl my-10">Blog Posts</h1>
    <ul class="flex flex-wrap">
      <li
        v-for="article of articles"
        :key="article.slug"
        class="w-full md:w-1/2 px-2 xs:mb-6 md:mb-24 article-card"
      >
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: article.slug } }"
          class="flex transition-shadow duration-150 ease-in-out shadow-md hover:opacity-75 xxlmax:flex-col"
        >
          <img
            v-if="article.img"
            class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
            :src="article.img"
          />

          <div
            class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
          >
            <h2 class="font-bold">{{ article.title }}</h2>
            <p>by {{ article.author.name }}</p>
            <p class="font-bold text-gray-600 text-sm">
              {{ article.description }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <footer class="flex justify-center border-gray-300 border-t">
      <p class="mt-4 text-gray-500">Created by XiangYu @2022</p>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags')
      .only(['name', 'description', 'img', 'imgcontent', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tags
    }
  }
}
</script>

<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fafafa96;
  border-radius: 10px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
