import { not_found, unknown_error } from './error.ts'
import type { HttpCTX, RawHttpHandler, HttpRoute, HttpServerOpts, Logger } from './type.ts'
import { parse_json, parse_query } from './parse_input.ts'

const default_logger: Logger = {
	debug: (...items: unknown[]) => console.debug('[DEBUG]', ...items),
	info: (...items: unknown[]) => console.log('[INFO]', ...items),
	warn: (...items: unknown[]) => console.warn('[WARN]', ...items),
	error: (...items: unknown[]) => console.error('[ERROR]', ...items),
}

/** http server 入口 */
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

const prefix_log = (log: Logger, req: Request): Logger => ({
	debug: (...items: unknown[]) => log.debug(`[${req.method} ${req.url}]`, ...items),
	info: (...items: unknown[]) => log.info(`[${req.method} ${req.url}]`, ...items),
	warn: (...items: unknown[]) => log.warn(`[${req.method} ${req.url}]`, ...items),
	error: (...items: unknown[]) => log.error(`[${req.method} ${req.url}]`, ...items),
})

async function handle_http(job: {
	log: Logger
	req: Request
	routes: HttpRoute[]
}): Promise<Response> {
	const { routes, req } = job
	const log = prefix_log(job.log, req)
	const url = new URL(job.req.url)
	const ctx: HttpCTX = {
		log,
		url,
		req,
		parse_query: parse_query(url, log),
		parse_json: parse_json(req, log),
	}

	log.info('[New HTTP Request]')

	const route = router(routes, ctx)
	if (route === null) {
		log.warn('[HTTP - Not Found]')
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

	log.info(`[HTTP - Response ${response.status}]`, Date.now() - start, 'ms')
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
