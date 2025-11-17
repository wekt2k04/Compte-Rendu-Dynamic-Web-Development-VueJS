// Simple posts storage using localStorage as persistence.
const STORAGE_KEY = 'vb_posts_v1'

function seedIfEmpty(){
  if(!localStorage.getItem(STORAGE_KEY)){
    const initial = [
      { id: '1', title: 'Bienvenue', body: 'Ceci est un premier article.', tags: ['intro','welcome'] },
      { id: '2', title: 'Deuxième post', body: 'Un autre article pour tester.', tags: ['test'] }
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
  }
}

export function getPosts(){
  seedIfEmpty()
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }catch(e){
    return []
  }
}

export function savePosts(posts){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}
