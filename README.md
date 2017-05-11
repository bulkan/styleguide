# Aconex Styleguide

The styleguide is installed as an `npm` dependency of your UI library.

## Starter template

Use the starter template to get an idea of the basic project setup for configuring and using the styleguide: <https://github.com/Aconex/styleguide-starter>.

## Working with your UI library

1. Install `styleguide` as a dependency in your project.

  ```
  npm install --save @aconex/styleguide
  ```

2. Configure the styleguide's options:

  - `uiLibrary`: path pointing to your UI library.
  - `demos`: a function for configuration of custom routes for the styleguide. It will be called with the styleguide's express instance, and `express` itself.

  At a minimum, the `/demo` route should be configured. For an example configuration, see the [`index.js` from `styleguide-starter`](https://github.com/Aconex/styleguide-starter/blob/master/index.js). In this example, a `/static` route is configured for serving static CSS and JS files and a `/demo` route renders a handlebars template for a given demo file.

  Then browse to <http://localhost:3080> in your browser to view the styleguide.

3. Create styleguide content.

  The documentation for a component is written in a `guide.md` file. There should be one guide file for each component.

  To generate the styleguide's navigation, it looks for a `navigation.guide.json` file. Take the following example of a folder and file structure.

  #### Folder structure

  ```
  src
  |
  +-- components
  |    |
  |    +-- calendar
  |    |    |-- calendar.guide.md
  |    |    +-- calendar.demo.html
  |    |
  |    +-- datepicker
  |         |-- datepicker.guide.md
  |         +-- datepicker.demo.html
  |
  +-- navigation.guide.json
  ```

  #### navigation.guide.json:

  ```
  {
    "sections": [
      {
        "title": "Components",
        "items": [
          { "title": "Calendar", "path": "components/calendar" },
          { "title": "Datepicker", "path": "components/datepicker" }
        ]
      }
    ]
  }
  ```

  In this example, the navigation menu will contain a Components section with 2 items in it: Calendar and Datepicker.

  The contents of `guide.md` file will be rendered when navigating to a particular component. Inside the `guide.md`, you can embed the contents of a `demo.html`. For example, in `calendar.guide.md` you can insert the calendar demo with `--$ calendar.demo $--`.

## Publishing

The styleguide exposes an executable `styleguide-publish` to simplify publishing to RHCloud. The simplest way to use this is to add a script to your UI library's `package.json`.

This example will prepare files from the `src` folder of your UI library for publishing to an RHCloud app named `sg3`. The files will be output to a `publish` folder, ready for pushing to RHCloud.

```
"scripts": {
  "publish": "styleguide-publish --app sg3 --ui-library ./src --output ./publish"
}
```

## Contributing

Please see `CONTRIBUTING.md`.
