'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

 declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;
    console.log("Tracking page view:", url);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
