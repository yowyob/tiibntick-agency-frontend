import { NextRequest, NextResponse } from 'next/server'

import { handleAgencyBff } from '@/lib/server/agency-bff'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{ path: string[] }>
}

async function handle(request: NextRequest, context: RouteContext): Promise<NextResponse> {
  const { path } = await context.params
  return handleAgencyBff(request, path)
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
