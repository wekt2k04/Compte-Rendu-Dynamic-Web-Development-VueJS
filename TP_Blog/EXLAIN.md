````markdown
# Explanation of `src/` (Feynman-style, expanded)

This is a detailed, step-by-step explanation of how the small Vue app works. I explain how data travels: where it starts, how it moves through composables, which components receive it as `props`, which components `emit` events, and how views render things.

Quick data model (the shape of a post):
- A post is a plain object: `{ id: string, title: string, body: string, tags: string[] }`.

Top-level flow summary (one-sentence):
- The composables read/write posts from `localStorage`. Views call composable functions to create/read/update/delete posts. Components render lists or single posts and communicate via props and emitted events.

Composables (where data is stored and manipulated)
- `src/composables/getPosts.js`:
  - Exposes `getPosts()` which returns an array of post objects (reads `localStorage`). It seeds initial posts if none exist.
  - Exposes `savePosts(posts)` to persist the full list back to `localStorage`.
  - Important: these are plain functions (not reactive refs). When you call `getPosts()` you get a fresh snapshot of the array.

- `src/composables/getPost.js` (builds on `getPosts`):
  - `getPostById(id)` — calls `getPosts()` and finds the item with matching `id`.
  - `createPost({title, body, tags})` — builds a new post (id via Date.now), prepends it to the posts array and calls `savePosts(posts)`.
  - `updatePost(id, payload)` — loads, mutates the matching post, saves.
  - `deletePost(id)` — filters it out and saves.
  - Data flow example: when `createPost()` runs, `localStorage` is updated. Any component that later calls `getPosts()` will see the new post.

How views and components use composables and each other

- `src/views/CreatePostView.vue` (user action -> create post):
  - User types title/body/tags and submits the form.
  - The view parses `tagsInput` into `tags: string[]` then calls `createPost({title, body, tags})` from the composable.
  - After `createPost()` finishes, the view does `this.$router.push('/')` to go back to the home page.
  - Note: `createPost()` updates `localStorage`. The Home page (and its `PostList`) will read posts when they mount, so the newly created post is visible after navigation.

- `src/components/PostList.vue` (list rendering, parent for `SinglePost`):
  - On `mounted()` it calls `getPosts()` and assigns the returned array to `this.posts` (component-local reactive `data`).
  - Rendering: the template iterates `v-for="p in posts"` and for each it renders `<SinglePost :post="p" />`.
  - Prop flow: `post` is passed as a prop from `PostList` (parent) to `SinglePost` (child). This means `SinglePost` receives a plain JS object reference. The prop's value originated from the composable snapshot.
  - If you want `PostList` to reactively update when posts change elsewhere, you have two options:
    1) Use a reactive store (Pinia) and read from the store in `PostList` so updates are reactive.
    2) Make `PostList` accept a `key` or `refresh` prop and call `getPosts()` again when the prop changes (or when an event is received).

- `src/components/SinglePost.vue` (child rendering a single article preview):
  - Props: `post` (required object).
  - Computed: `snippet` — a computed property that returns `post.body.substring(0,80) + '...'` when appropriate. Computed properties run when their dependencies change (here: `post.body`).
  - Template: shows `post.title`, the `snippet`, tags, and a `router-link` to `/posts/${post.id}`.
  - No emits from `SinglePost` in the current design — it's purely presentational.

- `src/components/TagCloud.vue` (reads tags, emits selection):
  - Behavior: on `mounted()` it calls `getPosts()` and builds a deduplicated list of tags.
  - Rendering: outputs a button for each tag.
  - Emits: when a tag button is clicked the component does `$emit('select', tag)`.
  - This is the classic child-to-parent pattern: TagCloud emits an event, a parent (Home) listens and updates its local state.

- `src/views/Home.vue` (wires `PostList` and `TagCloud` together):
  - Template layout: left column renders `<PostList />`; right column renders `<TagCloud @select="onTagSelect" />`.
  - When `TagCloud` emits `select` with a tag string, Home's `onTagSelect(tag)` sets `this.selected = tag`.
  - Note: `Home` currently stores `selected` but does not pass it down to `PostList`. To filter the list by that tag you can modify `PostList` to accept a `filterTag` prop and apply `this.posts = getPosts().filter(p => !filterTag || p.tags.includes(filterTag))` inside `load()` and in a `watch: { filterTag() { this.load() } }`.

- `src/views/PostDetailView.vue` (detail + delete):
  - Uses `this.$route.params.id` to obtain the `id` (the route is `/posts/:id`).
  - On `mounted()` the view calls `getPostById(id)` to load the post and assigns it to `this.post`.
  - Template renders `this.post.title`, `this.post.tags`, `this.post.body`.
  - Delete button calls `deletePost(id)` from the composable and then navigates home with `this.$router.push('/')`.
  - A small additional detail: the view also watches `$route.params.id` so if the route changes without leaving the component, it reloads the proper post.

Lifecycle and reactivity notes (important to understand flows):
 - Composables here are non-reactive functions. `getPosts()` returns a snapshot. Components get reactivity via their `data()` objects and `computed` properties.
 - Example timeline when creating a post:
   1) User submits Create form → `createPost()` is called.
   2) `createPost()` updates `localStorage` immediately.
   3) The app navigates to `/` (Home) — this causes `Home` and the `PostList` child to mount (or re-render), and `PostList.mounted()` calls `getPosts()` again and sees the new post.

How props and emits are used (concrete summary):
 - Parent → Child: `PostList` passes `post` prop to each `SinglePost`.
 - Child → Parent: `TagCloud` emits `select` and `Home` receives it with `@select="onTagSelect"`.
 - Router-driven props: `PostDetailView` reads route param `id` from `$route.params` rather than using props; the router is configured with `props: true` for posts but the view uses `$route.params.id` directly — both approaches are valid.

Small suggestions to make the data flow more reactive or explicit:
 - Option A (reactive central state): use Pinia to store posts. Components subscribe to the store so updates are instant without remounting.
 - Option B (prop-driven refresh): make `PostList` accept `filterTag` and/or a `refreshKey` prop and `watch` those props to reload via `getPosts()`.

Real example: implement tag-filtering with minimal edits
1) Change `PostList` to accept `props: ['filterTag']` and modify `load()` to filter posts by `filterTag`.
2) In `Home.vue` pass the selected tag: `<PostList :filterTag="selected" />`.

Closing / How to proceed
 - I expanded the original short explanations into detailed, component-level flows, showing where props are set, where events are emitted, how composables are used, and what lifecycle hooks run where.
 - If you want, I can now implement one of the suggested improvements (for example: make tag selection actually filter the list, or add an EditPost view) — say which and I'll implement it.

````
