---
id: basic_setup
title: Setup
---

:::tip
It's recommended to add kazaplan widget in a full dedicated web page

You can however add an header with some basic user information (profile,
cart...) and a "back" button to redirect user to your homepage or
somewhere else
:::

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
        plan: {
            id: [...],
            mode: "bathroom"
        },
    environment: "test",
},
onReady: function() { },
onKazaplanEvent: function(name, status, data) { },
```

:::info
To get your partnerKey please See [Environment Access section](/docs/env_access)
:::

![Kazaplan starterscreen in a full-integrated webpage (with header)](/img/starterscreen.png)

## Options

| Name                                | Type            | Description                                                                                                                       |
|-------------------------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| htmlNode \(Required\)               | string          | The HTMLElement \(or a query selector that matches the element\) where kazaplan will be loaded                                    |
| env \(Required\)                    | string          | preprod or prod, this define which API and Backoffice environment Kazaplan will communicate with                                  |
| config\.partnerKey \(Required\)     | string          | Your Kazaplan’s partner key                                                                                                       |
| config\.plan\.id                    | integer \| null | If editing a plan, its id, or null for starting a new plan                                                                        |
| config\.plan\.mode                  | string \| null  | Enter the plan in "room" mode \(e\.g\. mode: "bathroom"\)                                                                         |
| environment\(Required\)             | string          | test or production, this defines which catalogs Kazaplan will get from the Backoffice                                             |

For an advanced usage see [Advanced Setup Guide](/docs/advanced_setup)

# You're done :)
