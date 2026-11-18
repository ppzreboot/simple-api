import { not_found, unknown_error } from './error.ts'
import type { HttpCTX, RawHttpHandler, HttpRoute, HttpServerOpts, _Logger } from './type.ts'

const default_logger: _Logger = {
	debug: console.debug,
	info: console.log,
	warn: console.warn,
	error: console.error,
}

export
function simple_serve(opts: HttpServerOpts): RawHttpHandler {
	// 初始化 opts
	const log = opts.logger ?? default_logger
	const routes: HttpRoute[] = opts.routes.map(r => [r[0], r[1], r[2]])
	log.info(
		routes
			.map(r => `[API] ${r[0]} ${r[1]}`)
			.join('\n')
	)
	return async (req: Request) =>
		await handle_http({
			log,
			req,
			routes,
		})
}

async function handle_http(job: {
	log: _Logger
	req: Request
	routes: HttpRoute[]
}): Promise<Response> {
	const { log, routes, req } = job
	const url = new URL(job.req.url)
	const ctx: HttpCTX = { url, req }

	log.info('[New HTTP Request]', req.method, url.pathname)

	const route = router(routes, ctx)
	if (route === null) {
		log.warn('[HTTP - Not Found]', req.method, url.pathname)
		return not_found()
	}

	const start = Date.now()
	let response: Response
	try {
		response = await route[2](ctx)
	} catch(err) {
		if (err instanceof Response)
			response = err
		else {
			log.error('[HTTP - Unexpected Error]', err)
			response = unknown_error()
		}
	}

	log.info(`[HTTP - Response ${response.status}]`, req.method, url.pathname, Date.now() - start, 'ms')
	return response
}

function router(routes: HttpRoute[], ctx: HttpCTX): HttpRoute | null {
	for (const r of routes) {
		const [method, path] = r
		if (method === ctx.req.method && path === ctx.url.pathname)
			return r
	}
	return null
}
