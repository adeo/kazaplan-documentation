---
id: account_linking
title: Account Linking
---

### Introduction

In this part we will show how to link your existing / new users with
their Kazaplan account throught differents possible scenarios.

### Technical Prerequisite

You need to store in your user database kazaplan access / refresh token
and kazaplan user id.

Create an unique kazaplan authentication url (e.g: `/kazaplan/enroll`) and set it to widget options.

See also [Widget Options](setup.md#options)

---

## Scenarios

In all scenarios below, you have to set [`authentication.url`](setup.md#options) to **ht<span>tps://w</span>ww.yourwebsite.com/kazaplan/enroll**

### Scenario 1

User is not login / registred on your website and doesn't have Kazaplan
account and create a new plan. In this case `config.token` is null or
`undefined` and the `authentication.url` will be shown inside the
kazaplan iFrame once user save the plan.

Afficher capture de la modal de login Afficher la capture de la création
de compte kazaplan Afficher la capture de la partie authorize

### Scenario 2

User is not logged in on your website and already have Kazaplan account
but his account is not linked to your account yet.

We will redirect to your `authentication.url`

In all scenarios, if no token is provided to Kazaplan, you have to
perform these tests in the `enroll` route

-   Check if user is already lo
