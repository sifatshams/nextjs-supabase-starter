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
  const { data: posts, error } = await supabase
    .from('Posts')
    .select()
    .eq('published', true);

  console.log(posts);

  return (
    <ul>
      {posts?.map((post: any) => (
        <div key={post.id}>
          <li className="mb-1">{post.title}</li>
          <li className="mb-5">{post.content}</li>
        </div>
      ))}
    </ul>
  );
}
