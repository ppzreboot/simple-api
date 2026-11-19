import type { z } from 'zod'

/** 目前支持的 http method。 */
export
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'

/** handler 的返回值。 */
export
type HttpResponse = Response | Promise<Response>

export
type RawHttpHandler = (req: Request) => Promise<Response>

/** 一条 http 路由。 */
export
type HttpRoute = [HttpMethod, string, HttpHandler]

export
type _log = (...items: unknown[]) => void

export
interface _Logger {
	debug: _log
	info: _log
	warn: _log
	error: _log
}

/** 用户初始化 simple-api 时的参数。 */
export
interface HttpServerOpts {
	logger?: _Logger
	routes: HttpRoute[]
}

/** HTTP 请求上下文 */
export
interface HttpCTX {
	url: URL
	/** 原始 http 请求。 */
	req: Request
	/** 默认使用 console.log，用户可自定义日志打印。 */
	log: _Logger
	/** 解析 url 里的 query。
	 * @param schema 注意，此 schema 不是 zod 的 schema，而是 npm:zod-form-data 的 zfd.formData 的 schema
	 */
	parse_query: <Q>(schema: z.ZodType<Q>) => Q
	/** 解析 body 里的 json，只能读一次。 */
	parse_json: <J>(schema: z.ZodType<J>) => Promise<J>
}

export
type HttpHandler = (ctx: HttpCTX) => HttpResponse
