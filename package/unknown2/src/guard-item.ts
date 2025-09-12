export
const is_number = (narrow?: (val: number) => boolean) =>
    (val: unknown): val is number =>
        typeof val === 'number'
        && (narrow?.(val) ?? true)

export
const is_string = (narrow?: (val: string) => boolean) =>
    (val: unknown): val is string =>
        typeof val === 'string'
        && (narrow?.(val) ?? true)

/**
 * In case of mistakingly pass in `narrow` function,
 * not_empty_string is declared as a `checker` not `() => checker`.
 */
export
const not_empty_string = is_string(n => n.length > 0)

export
function nullable<T>(validate: (val: unknown) => val is T) {
    return (val: unknown): val is T | null =>
        val === null
        || validate(val)
}
