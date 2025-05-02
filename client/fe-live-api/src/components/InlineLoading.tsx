import { useTranslation } from 'react-i18next';
import LoadingIndicator from './LoadingIndicator';

const InlineLoading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center">
      <span className="flex gap-1 items-center bg-secondary text-center mt-4 text-white text-xs px-3 py-1 rounded-full">
        <LoadingIndicator /> {t('Loading')}...
      </span>
    </div>
  );
};

export default InlineLoading;
