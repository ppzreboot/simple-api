export
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'

export
interface HttpCTX {
	url: URL
	req: Request
}

export
type HttpResponse = Response | Promise<Response>

export
type HttpHandler = (ctx: HttpCTX) => HttpResponse

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
