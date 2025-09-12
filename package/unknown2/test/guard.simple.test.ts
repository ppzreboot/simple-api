import { assertEquals } from '@std/assert/equals'
import { make_unknown_2 } from '../src/mod.ts'

interface User {
    id: string
    name: string
    year: number
}

const unknown_2_user = make_unknown_2<User>({
    id: (val): val is string =>
        typeof val === 'string'
        && val.length > 0
    ,
    name: (val): val is string =>
        typeof val === 'string'
        && val.length >= 3
    ,
    year: (val): val is number =>
        typeof val === 'number'
        && Number.isInteger(val)
        && val > 0
    ,
})

Deno.test('guard user - simple', () => {
    const maybe_user: unknown = {
        id: '1',
        name: 'ppz',
        year: 3,
    }
    
    const is_user = unknown_2_user(maybe_user)
    if (is_user) {
        const _: User = maybe_user
    }
    assertEquals(is_user, true)
})

Deno.test('guard user - type is safe, length is not enough', () => {
    const maybe_user: unknown = {
        id: '1',
        name: 'pp',
        year: 3,
    }
    
    const is_user = unknown_2_user(maybe_user)
    assertEquals(is_user, false)
})
