import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export function ModeSwitcher({ label }: { label: string }) {
  const { t } = useTranslation();

  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="flex justify-start items-center gap-2 w-full"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <>
          <MoonIcon className="w-4 h-4" /> {t('Dark')}
        </>
      ) : (
        <>
          <SunIcon className="w-4 h-4" /> {t('Light')}
        </>
      )}{' '}
      {label}
    </div>
  );
}
