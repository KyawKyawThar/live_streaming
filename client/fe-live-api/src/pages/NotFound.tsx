import { Button } from '@/components/ui/button';
import { FEED_PATH } from '@/data/route';
import { SquarePlay } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleGoBackToHome = () => {
    navigate(FEED_PATH);
  };

  return (
    <div className="child-center w-full">
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="flex flex-col items-center select-none">
          <h1 className="font-mono text-8xl text-slate-400">404</h1>
          <h1 className="mb-1 text-xl font-semibold">{t('404Title')}</h1>
          <span className="text-slate-500 text-center">{t('404Desc')}</span>
          <Button className="mt-5" onClick={handleGoBackToHome}>
            <SquarePlay /> {t('WatchVideos')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
