export
type I_type_desc<D extends object> = {
    [K in keyof D]: (val: unknown) => val is D[K]
}

export
function make_unknown_2<D extends object>(desc: I_type_desc<D>) {
    return function unknown_2(data: unknown): data is D{
        if (!is_obj(data))
            return false

        for (const key in desc) {
            const guard_item = desc[key]
            if (
                !is_key_of(key, data)
                || !guard_item(data[key])
            )
                return false
        }
        return true
    }
}

export
function is_obj(val: unknown): val is object {
    return typeof val === 'object' && val !== null
}

export
function is_key_of<T extends object>(key: PropertyKey, t: T): key is keyof T {
    return key in t
}
