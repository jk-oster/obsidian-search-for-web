// basic regex -- [whitespace](number)(rem)[whitespace or ;]
const REM_REGEX = /(\d*\.?\d+\s?)(rem)/ig
const PROCESSED = Symbol('processed')

module.exports = {
  plugins: [
    require('tailwindcss'),
    ...[{

      /**
       * Change all "rem" declarations for "em" declaration
       * to make styling independent of host page font-sizing
       * @see https://github.com/Skipper-Hospitality/postcss-rem-to-em-plugin
       */
      postcssPlugin: 'postcss-plugin-rem-to-em',

      /*
      Root (root, postcss) {
        // Transform CSS AST here
      }
      */

      Declaration (decl) {
        // The faster way to find Declaration node
        if (!decl[PROCESSED]) {
          decl.value = decl.value.replace(REM_REGEX, '$1em')
          decl[PROCESSED] = true
        }
      },

      AtRule: {
        media: atRule => {
          if (!atRule[PROCESSED]) {
            atRule.params = atRule.params.replace(REM_REGEX, '$1em')
            atRule[PROCESSED] = true;
          }
        }
      }
    }],
    require('autoprefixer'),
  ]
}
