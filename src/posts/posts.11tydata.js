// Settings shared by every post in this folder.
// Add `draft: true` to a post's front matter to keep it off the live site.
export default {
  layout: "layouts/post.njk",
  tags: ["posts"],
  permalink: "/posts/{{ page.fileSlug }}/",
  eleventyComputed: {
    permalink: (data) => (data.draft ? false : data.permalink),
    eleventyExcludeFromCollections: (data) => (data.draft ? true : data.eleventyExcludeFromCollections),
  },
};
