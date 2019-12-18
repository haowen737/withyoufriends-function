# React Router - Differrent between BrowserRouter and HashRouter works

## Router

Normally we take BrowserRouter or HashRouter as the top-level router entry point.

The point here is `createHistory`  function, but I'll leave it for now.

The difference is `BrowserRouter` call `createBrowserHistory` while `HashRouter` call `createHashHistory`, we will talk about it later.

Both `BrowserRouter` and `HashRouter` return `Router`, which is the same component that includes a RouterContext's provider, created by react context API.

```
┌───────────────┐   ┌───────────────┐
│ BrowserRouter │   │  HashRouter   │
└───────────────┘   └───────────────┘
        │                   │
        └─────────┬─────────┘
  history = createHistory(this.props)
   ┌──────────────▼───────────────┐
   │ <Router history={history}/>  │
   └──────────────┬───────────────┘
                  │                    ┌─────────────────────────────────┐
  ┌───────────────▼─────────────────┐  │history.listen(location => {     │
  │     RouterContext.Provider      ├──▶    this.setState({ location }); │
  └─────────────────────────────────┘  │);                               │
                                       └─────────────────────────────────┘
```

## Route

The route is the basic unit that helps build our route system, and it is literally a RouterContext's consumer,
each time we call route's render function, Route component will trying to match location form router context,
and decide which route to render. 

```


               ┌─────────────┐
               │    Route    │
               └──────┬──────┘
                      │
         ┌────────────▼────────────┐
         │ RouterContext.Consumer  │
         └────────────┬────────────┘
                      │
        matchPath(location.pathname)
                      │
    ┌─────────────────▼─────────────────┐
    │ render(match ? component : null)  │
    └───────────────────────────────────┘

```

## History

History object provides basic route function like `push`, `replace`, etc.

```

   ┌─────────────────────────────────────┐
   │history = {                          │
   │    length: globalHistory.length,    │
   │    action: 'POP',                   │
   │    location: initialLocation,       │
   │    createHref,                      │
   │    push,                            │
   │    replace,                         │
   │    go,                              │
   │    goBack,                          │
   │    goForward,                       │
   │    block,                           │
   │    listen                           │
   │  };                                 │
   └─────────────────────────────────────┘



```

## CreateHistory

BrowserRouter and HashRouter call different `createHistory` functions, but `createBrowserHistory` and `createHashHistory` return the same history object, I'll take `push` function as an example here. createBrowserHistory and createHashHistory have different implement in the `push` function.

When calling `push` function, createBrowserHistory will push new route state in globalHistory, while createHashHistory will only assign new `path` to `window.location.hash`, after processing each part, each history will call `transitionManager.notifyListeners` which will trigger the router context value change, which can trigger the context of consumer component rerender.

```
   ┌─────────────────────┐                 ┌─────────────────────┐
┌──│createBrowserHistory │              ┌──│  createHashHistory  │
│  └─────────────────────┘              │  └─────────────────────┘
│                                       │
│  ┌──────────┐                         │  ┌──────────┐
├──│   push   │                         ├──│   push   │
│  └──────────┘                         │  └──────────┘
│                                       │  ┌───────────────────────────────┐
│                                       └─▶│  pushHashPath(encodedPath);   │
│  ┌──────────────────────────────┐        └───────────────┬───────────────┘
│  │globalHistory.pushState(      │                        │
└─▶│    { key, state }, null, href│        ┌───────────────▼───────────────┐
   │);                            │        │ window.location.hash = path;  │
   └─────────────────────────┬────┘        └────┬──────────────────────────┘
                             │                  │
                       ┌─────┴──────────────────┴──────┐
                       │setState({ action, location });│
                       └───────────────┬───────────────┘
                                       │
     ┌─────────────────────────────────▼──────────────────────────────────┐
     │transitionManager.notifyListeners(history.location, history.action);│
     └────────────────────────────────────────────────────────────────────┘
```