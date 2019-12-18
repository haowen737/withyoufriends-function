# Dive into micro-frontend: qiankun and single-spa

!! UNFINSHED YET

> An implementation of Micro Frontends, based on single-spa, but made it production-ready.



This may help you understand how [qiankun](https://github.com/umijs/qiankun) actually works and extend [single-spa](https://github.com/CanopyTax/single-spa) capibility.

Register an app to qiankun is easy, call registerMicroApps, and put necessary app settings as params, name, entry, render, active.

qiankun uses `importEntry` extract html tamplate and spa's main funciton from sub application.
`import { importEntry } from 'import-html-entry';`

tmeplate will be the container for certain sub application, while sub applicetion's script will be excuted under certain `sandbox` to get `mount`, `unmount`.

single-spa will handle tmeplate as your sub application's container, and this will be done before we call `mount` function in your sub application.

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