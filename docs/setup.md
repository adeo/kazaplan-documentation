---
id: setup
title: Setup
---

:::tip
It's recommended to add kazaplan widget in a full dedicated web page

You can however add an header with some basic user information (profile,
cart...) and a "back" button to redirect user to your homepage or
somewhere else
:::

## Environment Access

|               | Pre-production                           | production                           |
|---------------|------------------------------------------|--------------------------------------|
| Api URL       | <https://preprodapi.kazaplan.com>        | <https://api.kazaplan.com>           |
| OAuth URL     | <https://preprod.kazaplan.com/authorize> | <https://www.kazaplan.com/authorize> |
| Client ID     | \*\*\*\*\*                               | \*\*\*\*\*                           |
| Client Secret | \*\*\*\*\*                               | \*\*\*\*\*                           |
| Partner Key   | \*\*\*\*\*                               | \*\*\*\*\*                           |

Please [Contact us](mailto:fabien.ryckoort@adeo.com) to get your
credentials

## Widget Integration

Add the following `<script>` in the page where you want to integrate Kazaplan

```html
<!-- Preproduction -->
<script src="https://preprodintegration.kazaplan.com/js/integration.js"></script>

<!-- Production -->
<script src="https://integration.kazaplan.com/js/integration.js"></script>
```

After the integration script is added in your page, the Kazaplan
application needs to be configured using the following `<script>`
(parameters description below)

```javascript
var app = Kazaplan({
    htmlNode: "#integration-div",
    env: "prod",
    config: {
        partnerKey: "xxxxxxxxxxxxx",
        customerShopId: "",
        token: "...",
        plan: {
            id: [...],
            mode: "bathroom"
        },
    environment: "test",
    authentication: {
        url: "my_website_authentication_url",
        iframe: {
            title: 'Log in/Sign in',
        }
    }
},
onReady: function() { },
onKazaplanEvent: function(name, status, data) { },
```

![Kazaplan starterscreen in a full-integrated webpage (with header)](/img/starterscreen.png)

## Options

| Name                                | Type            | Description                                                                                                                       |
|-------------------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| htmlNode \(Required\)               | string          | The HTMLElement \(or a query selector that matches the element\) where kazaplan will be loaded                                    |
| env \(Required\)                    | string          | preprod or prod, this define which API and Backoffice environment Kazaplan will communicate with                                  |
| config\.partnerKey \(Required\)     | string          | Your Kazaplan’s partner key                                                                                                       |
| config\.token                       | string \| null  | The user’s API token or null                                                                                                      |
| config\.customerShopId \(Required\) | integer         | The customer store ID                                                                                                             |
| config\.plan\.id                    | integer \| null | If editing a plan, its id, or null for starting a new plan                                                                        |
| config\.plan\.mode                  | string \| null  | Enter the plan in "room" mode \(e\.g\. mode: "bathroom"\)                                                                         |
| environment\(Required\)             | string          | test or production, this defines which catalogs Kazaplan will get from the Backoffice                                             |
| uthentication\.url \(Required\)    | string          | Your authentication URL, if defined, it will be loaded in a full page modal when no token was provided when trying to save a plan |
| authentication\.iframe\.title       | string          | The title of the authentication modal                                                                                             |
| onReady                             | function        | Called when Kazaplan was successfully loaded                                                                                      |
| onKazaplanEvent                     | function        | Called on various Kazaplan events, see dedicated documentation \(events describe below\)                                          |
| test                                |                 | Called on various Kazaplan events, see dedicated documentation \(events describe below\)                                          |

## Events

If you want to be notified by kazaplan on user actions, you need to add
function in the kazaplan configuration object with the key
`onKazaplanEvent`. This function will called every time one of these
events listed below occurs.

### Login

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // login

    // Login window is opening
    console.log(status) // loginOpening
    console.log(data) // {}

    // A token was provided to the plan
    console.log(status) // tokenReceived
    console.log(data) // {}

    // Login window was closed
    console.log(status) // => loginClosed
    console.log(data) // = {}
},
```

### newPlan

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // newPlan

    // Starter screen is displayed
    console.log(status) // starterScreen
    console.log(data) // {}

    // User starts a new plan
    console.log(status) // start
    console.log(data) // {}

    // User clicks on the save button
    console.log(status) // => saveClick
    console.log(data) // = {}

    // User clicks on the cancel button
    console.log(status) // => cancelClick
    console.log(data) // = {}

    // Saving starts
    console.log(status) // => saveStart
    console.log(data) // = {}

    // saving is done
    console.log(status) // => saveSuccess
    console.log(data) // = {}

    // An error occurred while saving
    console.log(status) // => saveError
    console.log(data) // = {}

    // User's token is expired of invalid
    console.log(status) // => unauthorized
    console.log(data) // = {}
},
```

### editPlan

These events occurs when an existing plan is open and save again.

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // editPlan

    // Plan is loading
    console.log(status) // loading
    console.log(data) // {}

    // Plan is loaded
    console.log(status) // loaded
    console.log(data) // {}

    // Plan loading failed
    console.log(status) // => loadingFailed
    console.log(data) // = {}

    // Plan contain errors
    console.log(status) // => planError
    console.log(data) // = {}

    // User clicks on the cancel button
    console.log(status) // => saveCancel
    console.log(data) // = {}

    // Saving starts
    console.log(status) // => saveStart
    console.log(data) // = {}

    // Saving is done
    console.log(status) // => saveSuccess
    console.log(data) // = {}

    // An error occurred while saving
    console.log(status) // => saveError
    console.log(data) // = {}

    // Users' token is expired or invalid
    console.log(status) // => unauthorized
    console.log(data) // = {}

    // User clicks on new plan button
    console.log(status) // => newPlanClick
    console.log(data) // = {}

    // User cancel new plan action
    console.log(status) // => newCancel
    console.log(data) // = {}

    // User clicks on the save before new button
    console.log(status) // => newPlanSave
    console.log(data) // = {}

    // User clicks on new plan button but current plan is not saved
    console.log(status) // => newPlanNoSave
    console.log(data) // = {}
},
```

### duplicatePlan

These events occurs when an existing plan is trying to be duplicate.

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // duplicatePlan

    // User clicks on duplicate button
    console.log(status) // duplicatePlanClick
    console.log(data) // {}

    // User clicks on the cancel button
    console.log(status) // saveCancel
    console.log(data) // {}

    // Plan duplicate starts
    console.log(status) // => saveStart
    console.log(data) // = {}

    // Plan duplication is done
    console.log(status) // => saveSuccess
    console.log(data) // = {}

    // An error occurred during plan duplication
    console.log(status) // => saveError
    console.log(data) // = {}

    // User's token is expired or invalid
    console.log(status) // => unauthorized
    console.log(data) // = {}

},
```

### quitPlan

These events occurs when user quit current opening plan

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // quitPlan

    // User clicks on a button redirecting on an external page
    console.log(status) // quitClick
    console.log(data) // {}

    // User cancel redirection
    console.log(status) // quitCancel
    console.log(data) // {}

    // Saving before leaving starts
    console.log(status) // => quitSaveStart
    console.log(data) // = {}

    // Saving before leaving is done
    console.log(status) // => saveSuccess
    console.log(data) // = {}

    // An error occurred during saving before leaving
    console.log(status) // => quitSaveError
    console.log(data) // = {}

    // User quit without saving
    console.log(status) // => quitNoSave
    console.log(data) // = {}

    // User's token is expired or invalid
    console.log(status) // => unauthorized
    console.log(data) // = {}

},
```

### screenshot

These events occurs when user quit current opening plan

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // screenshot

    // A screenshot was successfully taken
    console.log(status) // success
    console.log(data) // {}

},
```

### migratePlan

These events occurs when user quit current opening plan

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // migratePlan

    // Migration started
    console.log(status) // start
    console.log(data) // {}

    // Plan was migrated
    console.log(status) // success
    console.log(data) // {}

    // Migration failed
    console.log(status) // error
    console.log(data) // {}

},
```

### AddToCart

These events occurs when user quit current opening plan

```javascript
onKazaplanEvent: function(name, status, data) {

    console.log(name) // AddToCart

    // User pushed items to cart
    console.log(status) // null
    console.log(data) // {}

},
```
