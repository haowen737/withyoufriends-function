# Dive into micro-frontend: qiankun and single-spa

> This article is for readers who have used `qiankun` before.


This may help you understand how [qiankun](https://github.com/umijs/qiankun) works and extend [single-spa](https://github.com/CanopyTax/single-spa) capability.

Register an app to qiankun is easy, call registerMicroApps, and put necessary app settings as params, name, entry, render, active.

qiankun uses `importEntry` extract html tamplate and spa's main funciton from sub application.
`import { importEntry } from 'import-html-entry';`

the template will be the container for certain sub-application, while the sub application's script will be executed under certain `sandbox` to get `mount`, `unmount`.

single-spa will handle the template as your sub application's container, and this will be done before we call the `mount` function in your sub-application.

```
                                           ┌────────────────┐
                                           │   App Entry    │
                                           └────────┬───────┘
                                                    │
                          ┌─────────────────────────▼──────────────────────────┐
                          │registerMicroApps([{ name, entry, render, active }])│
                          └─────────────────────────┬──────────────────────────┘
                                                    └───────────────────────────┐
                                                                                ▼
                                                               ┌─────────────────────────────────┐
                                              ┌──────────────┐ │ { name, entry, render, active } │
        ┌──────────────────────────────────┐  │  single-spa  │ └──────────────▲──────────────────┘
        │window.addEventListener('hashchang│  └──────┬───────┘                │
        │e', urlReroute);                  │         ├───▶────────────────────┴──────┐
     ┌─▶│window.addEventListener('popstate'│         │┌──│    registerApplication    │
     │  │, urlReroute);                    │         ││  └───────────────────────────┘
     │  └──────────────────────────────────┘         ││  ┌──────────────┐
     │                              ┌───────────┐    │└─▶│ importEntry  │
add listener when first in reroute  │  start()  ◀────┤   ├──────────────┘
     │                              └─────┬─────┘    │   │  ┌──────────────────────────┐
listener will call reroute                │          │   ├──▶appContent: html template │
     │                              ┌─────▼─────┐    │   │  └──────────────────────────┘
     └──────────────────────────────│  reroute  │    │   │  ┌────────────────────────┐
                                    └─────┬─────┘    │   ├──▶execScripts: spa script │
                                          │          │   │  └────────────────────────┘
                             ┌────────────▼─────┐    │   │  ┌────────────────────────────────────────────┐
                             │performAppChanges │    │   │  │// get spa's lifecycle hooks                │
                             └────────────┬─────┘    │   └──▶const {                                     │
                                          │          │      │    bootstrap: bootstrapApp, mount, unmount │
                             ┌────────────▼─────┐    │      │} = await execScripts(jsSandbox);           │
                             │ getAppsToUnload  │    │      └────────────────────────────────────────────┘
                             │  getAppsToLoad   │    │
                             └────────────┬─────┘    │
                                          │          │
                             ┌────────────▼─────┐    │
                             │unmountAllPromise │    │
                             │  mountPromises   │    │
                             └──────────────────┘    │
                                                     ▼
```


## Sandbox

Let's talk about the sandbox.

qiankun create sandbox by calling

```js
const sandbox = genSandbox(appName);
jsSandbox = sandbox.sandbox;
```

So genSandbox returns an object with `Proxy` of `Window` object and `mount`, `unmount` life cycle.

`qiankun` will create `renderSandboxSnapshot`, which is a map object to save snapshot, each `set` operation to window object will also be set here.

when calling `mount` function on the certain sandbox, properties stored in snapshots will be recovered and set to window object, calling `unmount` function will clear all properties created by the current sub-app, and restore to the default window.

```js
┌────────────┐
│  sandbox   │
└─┬──────────┘
  │
┌─▼───────────────────────┐
│       genSandbox        │
└─┬───────────────────────┘
  │
  │ ┌──────────────┐
  ├─▶    mount     │
  │ └──────────────┘
  │
  │ ┌──────────────┐
  ├─▶   unmount    │
  │ └──────────────┘
  │
  │ ┌────────────────────────────────────┐
  └─▶  new Proxy(window, { set, get })   │
    └────────────────────────────────────┘
```