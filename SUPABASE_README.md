# Supabase Client Setup

This project uses Supabase as the backend service. The client is configured in `src/lib/supabase.js`.

## Environment Variables

Make sure your `.env` file contains:

```env
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Usage

### Basic Import

```javascript
import { supabase } from '../lib/supabase'
```

### Authentication Hook

```javascript
import { useAuth } from '../lib/auth'

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth()

  // Use the auth functions
}
```

### Database Operations

```javascript
import { db } from '../lib'

// Get all classes
const { data, error } = await db.getClasses()

// Get subjects for class 7
const { data, error } = await db.getSubjectsByClass(7)

// Get videos for a topic
const { data, error } = await db.getVideosByTopic('topic-id')
```

### Direct Supabase Client Usage

```javascript
import { supabase } from '../lib/supabase'

// Authentication
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
})

// Database queries
const { data, error } = await supabase
  .from('videos')
  .select('*')
  .eq('topic_id', 'some-topic-id')
```

## Available Database Functions

The `db` object provides pre-built functions for common operations:

- `getClasses()` - Get all classes
- `getSubjectsByClass(classId)` - Get subjects for a class
- `getMaterialsBySubject(subjectId)` - Get materials for a subject
- `getTopicsByMaterial(materialId)` - Get topics for a material
- `getVideosByTopic(topicId)` - Get videos for a topic
- `getVideoById(videoId)` - Get a specific video
- `searchVideos(query)` - Search videos by title
- `getUserProfile(userId)` - Get user profile
- `updateUserProfile(userId, updates)` - Update user profile

## File Structure

```
src/lib/
├── index.js          # Main exports
├── supabase.js       # Supabase client configuration
├── auth.js           # Authentication utilities
└── database.js       # Database operation functions
```