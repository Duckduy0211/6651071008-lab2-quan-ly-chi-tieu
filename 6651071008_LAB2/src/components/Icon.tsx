import type { SVGProps } from 'react'
import type { ReactNode } from 'react'

type IconName =
  | 'leaf' | 'grid' | 'receipt' | 'chart' | 'sparkle' | 'more' | 'calendar'
  | 'moon' | 'sun' | 'bell' | 'plus' | 'arrowUp' | 'arrowDown' | 'wallet'
  | 'search' | 'chevronLeft' | 'chevronRight' | 'arrowLeft' | 'arrowUpRight'
  | 'coffee' | 'car' | 'bag' | 'home' | 'heart' | 'education' | 'close'
  | 'check' | 'clock' | 'creditCard' | 'note' | 'lock'

const paths: Record<IconName, ReactNode> = {
  leaf: <><path d="M20.7 3.3C12.8 2.8 6.7 4.2 4.3 8.6c-2.2 4 .2 8.1 3.8 8.1 4.7 0 7.7-5.8 10.1-9.4-1.6 5.3-5.2 9.3-10.4 11.6" /><path d="M3 21c2.4-4.1 5.4-6.5 9.1-7.5" /></>,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  receipt: <><path d="M5 3.5h14v17l-3.5-2-3.5 2-3.5-2L5 20.5z" /><path d="M8.5 8h7M8.5 12h7" /></>,
  chart: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 6-7" /></>,
  sparkle: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M7.5 3v4M16.5 3v4M3.5 9.5h17" /></>,
  moon: <path d="M20.8 14.2A8.8 8.8 0 0 1 9.8 3.2 8.8 8.8 0 1 0 20.8 14.2Z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  arrowUp: <><path d="M12 19V5m-6 6 6-6 6 6" /></>,
  arrowDown: <><path d="M12 5v14m6-6-6 6-6-6" /></>,
  wallet: <><path d="M4 6.5h15a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h13" /><path d="M21 11h-5a2 2 0 0 0 0 4h5m-5-2h.01" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  arrowLeft: <><path d="m12 19-7-7 7-7" /><path d="M5 12h14" /></>,
  arrowUpRight: <><path d="M7 17 17 7M7 7h10v10" /></>,
  coffee: <><path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M17 10h1a3 3 0 0 1 0 6h-2M9 3v2m4-2v2" /></>,
  car: <><path d="m5 11 1.5-5h11l1.5 5M3 11h18v7H3z" /><path d="M6 18v2m12-2v2M6.5 14h.01M17.5 14h.01" /></>,
  bag: <><path d="M5 8h14l1 13H4z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v12h14V9M9 21v-7h6v7" /></>,
  heart: <path d="M20.8 8.6c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" />,
  education: <><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3.5 3 8.5 3 12 0v-5m4-2v6" /></>,
  close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  creditCard: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18m-14 5h4" /></>,
  note: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8m-8 4h8" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2" /></>,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
