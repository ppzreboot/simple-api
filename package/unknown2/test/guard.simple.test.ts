import { assertEquals, assertStrictEquals } from '@std/assert'
import { make_unknown_2 } from '../lib/mod.ts'
import { is_integer, is_string } from "../lib/guards.ts";

interface User {
    id: string
    name: string
    year: number
}

const unknown_2_user = make_unknown_2<User>({
    id: is_string(val => val.length > 0),
    name: is_string(val => val.length >= 3),
    year: is_integer(val => val > 0),
})

Deno.test('guard user - simple', () => {
    const maybe_user: unknown = {
        id: '1',
        name: 'ppz',
        year: 3,
    }
    
    const u2_user = unknown_2_user(maybe_user)
    assertStrictEquals(u2_user.yes, true)
    const _: User = u2_user.data
})

Deno.test('guard user - type is safe, length is not enough', () => {
    const maybe_user: unknown = {
        id: '1',
        name: 'pp',
        year: 3,
    }
    
    const u2_user = unknown_2_user(maybe_user)
    assertStrictEquals(u2_user.yes, false)
    assertEquals(u2_user.keys, ['name'])
})
