import type { Guard, I_unknown_2 } from './unknown2.ts'

/** make primitive guard */
export
function make_primitive_guard<T>(
    is_T: (val: unknown) => val is T,
    narrow?: (val: T) => boolean,
) {
    return (val: unknown): Guard<T> => {
        if (is_T(val) && (narrow?.(val) ?? true))
            return {
                yes: true,
                data: val,
            }
        else
            return {
                yes: false,
                keys: [],
            }
    }
}

export
const is_number = (narrow?: (val: number) => boolean) =>
    make_primitive_guard(
        (val: unknown): val is number =>
            Number.isFinite(val)
        ,
        narrow,
    )

export
const is_integer = (narrow?: (val: number) => boolean) =>
    make_primitive_guard(
        (val: unknown): val is number =>
            Number.isSafeInteger(val)
        ,
        narrow,
    )

export
const is_string = (narrow?: (val: string) => boolean) =>
    make_primitive_guard(
        (val: unknown): val is string =>
            typeof val === 'string'
        ,
        narrow,
    )

export
const nonempty_string = (narrow?: (val: string) => boolean) =>
    is_string(val => val.length > 0 && (narrow?.(val) ?? true))

export
const nullable = <T>(unknown2: I_unknown_2<T>): I_unknown_2<T | null> =>
    (val: unknown): Guard<T | null> =>
        val === null
            ? {
                yes: true,
                data: null,
            }
            : unknown2(val)

export
function is_array<D>(unknown_2_D: I_unknown_2<D>): I_unknown_2<D[]> {
    return function unknown_2_array(val: unknown): Guard<D[]> {
        if (!Array.isArray(val))
            return {
                yes: false,
                keys: [],
            }
        for(const index in val) {
            const check_result = unknown_2_D(val[index])
            if (!check_result.yes) {
                return {
                    yes: false,
                    keys: [index, ...check_result.keys],
                }
            }
        }
        return {
            yes: true,
            data: val as D[],
        }
    }
}