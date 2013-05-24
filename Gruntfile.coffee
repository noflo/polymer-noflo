module.exports = ->
  # Project configuration
  @initConfig
    pkg: @file.readJSON 'package.json'

    # Browser version building
    component:
      install:
        options:
          action: 'install'
    component_build:
      'polymer-noflo':
        output: './browser/'
        config: './component.json'
        scripts: true
        styles: false
        plugins: ['coffee']
        configure: (builder) ->
          # Enable Component plugins
          json = require 'component-json'
          builder.use json()

    # Fix broken Component aliases, as mentioned in
    # https://github.com/anthonyshort/component-coffee/issues/3
    combine:
      browser:
        input: 'browser/polymer-noflo.js'
        output: 'browser/polymer-noflo.js'
        tokens: [
          token: '.coffee'
          string: '.js'
        ]

    # JavaScript minification for the browser
    uglify:
      options:
        report: 'min'
      noflo:
        files:
          './browser/polymer-noflo.min.js': ['./browser/polymer-noflo.js']

  # Grunt plugins used for building
  @loadNpmTasks 'grunt-component'
  @loadNpmTasks 'grunt-component-build'
  @loadNpmTasks 'grunt-combine'
  @loadNpmTasks 'grunt-contrib-uglify'

  # Our local tasks
  @registerTask 'build', 'Build NoFlo for the chosen target platform', (target = 'all') =>
    @task.run 'component'
    @task.run 'component_build'
    @task.run 'combine'
    @task.run 'uglify'

  @registerTask 'default', ['build']
