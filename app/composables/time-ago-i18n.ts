import type {
  MaybeRefOrGetter,
  UseTimeAgoMessages,
  UseTimeAgoOptions,
  UseTimeAgoUnitNamesDefault,
} from '@vueuse/core'
import { computed } from 'vue'

// From: https://github.com/sheinsight/react-use/blob/9b6b1023ffda7d96616ebcbe643f1214301fac9f/packages/react-use/src/use-time-ago/index.zh-cn.mdx
const MESSAGES_ZH_CN: UseTimeAgoMessages<UseTimeAgoUnitNamesDefault> = {
  justNow: '刚刚',
  past: n => (/\d/.test(n) ? `${n}前` : n),
  future: n => (/\d/.test(n) ? `${n}后` : n),
  month: (n, past) => (n === 1 ? (past ? '上个月' : '下个月') : `${n} 个月`),
  year: (n, past) => (n === 1 ? (past ? '去年' : '明年') : `${n} 年`),
  day: (n, past) => (n === 1 ? (past ? '昨天' : '明天') : `${n} 天`),
  week: (n, past) => (n === 1 ? (past ? '上周' : '下周') : `${n} 周`),
  hour: n => `${n} 小时`,
  minute: n => `${n} 分钟`,
  second: n => `${n} 秒`,
  invalid: '',
}

export function useTimeAgoI18n(time: MaybeRefOrGetter<Date | number | string>, options?: UseTimeAgoOptions<false, UseTimeAgoUnitNamesDefault>) {
  const { locale } = useI18n()

  return computed(() => useTimeAgo(time, {
    ...options,
    messages: locale.value === 'zh-CN' ? MESSAGES_ZH_CN : undefined,
  }).value)
}
