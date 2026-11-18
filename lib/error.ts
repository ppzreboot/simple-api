const _err = (default_msg: string, status: number) =>
	(msg = default_msg) =>
		new Response(msg, { status })

export const bad_request = _err('baD requesT', 400)

export const not_found = _err('noT founD', 404)

export const method_not_allowed = _err('methoD noT alloweD', 405)

export const unknown_error = _err('unknowN erroR', 500)

export const not_implemented = _err('noT implementeD', 501)
