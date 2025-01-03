import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import images from '@/utils/images'

function MyComponent() {
  return (
    <div>
      <Navigation />
      <img src={images.profileImage} alt="My Image" />
      <Button>Click Me</Button>
    </div>
  )
}

export default MyComponent;

