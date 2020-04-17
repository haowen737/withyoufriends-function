# Webpack - How HMR Works

### webpack-dev-server(WDS)
When using webpack-dev-server and open `enable` option, it will add `HotModuleReplacementPlugin` to the config.
```
if (options.hot || options.hotOnly) {
  if (
    !config.plugins.find(
      (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin'
    )
  ) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
}
```

### HMR Runtime - WDS Client
When `hot` config is enabled in the `webpack-dev-server` config, `webpack` will install the HMR Runtime into our bundle,
HMR Runtime is the code that will help receive module updates. 

### HMR Server
HMR Server will send a notification to HMR Runtime when the update happened.

When app loaded, `webpack-dev-server` opens a Websocket connect to the WDS client, 

## After Code Changed
1. fs listener will trigger DWS server the change, the Webpack compiler will build the project to create the new Bundle (notice this bundle will only be stored in memory).
2. compiler consists of two parts:
  - updated manifest
  - updated chunks
3. WDS server sends a message to the client through the `websocket` channel.
4. After the client received the `ws` message, the client will send two requests to get the new bundle.
  - download the manifest of the new bundle. [what is Webpack manifest](https://webpack.docschina.org/concepts/manifest/#src/components/Sidebar/Sidebar.jsx)
  - download the new chunk (the changed module).


*inspect WebSocket network in chrome*


| Date  | Length | Time |
|---|---|---|
| o | 1 | 11:51:14.107
| a["{\"type\":\"hot\"}"] | 23 | 11:51:14.108
| a["{\"type\":\"log-level\",\"data\":\"none\"}"] | 47 | 11:51:14.108
| a["{\"type\":\"hash\",\"data\":\"ccc6be1863290492f438\"}"]  | 58 | 11:51:14.108
| a["{\"type\":\"ok\"}"]  | 22 | 11:51:14.109


*download*

|manifest, new chunk|
|---|
|GET /3b3d2c64fc98e2a81721.hot-update.json HTTP/1.1|
|GET /main.3b3d2c64fc98e2a81721.hot-update.js HTTP/1.1|

## React
When using `HotModuleReplacementPlugin`, its [interface](https://webpack.docschina.org/api/hot-module-replacement/) will be exposeed under `module.hot`.
```
if (module.hot) {
  module.hot.accept('./app.js', function() {
    const app = require('./app.js)
    ReactDOM.render(<App>, root)
  });
}
```
As for persisting state after rerendered, use [Fast Refresh](https://github.com/facebook/react/issues/16604) to keep component state.

