---
id: account_linking
title: Account Linking
---

### Introduction

In this part we will show how to link your existing / new users with
their Kazaplan account throught differents possible scenarios.

### Technical Prerequisite

You need to store kazaplan ***access_token***, ***refresh_token*** and ***kazaplan_id*** in your user database.

<!-- ```pgsql
CREATE TABLE user (
    id integer PRIMARY KEY,
    email character varying(254) NOT NULL,
    username character varying(25) DEFAULT NULL::character varying,
    password character varying(64) NOT NULL,
    kzp_user_id integer,
    kzp_access_token text,
    kzp_refresh_token text
);
``` -->

In this guide we assume that you'll use an unique kazaplan entry point as `authentication.url` (e.g: ***/kazaplan/enroll***)

More details in [widget options](/docs/advanced_setup#options).

## How to process

### Enrollment

:::tip
If ***config.token*** is falsy (undefined, null or empty string) once 
user save plan, the ***authentication.url*** (your authentication page) will be shown inside iFrame.

This happen when user is not registered yet or not logged in
:::

Create a controller route for `/kazaplan/enroll`

In this route we'll handle different scenarios:

- User not registered both on your website and Kazaplan
- User not registered on your website but already have a Kazaplan account
- User not logged in and his account is not linked yet
- User logged in and his account is not linked yet

:::info
A user account is considered linked when a token and Kazaplan id have been assigned to it.
:::

*.e.g: with symfony*

```php
/**
* @Route("/kazaplan/enroll", name="kazaplan_enroll")
*/
public function enroll(Request $request)
{
    // User is not connected
    if (!$this->authChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
        // Redirect user to the login page with kazaplan specific look
        return new RedirectResponse($this->generateUrl('app_login', [
            "access_method" => "kazaplan"
        ]));
    }

    // Get current connected user
    $user = $this->getUser();

    // Check if user already have Kazaplan access / refresh token (stored in database)
    if ($user->getKzpAccessToken() && $user->getKzpRefreshToken()) {
        return $this->render('kazaplan/enroll.html.twig', [
            'access_token' => $user->getKzpAccessToken(),
            'refresh_token' => $user->getKzpRefreshToken()
    ]);

    $kazaplanHost = $this->getParameter('kazaplanHost');

    // Generate absolute callback URL (/kazaplan/oauth/callback)
    $redirectUri = $this->generateUrl(
        'kazaplan_oauth_callback',
        [],
        UrlGeneratorInterface::ABSOLUTE_URL
    );

    $qs = http_build_query(array(
        'client_id' => $this->getParameter('kazaplanClientId'),
        'client_secret' => $this->getParameter('kazaplanClientSecret'),
        'scope' => 'partner:users user partner:wanaplans partner user:wanaplans',
        'redirect_uri' => $redirectUri,
        'response_type' => 'code',
        'email' => $user->getEmail()
    ));

    // Enter to the Kazaplan OAuth process
    return new RedirectResponse("{$reachFiveHost}/authorize?{$qs}");
}
```

First we check if user is connected, if not, redirect user to your authentication URL with an extra parameter `access_method=kazaplan`, this parameter will be allow you to hide header / footer etc...

Then, if user is connected, and his account is already linked (`$user->getKzpAccessToken() && $user->getKzpRefreshToken()`) simply render this HTML:

```html
<script>
    window.onload = function () {
        window.parent.postMessage({ name: 'newToken', token: '{{ access_token }}' }, '*');
        window.parent.postMessage({ name: 'closeLoginIframe' }, '*');
    }
</script>
```

:::info
This will set the token to Kazaplan instance and close the authentication modal inside iFrame.
:::

Else, redirect user to Kazaplan autorization server URL ([Environment Access](/docs/env_access)) (by passing connected user email in query parameters) to link his account.

*Example*

```
https://www.kazaplan.com/oauth/authorize?
    client_id=[CLIENT_ID]&
    client_secret=[CLIENT_SECRET]&
    scope=partner:users user partner:wanaplans partner user:wanaplans
    redirect_uri=https://www.mywebsite.com/kazaplan/callback
    response_type=code&
    email=user@email.com&
    state=1234
```

`state` is ***optional*** all other parameters are mandatory

*User will be redirect to this screen*
![Kazaplan OAuth Register](/img/kazaplan_oauth_register.png)

*User must accept your application to access its data*
![Kazaplan OAuth Register](/img/kazaplan_oauth_authorization.png)

With one click user create a Kazaplan account and authorize you to access its data.

:::tip
To handle the case of user is not logged in or registred, you need to rediect user to ***/kazaplan/enroll*** once registered / logged in is done.
:::

### OAuth Callback (redirect_uri)

Once user authorize your application, he will be redirect to your `redirect_uri` define as auery parameter in authorize URL.

Here you have to :
- Get user tokens pair by calling API
- Get user info with access token
- Persist tokens and kazaplan user id in your database
- Redirect user to `/kazalan/enroll`

```php
/**
* @Route("/kazaplan/oauth/callback", name="kazaplan_oauth_callback")
*/
public function oauthCallback(Request $request)
{
    // Get Kazaplan tokens pair
    list($accessToken, $refreshToken) = $this->kazaplanManager->getTokensFromAuthorizationCode($request->query->get('code'));

    $kazaplanUserInfo = $this->kazaplanManager->getUser($accessToken);

    $entityManager = $this->getDoctrine()->getManager();

    // Persist tokens pair to the database
    /** @var User $user */
    $user = $this->getUser();
    $user
        ->setKzpUserId($kazaplanUserInfo->{'id'})
        ->setKzpAccessToken($accessToken)
        ->setKzpRefreshToken($refreshToken);

    $entityManager->flush();

    return new RedirectResponse($this->generateUrl('kazaplan_enroll'));
}
```

`$this->kazaplanManager->getTokensFromAuthorizationCode()` call Kazaplan API `/oauth/token` endpoint.

```
curl --location --request POST 'https://preprodapi.kazaplan.com/oauth/token?grant_type=authorization_code' \
     --header 'Content-Type: application/x-www-form-urlencoded' \
     --header 'Authorization: Basic RGVtb0FwcDo1ZDljYWUxZTgwZjY0' \
     --data-urlencode 'grant_type=authorization_code' \
     --data-urlencode 'code=1234'
```
```json
{
    "access_token": "[...]",
    "token_type": "Bearer",
    "expires_in": 604799,
    "refresh_token": "[...]",
    "scope": "[...]"
}
```

`$this->kazaplanManager->getUser($accessToken)` call Kazaplan API `/v3/users` endpoint.

```
curl --location --request GET 'https://api.kazaplan.com/v3/users' \
     --header 'Authorization: Bearer [...]' \
```
```json
{
    "id": 2421880,
    "status": "success",
    "username": "quitominta343",
    "email": "demo-test@kazaplan.com",
    "gender": null,
    "firstName": "",
    "lastName": "",
    "address": null,
    "city": null,
    "phone": null,
    "postalCode": null,
    "countryId": 75,
    "countryCode": "FR",
    "createdAt": "2020-07-28T16:26:10.000Z",
    "updatedAt": "2020-07-28T16:26:10.000Z",
    "nbPlans": null,
    "_links": {
        "self": "https://preprodapi.kazaplan.com/users/2421880",
        "plans": "https://preprodapi.kazaplan.com/users/2421880/plans/{page}/{limit}"
    }
}
```

At this point user account is linked to its kazaplan account.

### Handle expired / invalid `config.token`