# Project images
Each project has several images shown in a carousel (hover = auto-slide; click, arrows, dots, swipe and arrow keys also work).

By default `src/data/index.ts` uses `imgs("<slug>")`, which expects `/projects/<slug>-1`, `-2`, `-3` (`.svg`). To use your own files, list them explicitly:

```ts
images: ["/projects/jani-foods-1.png", "/projects/jani-foods-2.png", "/projects/jani-foods-3.jpg", "/projects/jani-foods-4.jpg"],
```
Any number of images works (one image hides the controls). Recommended size: 1600x1000 (16:10). Delete the placeholder SVGs you no longer need.
