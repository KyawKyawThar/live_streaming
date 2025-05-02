import { SUPPORT_LANGUAGES } from '@/lib/constants';
import { changeLanguage } from '@/lib/i18n';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = ({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { i18n } = useTranslation();

  const _changeLanguage = (lng: string) => {
    changeLanguage(lng);
    onClose(false);
  };

  return (
    <div>
      {Object.values(SUPPORT_LANGUAGES).map((language) => (
        <LanguageItem
          key={language.value}
          label={language.label}
          value={language.value}
          FlagIcon={<img src={language.flag} alt={language.value} />}
          isCurrentLang={i18n.language === language.value}
          changeLanguage={() => _changeLanguage(language.value)}
        />
      ))}
    </div>
  );
};

const LanguageItem = ({
  label,
  value,
  isCurrentLang,
  FlagIcon,
  changeLanguage,
}: {
  label: string;
  value: string;
  isCurrentLang: boolean;
  FlagIcon: React.ReactNode;
  changeLanguage: (lang: string) => void;
}) => {
  return (
    <div className="flex justify-between items-center px-4 hover:bg-gray-100 dark:hover:bg-gray-800">
      <div
        className="w-full text-left py-2.5 cursor-pointer text-sm flex gap-2 items-center"
        onClick={() => changeLanguage(value)}
      >
        {FlagIcon} {label}
      </div>

      {isCurrentLang && <Check size="16" />}
    </div>
  );
};
