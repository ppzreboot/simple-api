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
+ 支持跨域时，response 建议自己 new。比如，不要原样转发 fetch 的结果，因为 fetch 得到的 response 其 header 不可变。
