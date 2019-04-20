Default templates used by [tcomb-form](https://github.com/gcanti/tcomb-form), so you are not supposed to do a manual setup.

# Manual setup

```sh
npm install tcomb-form
# Install this custom set of templates
npm install git+https://git@github.com/visionmedia/express.git
```

```js
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
// Import new set of templates and use them.
import templates from 'tcomb-form-templates-bulma'

t.form.Form.i18n = en
t.form.Form.templates = templates
```
