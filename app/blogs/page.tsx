import { createClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

export default function BlogPage() {
  return (
    <div>
      <h2>Blogs</h2>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostsList />
      </Suspense>
    </div>
  );
}

async function PostsList() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from('Posts').select();

  console.log(posts);

  return (
    <ul>
      {posts?.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
