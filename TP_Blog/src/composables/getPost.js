import { getPosts, savePosts } from './getPosts'

export function getPostById(id){
  const posts = getPosts()
  return posts.find(p => p.id === String(id)) || null
}

export function createPost({ title, body, tags }){
  const posts = getPosts()
  const id = String(Date.now())
  const post = { id, title, body, tags }
  posts.unshift(post)
  savePosts(posts)
  return post
}

export function updatePost(id, payload){
  const posts = getPosts()
  const idx = posts.findIndex(p => p.id === String(id))
  if(idx === -1) return null
  posts[idx] = { ...posts[idx], ...payload }
  savePosts(posts)
  return posts[idx]
}

export function deletePost(id){
  let posts = getPosts()
  posts = posts.filter(p => p.id !== String(id))
  savePosts(posts)
}
