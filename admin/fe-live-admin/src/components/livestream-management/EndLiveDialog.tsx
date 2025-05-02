import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleStop } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { endLivestreamSession } from '@/services/livestream-session.service';
import { useTranslation } from 'react-i18next';

interface EndLiveDialogProps {
  livestreamId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const EndLiveDialog = ({
  livestreamId,
  isOpen,
  onOpenChange,
  onSuccess,
}: EndLiveDialogProps) => {
  const { t } = useTranslation();

  const handleEndLive = async () => {
    try {
      const response = await endLivestreamSession(livestreamId);

      if (response.status === 200) {
        onSuccess();
        toast({
          description: 'Stream ended successfully',
          className: 'bg-toast-success text-white border-toast-success-border',
        });
      } else if (response.status === 202) {
        toast({
          description: 'Stream is already being ended, please wait',
          className: 'bg-toast-success text-white border-toast-success-border',
        });
      }
    } catch (error) {
      toast({
        description: 'Failed to end stream. Please try again!',
        className: 'bg-toast-error text-white border-toast-error-border',
      });
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <CircleStop /> {t('liveSession.EndLive')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-md">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            {t('liveSession.EndLiveDesc1')}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {t('liveSession.EndLiveDesc2')}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('Cancel')}
          </Button>
          <Button variant="destructive" onClick={handleEndLive}>
            {t('liveSession.ConfirmToEnd')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndLiveDialog;
