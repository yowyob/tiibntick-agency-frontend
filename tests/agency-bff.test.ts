import { describe, expect, it } from 'vitest'

import {
  deriveUsername,
  isPublicRequest,
  normalizeBffPath,
  resolveAgencySyncCorePath,
} from '@/lib/server/agency-bff'

describe('Agency BFF path validation', () => {
  it('normalizes safe path segments', () => {
    expect(normalizeBffPath(['agencies', 'agency id', 'missions']))
      .toBe('agencies/agency%20id/missions')
  })

  it.each([
    [['..']],
    [['%2e%2e']],
    [['missions%2Fadmin']],
    [['missions%5Cadmin']],
    [['https:']],
    [['']],
  ])('rejects unsafe segments: %j', segments => {
    expect(normalizeBffPath(segments)).toBeNull()
  })
})

describe('Agency BFF public surface', () => {
  it('allows only the intended unauthenticated routes', () => {
    expect(isPublicRequest('POST', 'auth/login')).toBe(true)
    expect(isPublicRequest('GET', 'tracking/TNT-123')).toBe(true)
    expect(isPublicRequest('GET', 'tracking/TNT-123/stream')).toBe(true)
    expect(isPublicRequest('POST', 'intake-requests')).toBe(true)

    expect(isPublicRequest('GET', 'agencies')).toBe(false)
    expect(isPublicRequest('PATCH', 'agencies/a/settings')).toBe(false)
    expect(isPublicRequest('GET', 'admin/agencies')).toBe(false)
    expect(isPublicRequest('GET', 'sync/pull')).toBe(false)
    expect(isPublicRequest('POST', 'sync/push')).toBe(false)
  })
})

describe('Agency sync route rewriting', () => {
  it('rewrites legacy /sync/* paths with the authenticated agency id', () => {
    expect(resolveAgencySyncCorePath('sync/pull', 'agency-1'))
      .toBe('agencies/agency-1/sync/pull')
    expect(resolveAgencySyncCorePath('sync/push', 'agency-1'))
      .toBe('agencies/agency-1/sync/push')
    expect(resolveAgencySyncCorePath('sync/bootstrap', 'agency-1'))
      .toBe('agencies/agency-1/sync/bootstrap')
  })

  it('accepts scoped agency paths only for the same agency', () => {
    expect(resolveAgencySyncCorePath('agencies/agency-1/sync/pull', 'agency-1'))
      .toBe('agencies/agency-1/sync/pull')
    expect(resolveAgencySyncCorePath('agencies/other/sync/pull', 'agency-1')).toBeNull()
  })
})

describe('Kernel signup compatibility', () => {
  it('derives the same bounded username as the Java rollback BFF', () => {
    expect(deriveUsername('John+Agency@Example.com')).toBe('john.agency')
    expect(deriveUsername('@example.com')).toBe('agency.owner')
    expect(deriveUsername(`${'a'.repeat(60)}@example.com`)).toHaveLength(48)
  })
})
