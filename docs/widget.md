---
id: widget
title: Widget integration
---

:::tip
It's recommended to add kazaplan widget in a full dedicated web page

You can however add an header with some basic user information (profile,
cart...) and a "back" button to redirect user to your homepage or
somewhere else
:::

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

Options
-------

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
| authentication\.url \(Required\)    | string          | Your authentication URL, if defined, it will be loaded in a full page modal when no token was provided when trying to save a plan |
| authentication\.iframe\.title       | string          | The title of the authentication modal                                                                                             |
| onReady                             | function        | Called when Kazaplan was successfully loaded                                                                                      |
| onKazaplanEvent                     | function        | Called on various Kazaplan events, see dedicated documentation \(events describe below\)                                          |
| test                                |                 | Called on various Kazaplan events, see dedicated documentation \(events describe below\)                                          |

Events
------

If you want to be notified by kazaplan on user actions, you need to add
function in the kazaplan configuration object with the key
`onKazaplanEvent`. This function will called every time one of these
events listed below occurs.

| Name | Status | Data | Description |
|-|-|-|-|
| **login** | loginOpening | {} | Login window is opening |
|  | tokenReceived | {} | A token was provided to the plan |
|  | loginClosed | {} | Login window was closed |
| **newPlan** | starterScreen | {} | Starter screen is displayed |
|  | start | {} | User starts a new plan |
|  | saveClick | {} | User clicks on the save button |
|  | cancelClick | {} | User clicks on the cancel button |
|  | saveStart | {} | Saving starts |
|  | saveSuccess | {} | saving is done |
|  | saveError | {} | An error occurred while saving |
|  | unauthorized | {} | User's token is expired of invalid |
| **editPlan** | loading | {} | Plan is loading |
|  | loaded | {} | Plan is loaded |
|  | loadingFailed | {} | Plan loading failed |
|  | planError | {} | Plan contain errors |
|  | saveCancel | {} | User clicks on the cancel button |
|  | saveStart | {} | Saving starts |
|  | saveSuccess | {} | Saving is done |
|  | saveError | {} | An error occurred while saving |
|  | unauthorized | {} | Users' token is expired or invalid |
|  | newPlanClick | {} | user clicks on new plan button |
|  | newCancel | {} | User cancel new plan action |
|  | newPlanSave | {} | User clicks on the save before new button |
|  | newPlanNoSave | {} | user clicks on new plan button but current plan is not saved |
| **duplicatePlan** | duplicatePlanClick | {} | user clicks on duplicate button |
|  | saveCancel | {} | User clicks on the cancel button |
|  | saveStart | {} | Plan duplicate starts |
|  | saveSuccess | {} | Plan duplication is done |
|  | saveError | {} | An error occurred during plan duplication |
|  | unauthorized | {} | User's token is expired or invalid |
| **quitPlan** | quitClick | {} | User clicks on a button redirecting on an external page |
|  | quitCancel | {} | User cancel redirection |
|  | quitSaveStart | {} | Saving before leaving starts |
|  | saveSuccess | {} | Saving before leaving is done |
|  | quitSaveError | {} | An error occurred during saving before leaving |
|  | quitNoSave | {} | User quit without saving |
|  | unauthorized | {} | User's token is expired or invalid |
| **screenshot** | success | {} | A screenshot was successfully taken |
| **migratePlan** | start | {} | Migration started |
|  | success | {} | Plan was migrated |
|  | error | {} | Migration failed |
| **AddToCart** | null | {} | User pushed items to cart |
