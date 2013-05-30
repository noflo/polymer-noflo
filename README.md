NoFlo Web Components
====================

This repository provides [Polymer Web Components](http://www.polymer-project.org/) for running [NoFlo](http://noflojs.org) flow-based programs on HTML pages.

## Usage

To use the Polymer NoFlo components, you need to include Polymer and NoFlo on your page. The easiest way to do this is to utilize the [combined build](http://bergie.iki.fi/polymer-noflo/browser/polymer-noflo.js):


    <script src="./browser/polymer-noflo.js"></script>

Once the script is loaded, you can enable Web Components with:

    <script>
      require('components-polymer');
    </script>

Now the NoFlo components (and other web components) can be used anywhere on the page!

### Loading external graphs

The *noflo-graph* tag supports loading and launching NoFlo graphs loaded from external JSON definition files.

Make the component available on your pages with:

    <link rel="import" href="noflo-graph.html">

Then you can use it as a HTML tag:

    <noflo-graph src="touch-demo.json" root="/bergie-noflo"></noflo-graph>

Attributes:

* *src* provides the URL from where the graph JSON file will be loaded via AJAX
* *root* provides the root library from which NoFlo will start loading components

Additionally, inports of the graph will be available as attributes. For example, to send an IIP to the *IN* port of the *ReadFile* node, set the value as attribute *readfile-in*.

### Running NoFlo graphs inline

The *noflo-fbp* tag support running NoFlo graphs from inline [FBP language](https://github.com/noflo/fbp) syntax.

Make the component available on your pages with:

    <link rel="import" href="noflo-fbp.html">

The you can use it as a HTML tag:

    <noflo-fbp root="/bergie-noflo">
      'Hello, world!' -> IN Display(Output)
    </noflo>

Attributes:

* *root* provides the root library from which NoFlo will start loading components

## Development

You need a checkout of this repository, and the [Grunt](http://gruntjs.com) command-line runner. Grab it with:

    $ npm install -g grunt-cli

You also need the NPM build dependencies of this library. Get them with:

    $ npm install

Then you're ready build *polymer-noflo* with:

    $ grunt build

The resulting JavaScript library will be placed in the *browser* directory under the repository.
