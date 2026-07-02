export default function (eleventyConfig) {
  // 把後台與圖片原樣複製到輸出（不經模板處理）
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
