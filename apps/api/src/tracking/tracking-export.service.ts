import { Injectable } from '@nestjs/common'

/**
 * TODO(scaffold): TRACKING-ROADMAP §7.4 — CSV export for funnel analytics.
 */
@Injectable()
export class TrackingExportService {
  buildFunnelCsvStub(days: number): string {
    const header = [
      'section_id',
      'section_label',
      'unique_visitors',
      'pct_of_sessions',
      'avg_max_scroll_pct',
    ].join(',')

    return [
      `# TODO(scaffold): funnel CSV export — last ${days} days`,
      `# Replace stub with TrackingAnalyticsService aggregation`,
      header,
    ].join('\n')
  }
}
