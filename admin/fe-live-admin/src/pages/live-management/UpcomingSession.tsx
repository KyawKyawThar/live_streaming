import LivestreamSessions from '@/components/livestream-management/LivestreamSessions.tsx';
import { LIVESTREAM_STATUS } from '@/lib/interface.tsx';
import { useTranslation } from 'react-i18next';

const UpcomingSession = () => {
  const { t } = useTranslation();

  return (
    <>
      <LivestreamSessions
        defaultStatus={[LIVESTREAM_STATUS.UPCOMING]}
        pageTitle={t('sidebar.LiveManagement.UpcomingSession')}
      />
    </>
  );
};

export default UpcomingSession;
