# Simple API
Simple API 提供最基本的 http api 功能。
旨在在 ai agent 时代，提高人类对代码的掌控度（越简单，越容易掌控）。

[详细 API 文档](https://jsr.io/@ppz/simple-api/doc)

``` sh
# Deno
deno add @ppz/simple-api
# Node.js
npx jsr add @ppz/simple-api
```

## 怎么用？

#### 一眼懂

```ts
import { simple_serve, http_route, respond_json } from '@ppz/simple-api'
import { z } from 'zod'

// 一条 route。为演示解析 JSON，这里用 POST 请求。
const hello_route = http_route('POST', '/hello', async ctx => {
	// 解析 json
	const data = await ctx.parse_json(
		z.object({
			name: z.string(),
		})
	) // 如果 json body 格式异常，会响应 400

	return respond_json({
		hello: data.name,
	})
})

// 收集全部 route
const routes = [
	hello_route,
]

// http 入口
const http_handler = simple_serve({
	routes,
})

// Deno
Deno.serve(http_handler)
// Cloudflare Workers
// export default { fetch: http_handler }
```

> [!WARNING]
> simple-api 的“怪异行为”：
> + `/api` 与 `/api/` 是不同的路径
> + 路径匹配但 method 不匹配时，响应 404，而不是 405

[详细 API 文档](https://jsr.io/@ppz/simple-api/doc)

#### 解析 query
需手动安装 npm:zod-form-data。

```ts
import { http_route, respond_json } from '@ppz/simple-api'
import { zfd } from 'zod-form-data'

const hello_route = http_route('GET', '/hello', ctx => {
	const query = ctx.parse_query(
		// query 要用 zfd.formData，不是 z.object
		zfd.formData({
			name: zfd.text(),
		})
	)

	return respond_json({
		hello: query.name,
	})
})
```

#### 中间件
你的下一个中间件不一定非得是中间件。
推荐做法：[封装 http_route](https://jsr.io/@ppz/simple-api/doc/~/http_route)。

#### 自动生成 api 文档
不支持。如需要，让 llm 生成一份即可。

## FYI
#### New Response
支持跨域时，response 建议自己 new。比如，不要原样转发 fetch 的结果，因为 fetch 得到的 response 其 header 不可变。

#### 两种错误
+ 代码错误。
	+ 如“请求体里的 json 格式不正确”、“该传 session token 而不传”、“session token 的格式有问题”。
	+ 这种错误的特点就是：不是由用户操作引起，而是代码本身有问题，或普通用户使用了非法客户端（危险），或非法用户（危险）。
	+ 处理这种错误时，一般很难向用户解释（代码本身问题），或不需要向用户解释（非法客户端或非法用户）。
	+ 一般而言，通知用户“未知错误”即可。
	+ 响应码方面。如果请求有问题，直接响应 400（bad request），而不提供更多信息（如 “session token 格式不正确”）。请求没问题的，响应 500。
+ 非代码错误。
	+ 如“session token 失效”、“改名时，重名”、“支付时，余额不足”。
	+ 这种错误的特点是：代码本身没问题，但开发者要尽量提供友好的 UI/UX 让用户知晓。
	+ 响应码方面，除非有非常合适的，如 session token 过期，一般统统响应 200。

## TODO
+ CORS
+ 利用 `URLPattern` 做 path param 支持
