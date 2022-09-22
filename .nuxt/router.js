import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5c4e6f9d = () => interopDefault(import('../pages/blog/author/_author.vue' /* webpackChunkName: "pages/blog/author/_author" */))
const _69534832 = () => interopDefault(import('../pages/blog/tag/_tag.vue' /* webpackChunkName: "pages/blog/tag/_tag" */))
const _aa3bc73a = () => interopDefault(import('../pages/blog/_slug.vue' /* webpackChunkName: "pages/blog/_slug" */))
const _2ead2c3c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blog/author/:author?",
    component: _5c4e6f9d,
    name: "blog-author-author"
  }, {
    path: "/blog/tag/:tag?",
    component: _69534832,
    name: "blog-tag-tag"
  }, {
    path: "/blog/:slug?",
    component: _aa3bc73a,
    name: "blog-slug"
  }, {
    path: "/",
    component: _2ead2c3c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
