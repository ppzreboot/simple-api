import type { z } from 'zod'

export
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'

export
type HttpResponse = Response | Promise<Response>

export
type RawHttpHandler = (req: Request) => Promise<Response>

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

export
interface HttpServerOpts {
	logger?: _Logger
	routes: HttpRoute[]
}

/** HTTP 请求上下文 */
export
interface HttpCTX {
	url: URL
	req: Request
	log: _Logger
	/** 解析 url 里的 query。
	 * @param schema 注意，此 schema 不是 zod 的 schema，而是 npm:zod-form-data 的 zfd.formData 的 schema
	 */
	parse_query: <Q>(schema: z.ZodType<Q>) => Q
	parse_json: <J>(schema: z.ZodType<J>) => Promise<J>
}

export
type HttpHandler = (ctx: HttpCTX) => HttpResponse
