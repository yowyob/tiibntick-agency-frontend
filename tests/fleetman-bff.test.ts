import { afterEach, describe, expect, it } from 'vitest'

import {
  buildFleetManVehicleRequest,
  decryptFleetManToken,
  encryptFleetManToken,
} from '@/lib/server/fleetman-bff'

const originalKey = process.env.TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY
const originalPlaintext = process.env.TNT_FLEETMAN_ALLOW_PLAINTEXT_TOKENS

afterEach(() => {
  process.env.TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY = originalKey
  process.env.TNT_FLEETMAN_ALLOW_PLAINTEXT_TOKENS = originalPlaintext
})

describe('FleetMan token storage', () => {
  it('round-trips an AES-256-GCM token', () => {
    process.env.TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY = Buffer.alloc(32, 7).toString('base64')
    delete process.env.TNT_FLEETMAN_ALLOW_PLAINTEXT_TOKENS

    const encrypted = encryptFleetManToken('refresh-secret')

    expect(encrypted).not.toContain('refresh-secret')
    expect(decryptFleetManToken(encrypted)).toBe('refresh-secret')
  })

  it('supports the explicit local-only plaintext mode', () => {
    delete process.env.TNT_FLEETMAN_TOKEN_ENCRYPTION_KEY
    process.env.TNT_FLEETMAN_ALLOW_PLAINTEXT_TOKENS = 'true'

    const stored = encryptFleetManToken('local-refresh')

    expect(stored).toBe('plain:local-refresh')
    expect(decryptFleetManToken(stored)).toBe('local-refresh')
  })
})

describe('FleetMan catalog mapping', () => {
  it('maps an Agency vehicle to catalog identifiers', () => {
    const catalog = {
      vehicleTypes: [{ id: 'type-car', name: 'car' }],
      manufacturers: [{ id: 'manufacturer-toyota', name: 'toyota' }],
      brands: [{ id: 'brand-toyota', name: 'toyota' }],
      models: [{ id: 'model-corolla', name: 'corolla' }],
      sizes: [{ id: 'size-standard' }],
      usages: [{ id: 'usage-logistics' }],
      fuels: [{ id: 'fuel-diesel' }],
      transmissions: [{ id: 'transmission-manual' }],
      colors: [{ id: 'color-white' }],
    }

    expect(buildFleetManVehicleRequest(catalog, {
      licensePlate: 'LT 123 AA',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2024,
      vehicleType: 'CAR',
    })).toEqual({
      licensePlate: 'LT 123 AA',
      manufacturingYear: 2024,
      vehicleTypeId: 'type-car',
      manufacturerId: 'manufacturer-toyota',
      brandId: 'brand-toyota',
      modelId: 'model-corolla',
      sizeId: 'size-standard',
      usageTypeId: 'usage-logistics',
      fuelTypeId: 'fuel-diesel',
      transmissionTypeId: 'transmission-manual',
      colorId: 'color-white',
    })
  })
})
