#!/usr/bin/env node
/**
 * Static checks for onboarding flow — complements manual walkthrough.
 * Usage: node .cursor/skills/ux-onboarding-flow/scripts/run-flow-checks.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../../../../')

const results = []

function pass(id, msg) {
  results.push({ id, outcome: 'pass', msg })
}

function fail(id, msg) {
  results.push({ id, outcome: 'fail', msg })
}

function warn(id, msg) {
  results.push({ id, outcome: 'warn', msg })
}

function read(rel) {
  const path = resolve(root, rel)
  if (!existsSync(path)) return null
  return readFileSync(path, 'utf8')
}

// AP-02 lazy homepage
const page = read('apps/web/app/page.tsx')
const lazy = read('apps/web/src/landing/lazy-home-sections.tsx')
if (page && lazy) {
  if (page.includes('LazyHomeSections') && !page.includes('PackagesSection')) {
    pass('AP-02', 'Homepage uses LazyHomeSections without legacy packages import')
  } else {
    fail('AP-02', 'Homepage may eagerly import legacy sections')
  }
} else {
  fail('AP-02', 'Missing page.tsx or lazy-home-sections.tsx')
}

// AP-04 apply without auth
const applyPage = read('apps/web/app/apply/page.tsx')
const applyForm = read('apps/web/src/landing/engagement-readiness-form.tsx')
if (applyPage?.includes('EngagementReadinessForm') && applyForm?.includes('submitIntake')) {
  pass('AP-04', 'Apply route uses EngagementReadinessForm + submitIntake')
} else {
  fail('AP-04', 'Apply form wiring broken')
}
if (applyPage?.includes('/sign-in')) {
  fail('AP-04', 'Apply page links to sign-in in main content')
}

// OP-02 callback
const callback = read('apps/web/app/auth/callback/page.tsx')
if (callback?.includes("router.replace('/review')")) {
  pass('OP-02', 'OAuth callback redirects to /review')
} else if (callback?.includes("router.replace('/apply')")) {
  fail('OP-02', 'OAuth callback still redirects to /apply')
} else {
  warn('OP-02', 'Could not verify callback redirect target')
}

// OP-04 pipeline
const pipelineForm = read('apps/web/src/components/application-pipeline-form.tsx')
const patchRoute = read('apps/api/src/intake/intake.controller.ts')
if (pipelineForm && patchRoute?.includes('@Patch(')) {
  pass('OP-04', 'Pipeline form and PATCH endpoint present')
} else {
  fail('OP-04', 'Pipeline update UI or API missing')
}

// PL-01 env
const webEnv = read('apps/web/.env.example')
if (webEnv?.includes('NEXT_PUBLIC_THP_API_URL') && !webEnv.includes('VITE_THP_API_URL')) {
  pass('PL-01', 'Web env uses NEXT_PUBLIC_THP_API_URL')
} else {
  warn('PL-01', 'Check apps/web/.env.example for NEXT_PUBLIC_THP_API_URL')
}

const webSrc = read('apps/web/src/lib/auth-session.ts')
if (webSrc?.includes('NEXT_PUBLIC_THP_API_URL')) {
  pass('PL-01', 'auth-session uses NEXT_PUBLIC_THP_API_URL')
} else {
  fail('PL-01', 'auth-session still uses VITE_ prefix')
}

// PL-02 export
if (existsSync(resolve(root, 'apps/api/scripts/export-pipeline-tracker.mjs'))) {
  pass('PL-02', 'Pipeline export script exists')
} else {
  fail('PL-02', 'Missing export-pipeline-tracker.mjs')
}

// Hero CTA scan
const hero = read('apps/web/src/landing/hero.tsx')
if (hero && !/free slot|apply free/i.test(hero)) {
  pass('AP-01', 'Hero CTAs avoid free-slot language')
} else {
  fail('AP-01', 'Hero still uses legacy free-slot CTAs')
}

console.log('\nUX onboarding flow checks\n')
for (const r of results) {
  const icon = r.outcome === 'pass' ? '✓' : r.outcome === 'fail' ? '✗' : '⚠'
  console.log(`${icon} [${r.id}] ${r.outcome.toUpperCase()}: ${r.msg}`)
}

const fails = results.filter((r) => r.outcome === 'fail').length
const warns = results.filter((r) => r.outcome === 'warn').length
console.log(`\n${results.length} checks — ${fails} fail, ${warns} warn\n`)

if (fails > 0) process.exit(1)
