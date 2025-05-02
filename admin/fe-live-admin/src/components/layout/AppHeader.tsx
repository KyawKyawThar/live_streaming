import MyProfile from '@/components/layout/MyProfile.tsx';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
const AppHeader = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    window.location.reload();
  };
  return (
    <header className="flex sticky top-0 bg-sidebar h-[3rem] shrink-0 items-center gap-2 border-b px-4">
      <div className="w-full items-center px-4 py-2 flex">
        <div className="flex gap-2">
          {i18n.language == 'cn' ? (
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={() => changeLanguage('en')}
            >
              {t('EN')}
            </Button>
          ) : (
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={() => changeLanguage('cn')}
            >
              {t('CN')}
            </Button>
          )}
        </div>
        <div className="flex justify-end space-x-4 ml-auto">
          <MyProfile />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
