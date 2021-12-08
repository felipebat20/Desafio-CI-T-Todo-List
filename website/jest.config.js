module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],

  transform: {
    ".*\\.(vue)$": "vue-jest"
  },
}
