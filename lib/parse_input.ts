import type { z } from 'zod'
import type { _Logger } from './type.ts'
import { bad_request } from './error.ts'

export
const parse_query = (url: URL) =>
	<Q>(schema: z.ZodType<Q>): z.ZodSafeParseResult<Q> =>
		schema.safeParse(url.searchParams)

export
const parse_json = (req: Request, log: _Logger) =>
	async <J>(schema: z.ZodType<J>): Promise<z.ZodSafeParseResult<J>> => {
		let json: object
		try {
			json = await req.json()
		} catch(err) {
			log.error('[Failed to parse JSON]', err)
			throw bad_request()
		}
		return schema.safeParse(json)
	}
