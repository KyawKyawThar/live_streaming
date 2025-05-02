import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  label?: string;
  isLoading: boolean;
  onRefetch: () => void;
}

const ApiFetchingError = (props: ComponentProps) => {
  const { t } = useTranslation();

  const { label = t('feed.CannotFetchVideos'), isLoading, onRefetch } = props;

  return (
    <div className="child-center">
      <div className="flex flex-col justify-center items-center space-y-3 text-center">
        <div className="bg-red-200 dark:bg-red-800 p-2 rounded-full">
          <AlertCircle className="text-red-500" />
        </div>
        <p className="text-base font-medium">{label}</p>
        <Button variant="outline" onClick={onRefetch}>
          <RotateCw className="w-4 h-4" />
          {isLoading ? t('Retrying') + `...` : t('Retry')}
        </Button>
      </div>
    </div>
  );
};

export default ApiFetchingError;
