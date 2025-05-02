import { Link } from 'react-router-dom';
import { CheckCheck, CircleHelp, ExternalLink, Radio } from 'lucide-react';
import TooltipComponent from '@/components/TooltipComponent';
import { useTranslation } from 'react-i18next';

const SetupGuideContent = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-2 border rounded-md p-3">
      <ol className="list-decimal pl-5 space-y-4 leading-loose">
        <li>
          <div className="flex gap-2">
            {t('live.SoftwareSetup1')}{' '}
            <Link
              to="https://obsproject.com/download"
              target="_blank"
              className="inline"
            >
              <div className="hover:underline underline-offset-4 text-primary flex items-center gap-1">
                OBS <ExternalLink className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            {t('live.SoftwareSetup2_1')}{' '}
            <div className="rounded-full mx-2 bg-primary text-white flex gap-2 items-center px-2 py-1.5 text-xs">
              <Radio className="w-4 h-4" /> {t('live.StartStream')}
            </div>{' '}
            {t('live.SoftwareSetup2_2')}
          </div>
        </li>
        <li>
          {t('live.SoftwareSetup3_1')}
          <TooltipComponent
            align="center"
            text="stream server: starts with rtmp://..."
            children={<CircleHelp className="w-4 h-4 inline ml-1" />}
          />{' '}
          {t('live.SoftwareSetup3_2')}
          <TooltipComponent
            align="center"
            text="stream key: a 48-character-random string"
            children={<CircleHelp className="w-4 h-4 inline ml-1" />}
          />{' '}
          {t('live.SoftwareSetup3_3')}
        </li>
        <li>{t('live.SoftwareSetup3_4')}</li>
      </ol>
      <div className="mt-5 pt-3 text-green-600 border-t flex gap-2 items-start">
        <CheckCheck className="w-4 h-4" /> {t('live.SoftwareSetup4')}
      </div>
    </div>
  );
};

export default SetupGuideContent;
