import { NextResponse } from 'next/server'

import { isAccessInstalled } from '@psyferblock/access/server/config'

export async function GET() {
  return NextResponse.json({
    installed: isAccessInstalled(),
    catalog: isAccessInstalled(),
  })
}
