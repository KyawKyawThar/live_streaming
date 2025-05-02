import { Button } from '@/components/ui/button';
import { VideoOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  onGoBack: () => void;
}

const ResourcePermissionDeniedOverlay = (props: ComponentProps) => {
  const { t } = useTranslation();
  const { onGoBack } = props;

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-75 z-50 text-white">
      <VideoOff className="w-10 h-10" />
      <h2 className="text-2xl font-bold mb-4 mt-5">
        {t('live.PermissionsDenied')}
      </h2>
      <p className="text-lg mb-6 text-center">
        {t('live.PermissionsDeniedDescription')}
      </p>
      <Button onClick={onGoBack} size="sm" variant="destructive">
        {t('GoBack')}
      </Button>
    </div>
  );
};

export default ResourcePermissionDeniedOverlay;
