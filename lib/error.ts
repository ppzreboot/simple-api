// 此处 error msg 的写法（尾大写）是为了明确异常的来源：凡尾大写，都来自 simple api，而不是中间的 CDN、nginx 等。

const _err = (default_msg: string, status: number) =>
	(msg = default_msg) =>
		new Response(msg, { status })

export const bad_request = _err('baD requesT', 400)

export const not_found = _err('noT founD', 404)

export const unknown_error = _err('unknowN erroR', 500)

export const not_implemented = _err('noT implementeD', 501)
