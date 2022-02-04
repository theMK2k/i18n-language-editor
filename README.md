# I18N Language Editor

A universal editor for JSON based i18n language files. Everything is handled in the browser, no backend / database necessary. Developed for and tested with [vue-i18n](https://kazupon.github.io/vue-i18n/) language files.

**Note**: This is the source code project, if you want to directly run the webapp follow this link: <https://themk2k.github.io/i18n-language-editor/>

## Features

- load and edit .json based language files directly in the browser
- optionally load a second language file which provides reference text contents (e.g. you edit the spanish language while the english text is displayed for reference)
- verification of the language file by checking for
  - empty translations
  - missing variables (e.g. the reference text is `please wait {amount} seconds` and the variable `{amount}` is missing in the translation)
  - unknown variables (i.e. the translation introduces a variable, or it's just a typo)

## Project setup

```shell
npm install
```

If you're on Windows, install win-node-env:

```shell
npm install -g win-node-env
```

### Compiles and hot-reloads for development

```shell
npm start
```

### Compiles and minifies for production

```shell
npm run build
```

### Lints and fixes files

```shell
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
