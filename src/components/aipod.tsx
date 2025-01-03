import { BlogPost } from '@/types/blog-post'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import images from '@/utils/images'

const author = {
  name: "John Doe",
  avatar: images.authorAvatar,
  // ... other author details
}

const post: BlogPost = {
  title: "My First Blog Post",
  content: "This is the content of my first blog post.",
  author: author,
  // ... other post details
}

function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          <h1>{post.title}</h1>
          <p>By {post.author.name}</p>
          <img src={post.author.avatar} alt={post.author.name} />
          <p>{post.content}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MyComponent;

