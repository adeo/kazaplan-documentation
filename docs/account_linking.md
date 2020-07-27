---
id: account_linking
title: Account Linking
---

### Introduction

In this part we will show how to link your existing / new users with
their Kazaplan account throught differents possible scenarios.

### Technical Prerequisite

You need to store kazaplan ***access_token***, ***refresh_token*** and ***kazaplan_id*** in your user database.

Use an unique kazaplan authentication url (e.g: ***/kazaplan/enroll***) and set it to [widget options](/docs/advanced_setup#options).

## Scenarios

### User is not registred on both your website and kazaplan

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
