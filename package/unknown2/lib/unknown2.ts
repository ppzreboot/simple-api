export
type Guard<D> = {
    yes: true
    data: D
} | {
    yes: false
    keys: (string | number)[]
}

export
type I_unknown_2<D> = (val: unknown) => Guard<D>

export
type I_type_desc<D extends object> = {
    [K in keyof D]: I_unknown_2<D[K]>
}

export
function make_unknown_2<D extends object>(desc: I_type_desc<D>): I_unknown_2<D> {
    return function unknown_2(data: unknown): Guard<D> {
        if (!is_obj(data))
            return {
                yes: false,
                keys: [],
            }
        for (const key in desc) {
            const guard_item = desc[key]
            if (!is_key_of(key, data)) {
                return {
                    yes: false,
                    keys: [key],
                }
            }
            const check_result = guard_item(data[key])
            if (!check_result.yes) {
                return {
                    yes: false,
                    keys: [key, ...check_result.keys],
                }
            }
        }
        return {
            yes: true,
            data: data as D,
        }
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
