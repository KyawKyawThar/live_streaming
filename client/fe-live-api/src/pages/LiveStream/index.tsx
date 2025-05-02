import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LIVE_STREAM_SOFTWARE_PATH,
  LIVE_STREAM_WEBCAM_PATH,
} from '@/data/route';
import LayoutHeading from '@/layouts/LayoutHeading';
import { useNavigate } from 'react-router-dom';
import { Blocks, Camera, LucideIcon, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

type StreamOptions = {
  title: string | JSX.Element;
  description: string | JSX.Element;
  Icon: LucideIcon;
  func: () => void;
};

const LiveStream = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const streamOptions: StreamOptions[] = useMemo(
    () => [
      {
        title: t('live.BuiltInWebcam'),
        description: t('live.BuiltInWebcamDescription'),
        Icon: Camera,
        func: () => navigate(LIVE_STREAM_WEBCAM_PATH),
      },
      {
        title: t('live.Software'),
        description: t('live.SoftwareDescription'),
        Icon: Blocks,
        func: () => navigate(LIVE_STREAM_SOFTWARE_PATH),
      },
    ],
    [t, navigate]
  );

  return (
    <div>
      <LayoutHeading title={t('LiveStream')} />

      <div className="flex justify-center items-center">
        <Card className="shadow-none border-none">
          <CardHeader className="px-0 pt-0">
            <CardTitle>{t('GoLive')}</CardTitle>
            <CardDescription>{t('live.PickStreamType')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 px-0">
            {streamOptions.map((opt, index) => (
              <div
                className="flex items-start space-x-4 rounded-md border p-4"
                key={index}
              >
                {<opt.Icon />}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {opt.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {opt.description}
                  </p>
                </div>
                <Button size="sm" onClick={opt.func}>
                  {t('live.Go')} <MoveRight />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveStream;
