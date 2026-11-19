/** 响应 JSON 数据。适用于不可能失败的 api call，如纯数据接口。 */
export
const respond_json = (data: unknown): Response =>
	new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		}
	})

/** 操作成功 & 响应数据。 */
export
const respond_json_success = (data: unknown): Response =>
	respond_json({
		ok: true,
		data,
	})

/**
 * 请求没问题、处理过程没问题（这是响应 200 的原因）；
 * 但 api call 失败了，如改名时发现该用户名已存在。
 * 这种错误通常要跟用户解释（如通过 noty）错误的原因。
 */
export
const respond_json_error = (error_key: string): Response =>
	respond_json({
		ok: false,
		error_key,
	})

/** 适用于“操作成功”，但无返回数据。 */
export
const respond_empty_success = (): Response =>
	new Response(null, {
		status: 204,
	})
