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

export
interface HttpCTX {
	url: URL
	req: Request
	log: _Logger
	parse_query: <Q>(schema: z.ZodType<Q>) => z.ZodSafeParseResult<Q>
	parse_json: <J>(schema: z.ZodType<J>) => Promise<z.ZodSafeParseResult<J>>
}

export
type HttpHandler = (ctx: HttpCTX) => HttpResponse
