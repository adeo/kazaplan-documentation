---
id: lifecycle_apis
title: Lifecycle APIs
---

## `onReady()`

Function called when kazaplan (and its plugins) is fully loaded.

## `onKazaplanEvent(name, status, data)`

Return validated and normalized options for the plugin. This method is called before the plugin is initialized.You must return options since the returned options will be passed to plugin during intialization.

### `name`

`validateOptions` is called with `options` passed to plugin for validation and normalization.

### `status`

`validateOptions` is called with `validate` function which takes a **[Joi](https://www.npmjs.com/package/@hapi/joi)** schema and options as argument, returns validated and normalized options. `validate` will automatically handle error and validation config.

### `data`


## Example

```js
onKazaplanEvent: async function (name, status, data) {
    if ((name === 'newPlan') || (name === 'login' && status === 'tokenReceived') ) {
        kazaplanInstance.apiUserSave();
    }

    // We must get a new user access token
    if(['newPlan', 'editPlan', 'duplicatePlan'].indexOf(name) !== -1 && status === 'unauthorized') {
        try {
            const {access_token} = await refreshToken() || {};
            if (access_token) {
                kazaplanInstance.apiSetToken(access_token);
                kazaplanInstance.apiUserForceSave();
            }
        } catch(e) { }
    }
}
```
