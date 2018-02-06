# color-picker

Simple React component color-picker

## Demo
The demo based on storybook is [here][1].


## Todo
- [ ] hue bar to set hue value
- [ ] preview of current color
- [ ] show mouse point on BoardForBrightnessAndSaturation
- [ ] export common color-picker



## How to run

```shell
# install dependecies
$ yarn install

# build the following files:
#   es/         --> the typings for es module
#   lib/        --> the typings for umd module
#   dist/
#       react-component-start-kit.js
#       react-component-start-kit.js.map
#       react-component-start-kit.min.js
#       react-component-start-kit.min.js.map
#       react-component-start-kit.css
#       react-component-start-kit.css.map
# only produce a total css file because this is a single component,     
# it's unnecessary to load on demand. 
$ yarn build

# run storybook server
$ yarn storybook

# run test
# We only test files ended with .ts or .tsx
$ yarn test

# publish package to npm
# we will run `yarn lint:ts` `yarn build` for prepublish
$ yarn publish
```

  [1]: https://ziheliu.github.io/color-picker/storybook-static/index.html
