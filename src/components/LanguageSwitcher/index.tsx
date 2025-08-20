'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { setUserLocale } from 'src/i18n/locale';

import { locales } from '../../i18n/request';

export function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();

  const locale = useLocale();

  return (
    <div className="language-switcher">
      {locales.map((lang) => (
        <button
          disabled={isPending}
          key={lang}
          onClick={() => {
            startTransition(() => {
              setUserLocale(lang);
            });
          }}
          className={`language-btn ${locale === lang ? 'active' : ''}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
