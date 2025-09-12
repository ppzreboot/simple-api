import { assertEquals } from '@std/assert/equals'
import { is_key_of } from '../lib/mod.ts'

Deno.test('is key of', () => {
    assertEquals(is_key_of('name', { name: 'ppz' }), true)

    assertEquals(is_key_of(1, { 1: 'ppz' }), true)
    assertEquals(is_key_of('1', { 1: 'ppz' }), true)
    assertEquals(is_key_of(1, { '1': 'ppz' }), true)
})

Deno.test('not key of', () => {
    assertEquals(is_key_of('name', { age: 18 }), false)
})
