This is an alteration of the default [tcomb-form](https://github.com/gcanti/tcomb-form) templates so that you can use tcomb forms with Bulma. 

Currently this isn't published to npm, you'll to install from Github.

# Manual setup

```sh
npm install tcomb-form
# Install this custom set of templates
npm install git+https://git@github.com/dom-devel/tcomb-form-templates-bulma.git
```

```js
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
// Import new set of templates and use them.
import templates from 'tcomb-form-templates-bulma'

t.form.Form.i18n = en
t.form.Form.templates = templates
```
