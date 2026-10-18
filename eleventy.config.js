import fs from "node:fs";
import markdownIt from "markdown-it";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const site = JSON.parse(fs.readFileSync("./src/_data/site.json", "utf8"));
const CARD_COLOURS = ["cream", "yellow", "magenta", "cyan", "blue"];

export default function (eleventyConfig) {
  // Markdown: allow HTML, and turn straight quotes and dashes into typographic ones.
  const md = markdownIt({ html: true, typographer: true });
  eleventyConfig.setLibrary("md", md);

  // Fonts, art, images and CSS are copied to the site unchanged.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  eleventyConfig.addGlobalData("year", new Date().getFullYear());

  eleventyConfig.addFilter("displayDate", (date) =>
    new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }));
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingMinutes", (html) => {
    const words = String(html).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  // {% card "Try this", "cream" %} ... Markdown ... {% endcard %}
  eleventyConfig.addPairedShortcode("card", (content, title = "", colour = "cream") => {
    const c = CARD_COLOURS.includes(colour) ? colour : "cream";
    const heading = title ? `<p class="card__title">${md.renderInline(title)}</p>` : "";
    return `<aside class="card card--${c}">${heading}${md.render(content.trim())}</aside>`;
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: site.language,
      title: site.title,
      subtitle: site.description,
      base: site.url,
      author: { name: site.author },
    },
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
  };
}
