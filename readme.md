# Simple API
Simple API 提供最基本的 http api 功能。
旨在在 ai agent 时代，提高人类对代码的掌控度（越简单，越容易掌控）。

## TODO
+ CORS

## Features
+ 路径精确匹配，如 `/api` 与 `/api/` 是不同的路径
+ 不支持路径参数，应使用 query
+ 不刻意追求 restful

## 解析 input
解析 query 数据时，需手动安装 npm:zod-form-data。

失败时直接 `throw` 400，成功则返回解析后的数据：
``` ts
import { z } from 'zod'
import { zfd } from 'zod-form-data'

// query 要用 zfd.formData，不是 z.object
const q = ctx.parse_query(zfd.formData({
	page: zfd.numeric(),
}))

const body = await ctx.parse_json(z.object({
	name: z.string(),
}))
```

## 中间件
不支持。

如需全局中间件，在收集完 routes 之后，包一层即可：
``` ts
import { simple_serve } from '@ppz/simple-api'
import { route1, route2 } from './xxx.ts'

const routes = [route1, route2]
for (const route of routes) {
	const raw_handle = route[2]
	route[2] = async ctx => {
		// before
		const res = await raw_handle(ctx)
		// after
		return res
	}
}

```

## 自动生成 api 文档
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
