const { DateTime } = require("luxon")
const markdownIt = require("markdown-it")
const markdownItFootnote = require("markdown-it-footnote")
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = function(config) {
  config.setDataDeepMerge(true)

  config.addWatchTarget('src/css/tailwind.css')
  config.addWatchTarget('tailwindconfig.js')
  
  config.addPassthroughCopy({ 'assets': '.' })
  config.addPassthroughCopy('src/css/!(tailwind).css')
  // eleventyConfig.addPassthroughCopy('src/img')

  config.setTemplateFormats("html,liquid,md")

  config.setLiquidOptions({
    dynamicPartials: false,
  })

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  })

  const markdownItOptions = {
    html: true, // Enable HTML tags in source
    breaks: true,  // Convert '\n' in paragraphs into <br>
    linkify: true
  }

  config.setLibrary("md", markdownIt(markdownItOptions).use(markdownItFootnote))

  config.addPlugin(syntaxHighlight)

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  }  
}
