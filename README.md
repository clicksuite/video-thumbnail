## @clicksuite/video-thumbnail

This is a simple package to fetch a video thumbnail from a video URL. Supports [Patterns](https://github.com/radiovisual/get-video-id?tab=readme-ov-file#patterns) defined by [radiovisual/get-video-id](https://github.com/radiovisual/get-video-id).

Currently only works with YouTube and Vimeo.

As Vimeo needs an API request to fetch a URL, the function is asynchronous.

### Usage

Simply import and pass in a URL:

```
import { getVideoInfo } from '@clicksuite/video-thumbnail'

const info = await getVideoInfo(`https://www.youtube.com/watch?v=dQw4w9WgXcQ`);

console.log(info);

// Logs:
// {
//    "id": "dQw4w9WgXcQ",
//    "service": "youtube",
//    "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//    "sourceUrl": "https://youtube.com/watch?v=dQw4w9WgXcQ"
// }
```
