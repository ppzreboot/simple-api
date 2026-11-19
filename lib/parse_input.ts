import type { z } from 'zod'
import type { Logger } from './type.ts'
import { bad_request } from './error.ts'

export
const parse_query = (url: URL, log: Logger) =>
	/** 这里的 schema 不是 zod 的 schema，而是 npm:zod-form-data 的 zfd.formData */
	<Q>(schema: z.ZodType<Q>): Q => {
		const result = schema.safeParse(url.searchParams)
		if (!result.success) {
			log.error('[Failed to parse query]', result.error)
			throw bad_request()
		}
		return result.data
	}

export
const parse_json = (req: Request, log: Logger) =>
	async <J>(schema: z.ZodType<J>): Promise<J> => {
		let json: unknown
		try {
			json = await req.json()
		} catch(err) {
			log.error('[Failed to parse JSON]', err)
			throw bad_request()
		}

		const result = schema.safeParse(json)
		if (!result.success) {
			log.error('[Bad JSON - Invalid Format]', result.error.message)
			throw bad_request()
		}
		return result.data
	}
