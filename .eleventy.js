const { DateTime } = require("luxon")

module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true)

  eleventyConfig.addWatchTarget('src/css/tailwind.css')
  eleventyConfig.addWatchTarget('tailwindconfig.js')
  
  eleventyConfig.addPassthroughCopy({ 'assets': '.' })
  eleventyConfig.addPassthroughCopy('src/css/!(tailwind).css')
  // eleventyConfig.addPassthroughCopy('src/img')

  eleventyConfig.setTemplateFormats("html,liquid,md")

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  })

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  }  
}
