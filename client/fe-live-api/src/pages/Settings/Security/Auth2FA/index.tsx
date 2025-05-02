import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User2FACheckResponse } from '@/data/dto/user';
import { change2FactorAuth, fetch2FactorAuth } from '@/services/user';
import { Check, Ellipsis, Lock, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import User2FASetupModal from './User2FASetupModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NotificationModalProps,
  NotifyModal,
} from '@/components/NotificationModal';
import {
  ConfirmationModalProps,
  ConfirmModal,
} from '@/components/ConfirmationModal';
import { NotifyModalType } from '@/components/UITypes';
import FullscreenLoading from '@/components/FullscreenLoading';
import { useTranslation } from 'react-i18next';

const Auth2FA = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 2fa
  const [user2FactorAuth, setUser2FactorAuth] =
    useState<User2FACheckResponse | null>(null);
  const [isUser2FAModalOpen, setIsUser2FAModalOpen] = useState(false);
  const [notifyModal, setNotifyModal] = useState<NotificationModalProps>({
    type: NotifyModalType.SUCCESS,
    isOpen: false,
    title: '',
    description: '',
  });
  const [confirmModal, setConfirmModal] = useState<ConfirmationModalProps>({
    isDanger: false,
    isOpen: false,
    title: '',
    description: '',
    proceedBtnText: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const handleGenerate2FA = async () => {
    // check first-time ever enabling 2fa
    let auth2FA = await fetch2FactorAuth();

    // if user has disabled 2fa before
    if (auth2FA && !auth2FA?.qr_code) {
      auth2FA = await change2FactorAuth(true); // TODO: this true
    }

    setUser2FactorAuth(auth2FA);
  };

  const handleVerify2FactorAuthSuccess = () => {
    setIsUser2FAModalOpen(false);
    setUser2FactorAuth((prevData) => {
      if (!prevData) return null;

      return {
        ...prevData,
        is2fa_enabled: true,
      };
    });
    openNotifyModal(
      NotifyModalType.SUCCESS,
      t('settings.2FASuccessEnableTitle'),
      t('settings.2FASuccessEnableDescription')
    );
  };

  const handleDisable2FA = () => {
    openConfirmModal(
      t('settings.2FAConfirmDisableTitle'),
      t('settings.2FAConfirmDisableDescription'),
      () => handleDisable2FAConfirmed(),
      true,
      t('ConfirmToDisable')
    );
  };

  const handleDisable2FAConfirmed = async () => {
    setIsLoading(true);
    const auth2FA = await change2FactorAuth(false);
    setIsLoading(false);

    if (auth2FA) {
      setUser2FactorAuth(auth2FA);

      handle2FADisabledSuccess();
    }
  };

  // Shows notify modal
  const handle2FADisabledSuccess = () => {
    openNotifyModal(
      NotifyModalType.SUCCESS,
      t('settings.2FASuccessDisableTitle'),
      t('settings.2FASuccessDisableDescription')
    );
  };

  // Fetch 2FA
  useEffect(() => {
    handleGenerate2FA();
  }, []);

  // Modal dialogs
  const openConfirmModal = (
    title: string,
    description: string | JSX.Element,
    onConfirm: () => void,
    isDanger?: boolean,
    proceedBtnText?: string
  ): void => {
    closeNotifyModal();
    setConfirmModal({
      isDanger,
      title,
      description,
      isOpen: true,
      proceedBtnText,
      onConfirm: () => {
        closeConfirmationModal();
        onConfirm();
      },
      onCancel: closeConfirmationModal,
    });
  };
  const closeConfirmationModal = (): void => {
    setConfirmModal({
      isOpen: false,
      title: '',
      description: '',
      onConfirm: () => {},
      onCancel: () => {},
    });
  };
  const openNotifyModal = (
    type: NotifyModalType,
    title: string,
    description: string | JSX.Element
  ): void => {
    closeConfirmationModal();
    setNotifyModal({
      type,
      title,
      description,
      isOpen: true,
    });
  };
  const closeNotifyModal = (): void => {
    setNotifyModal({
      title: '',
      description: '',
      isOpen: false,
    });
  };

  return (
    <div>
      <div className="mt-10 p-5 border rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="flex items-center gap-2 text-lg md:text-xl font-medium">
            {t('settings.2FATitle')}
            {user2FactorAuth && user2FactorAuth?.is2fa_enabled && (
              <span className="md:hidden bg-green-600 text-white inline-flex rounded-full p-0.5">
                <Check className="h-4 w-4" />
              </span>
            )}
          </h3>
          {user2FactorAuth && user2FactorAuth?.is2fa_enabled && (
            <div className="flex items-center gap-3">
              <div className="hidden md:inline text-green-600 rounded-full text-xs px-2 py-1 border-green-600 border">
                {t('settings.Enabled')}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-8 w-8 p-0" variant="ghost">
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleDisable2FA}
                    className="cursor-pointer"
                  >
                    <X className="text-red-500" />
                    {t('settings.Button2FADisable')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <Separator className="my-3" />

        {user2FactorAuth && user2FactorAuth?.is2fa_enabled && (
          <p className="text-sm text-muted-foreground mt-3">
            {t('settings.2FADescription')}
          </p>
        )}

        {user2FactorAuth && !user2FactorAuth?.is2fa_enabled && (
          <div className="flex flex-col items-center justify-center text-center mt-5">
            <div className="p-2 bg-red-200 dark:bg-red-900 rounded-full">
              <Lock className="h-4 w-4 text-red-500 dark:text-red-300" />
            </div>
            <h3 className="text-lg font-medium">
              {t('settings.2FAAuthNotEnabledYet')}
            </h3>
            <p className="text-sm text-muted-foreground mt-3 max-w-[700px]">
              {t('settings.2FADescription')}
            </p>

            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-800 text-white mt-5"
              onClick={() => {
                setIsUser2FAModalOpen(true);
              }}
            >
              {t('settings.Button2FAEnable')}
            </Button>
            <User2FASetupModal
              isOpen={isUser2FAModalOpen}
              onOpenChange={setIsUser2FAModalOpen}
              data={user2FactorAuth}
              onRegenerate2FA={handleGenerate2FA}
              onVerifySuccess={handleVerify2FactorAuthSuccess}
            />
          </div>
        )}
      </div>

      <NotifyModal
        type={notifyModal.type}
        isOpen={notifyModal.isOpen}
        title={notifyModal.title}
        description={notifyModal.description}
        onClose={closeNotifyModal}
      />
      <ConfirmModal
        isDanger={confirmModal.isDanger}
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        description={confirmModal.description}
        proceedBtnText={confirmModal.proceedBtnText}
        onConfirm={confirmModal.onConfirm}
        onCancel={closeConfirmationModal}
      />

      {isLoading && <FullscreenLoading />}
    </div>
  );
};

export default Auth2FA;
