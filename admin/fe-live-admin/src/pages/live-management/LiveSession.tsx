import LivestreamSessions from '@/components/livestream-management/LivestreamSessions.tsx';
import { LIVESTREAM_STATUS } from '@/lib/interface.tsx';
import { useTranslation } from 'react-i18next';

const LiveSession = () => {
  const { t } = useTranslation();

  return (
    <>
      <LivestreamSessions
        defaultStatus={[LIVESTREAM_STATUS.STARTED]}
        pageTitle={t('sidebar.LiveManagement.LiveSession')}
      />
    </>
  );
};

export default LiveSession;
