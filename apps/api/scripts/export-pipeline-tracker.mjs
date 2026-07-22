#!/usr/bin/env node
/**
 * Export applications table to THP-LIFECYCLE-PIPELINE-TRACKER.csv format.
 * Usage: pnpm --filter api pipeline:export
 */
import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config } from 'dotenv'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })
config({ path: resolve(__dirname, '../.env.local'), override: true })

const { DATABASE_URL } = process.env
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const HEADER =
  'client_id,applicant_name,business_name,contact,engagement_lifecycle_status,qualification_result,maturity_classification,assigned_reviewer,missing_evidence,next_action,payment_status,service_permission,internal_learning_permission,anonymized_research_permission,case_study_permission,public_content_permission,tipper_data_permission,proof_permission_level,active_capacity_slot,notes'

function csvEscape(value) {
  if (value == null || value === '') return ''
  const text = String(value)
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

const pool = new pg.Pool({ connectionString: DATABASE_URL })

try {
  const { rows } = await pool.query(`
    SELECT
      client_id,
      founder_name,
      business_name,
      COALESCE(contact_phone, email) AS contact,
      lifecycle_status,
      qualification_result,
      maturity_classification,
      assigned_reviewer,
      missing_evidence,
      next_action,
      payment_status,
      active_capacity_slot,
      notes
    FROM applications
    ORDER BY submitted_at DESC
  `)

  const lines = [
    HEADER,
    ...rows.map((row) =>
      [
        row.client_id,
        row.founder_name,
        row.business_name,
        row.contact,
        row.lifecycle_status,
        row.qualification_result,
        row.maturity_classification,
        row.assigned_reviewer,
        row.missing_evidence,
        row.next_action,
        row.payment_status,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        row.active_capacity_slot ? 'yes' : 'no',
        row.notes,
      ]
        .map(csvEscape)
        .join(','),
    ),
  ]

  const outPath = resolve(
    __dirname,
    '../../../the-hard-port-os/operations/first-client-readiness/exports/THP-LIFECYCLE-PIPELINE-TRACKER-export.csv',
  )

  writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8')
  console.log(`Exported ${rows.length} row(s) to ${outPath}`)
} finally {
  await pool.end()
}
