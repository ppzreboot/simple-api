import { assertEquals } from '@std/assert'
import { is_obj } from '../lib/mod.ts'

// typeof null === 'object'
Deno.test('null is not object', () => {
    assertEquals(is_obj(null), false)
})

Deno.test('function is not object', () => {
    assertEquals(is_obj(() => {}), false)
    assertEquals(is_obj(async () => {}), false)

    assertEquals(is_obj(function() {}), false)
    assertEquals(is_obj(function*() {}), false)
    assertEquals(is_obj(async function() {}), false)

    assertEquals(is_obj(class {}), false)
})

Deno.test('other primitives are not object', () => {    
    assertEquals(is_obj(1), false)
    assertEquals(is_obj(1.1), false)
    assertEquals(is_obj(0), false)
    assertEquals(is_obj(NaN), false)
    assertEquals(is_obj(Infinity), false)

    assertEquals(is_obj(''), false)
    assertEquals(is_obj('1'), false)

    assertEquals(is_obj(true), false)
    assertEquals(is_obj(false), false)

    assertEquals(is_obj(undefined), false)

    assertEquals(is_obj(Symbol()), false)
})

Deno.test('others are object', () => {
    assertEquals(is_obj({}), true)
    assertEquals(is_obj([]), true)
    assertEquals(is_obj(new Date()), true)
})
