import { Button } from '@/components/ui/button';
import { STREAM_TYPE } from '@/data/types/stream';
import { Ban, CircleSlash, Mic, MicOff, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  isStartStreamBtnVisible?: boolean;
  type: STREAM_TYPE;
  isMicOn?: boolean;
  isStreamStarted: boolean;
  onToggleMic?: () => void;
  onEndStream: () => void;
  onInitializeStreamModalOpen: () => void;
  onInitializeStreamCancel: () => void;
}

const ControlButtons = (props: ComponentProps) => {
  const { t } = useTranslation();

  const {
    isStartStreamBtnVisible = true,
    type,
    isMicOn,
    isStreamStarted,
    onToggleMic,
    onEndStream,
    onInitializeStreamModalOpen,
    onInitializeStreamCancel,
  } = props;

  return (
    <div className="flex gap-2">
      {type === STREAM_TYPE.CAMERA && (
        <Button
          onClick={() => {
            if (onToggleMic) onToggleMic();
          }}
          variant="ghost"
          size="sm"
          className="rounded-full px-2.5"
        >
          {isMicOn ? <Mic /> : <MicOff />}
        </Button>
      )}
      {isStreamStarted ? (
        <Button
          size="sm"
          variant="destructive"
          className="rounded-full"
          onClick={onEndStream}
        >
          <CircleSlash />{' '}
          <span className="hidden md:inline">{t('live.EndStream')}</span>
        </Button>
      ) : (
        <div className="flex gap-2">
          {isStartStreamBtnVisible && (
            <Button
              size="sm"
              className="rounded-full"
              onClick={onInitializeStreamModalOpen}
            >
              <Radio /> {t('live.StartStream')}
            </Button>
          )}
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full"
            onClick={onInitializeStreamCancel}
          >
            <Ban /> {t('Cancel')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ControlButtons;
