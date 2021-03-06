# Gist of How ETag working on Server (Koa)

## request
```
                     ┌────────────┐ ┌────────────────────┐ ┌────────────────────┐
                     │  request   │ │    status: 304     │ │    status: 200     │
                     └──────┬─────┘ │     body: null     │ │ body: hello world  │
                            │       └────────────────────┘ └────────────────────┘
┌──────────────────────┐    │                  ▲      response        ▲
│   koa/conditional    │    │                  └────┬─────────────────┘
│                      │    │                       │
│app.use(conditional())│    │             ctx.fresh ? 304 : 200
└───────────────┬──────┘    │                       ▲
                │           │       ┌───────────────┴──────────────────┐
                │    ┌──────▼─────┐ │           httpjs/fresh           │
                └────▶    next    │ │ compare req.header & res.header  │
┌──────────────────┐ └──────┬─────┘ └───────────────▲──────────────────┘
│     koa/etag     │        │                       │
│                  │        │                       │
│ app.use(etag())  │        │     ctx.response.etag = calculate(entity)
└──────────────┬───┘        │                       │
               │     ┌──────▼─────┐        ┌────────┴──────┐
               └─────▶    next    │        │setHeader ETag │
                     └──────┬─────┘        └────────▲──────┘
                            │                       │
                            │                       │
                     ┌──────▼───────────────────────┴──────────────────────┐
                     │              ctx.body = 'hello world'               │
                     │                  ctx.status = 200                   │
                     └─────────────────────────────────────────────────────┘
```

## calculate ETag

```
             ┌────────────────────────────┐
             │  etag = calculate(entity)  │
             └──────────────┬─────────────┘
                 ┌──────────┴───────────┐
                 ▼                      ▼
      ┌─────────────────────┐  ┌─────────────────┐
      │     strong ETag     │  │    weak ETag    │
      └──────────┬──────────┘  └─────────────────┘
                 │                      │
                 │                  ┌───┴───┐
  ┌──────────────▼────────────┐  ┌──▼──┐ ┌──▼───┐
  │crypto                     │  │mtime│ │ size │
  │    .createHash('sha1')    │  └─────┘ └──────┘
  │    .update(entity, 'utf8')│
  │    .digest('base64')      │
  └───────────────────────────┘
```
