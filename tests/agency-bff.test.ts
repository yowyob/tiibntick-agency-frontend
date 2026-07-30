import { describe, expect, it } from 'vitest'

import {
  deriveUsername,
  isPublicRequest,
  normalizeBffPath,
  resolveAgencySyncCorePath,
  rewriteAgencyRegistryPath,
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
    expect(isPublicRequest('POST', 'hub-handoffs/abc/confirm-client')).toBe(true)
    expect(isPublicRequest('GET', 'agencies/a/relay-hubs')).toBe(true)

    expect(isPublicRequest('GET', 'agencies')).toBe(false)
    expect(isPublicRequest('PATCH', 'agencies/a/settings')).toBe(false)
    expect(isPublicRequest('GET', 'admin/agencies')).toBe(false)
    expect(isPublicRequest('GET', 'sync/pull')).toBe(false)
    expect(isPublicRequest('POST', 'sync/push')).toBe(false)
    expect(isPublicRequest('POST', 'hub-handoffs/abc/approve')).toBe(false)
  })
})

describe('Agency registry path rewrites', () => {
  it('maps Java-shaped hub parcel paths onto Core', () => {
    expect(rewriteAgencyRegistryPath('POST', 'hubs/expired')).toBe('hubs/expired/process')
    expect(rewriteAgencyRegistryPath('POST', 'hubs/h1/parcels')).toBe('hubs/h1/parcels/deposit')
    expect(rewriteAgencyRegistryPath('GET', 'hubs/h1/parcels')).toBe('hubs/h1/parcels')
  })
})

describe('Agency BFF public claims', () => {
  it('keeps client claims on the public surface', () => {
    expect(isPublicRequest('POST', 'agencies/agency-1/claims')).toBe(true)
  })

  it('keeps public drop-off on the public surface', () => {
    expect(isPublicRequest('POST', 'agencies/agency-1/drop-off')).toBe(true)
  })

  it('keeps notification stream authenticated', () => {
    expect(isPublicRequest('GET', 'agencies/agency-1/notifications/stream')).toBe(false)
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
