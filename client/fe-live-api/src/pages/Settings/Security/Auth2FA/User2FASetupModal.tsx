import FormErrorMessage from '@/components/FormErrorMsg';
import RequiredInput from '@/components/RequiredInput';
import { Button } from '@/components/ui/button';
import {
  DrawerModal,
  DrawerModalContent,
  DrawerModalDescription,
  DrawerModalHeader,
  DrawerModalTitle,
} from '@/components/ui/drawer-modal';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User2FACheckResponse } from '@/data/dto/user';
import { verity2FactorAuthWithOTP, Verity2FAError } from '@/services/user';
import { RotateCw, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AUTH2FA_OTP_LENGTH } from '@/data/validations';
import logger from '@/lib/logger';
import { Trans, useTranslation } from 'react-i18next';

type User2FAFormError = {
  actionFailure: boolean;
  codeToVerifyFailure: boolean;
};

interface ComponentProps {
  isOpen: boolean;
  data: User2FACheckResponse;
  onOpenChange: (value: boolean) => void;
  onRegenerate2FA: () => void;
  onVerifySuccess: () => void;
}

const User2FASetupModal = (props: ComponentProps) => {
  const { t } = useTranslation();

  const {
    data: twoFAData,
    isOpen,
    onOpenChange,
    onRegenerate2FA,
    onVerifySuccess,
  } = props;

  const [codeToVerifyInput, setCodeToVerifyInput] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<User2FAFormError>({
    actionFailure: false,
    codeToVerifyFailure: false,
  });

  const onCodeSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();

    setIsLoading(true);
    const codeToVerify = codeToVerifyInput || '';

    const { data, errors: _errors } = await verity2FactorAuthWithOTP(
      codeToVerify
    );
    setIsLoading(false);

    if (data && data?.is_verified) {
      onVerifySuccess();
    } else {
      if (_errors) {
        const formError: User2FAFormError = {
          codeToVerifyFailure: _errors?.[Verity2FAError.INVALID_OTP] || false,
          actionFailure: _errors?.[Verity2FAError.ACTION_FAILURE] || false,
        };

        const { codeToVerifyFailure } = formError;
        setFormError((prevError: User2FAFormError) => ({
          ...prevError,
          codeToVerifyFailure,
        }));
      }
    }
  };

  const handleCopySetupKeyToClipboard = async () => {
    if (twoFAData && twoFAData.secret) {
      try {
        await navigator.clipboard.writeText(twoFAData.secret);
        toast.success(t('settings.CopiedSetupKey'));
      } catch (error) {
        logger.error('Failed to copy:', error);
        toast.error(t('settings.CannotCopySetupKey'));
      }
    }
  };

  const handleModalOpenChange = (value: boolean) => {
    setCodeToVerifyInput('');
    setFormError({
      actionFailure: false,
      codeToVerifyFailure: false,
    });

    onOpenChange(value);
  };

  const { actionFailure, codeToVerifyFailure } = formError;
  let invalidCodeError = null,
    somethingWrongError = null;
  if (codeToVerifyFailure)
    invalidCodeError = <div>{t('settings.InvalidOTPCode')}</div>;
  if (actionFailure) {
    somethingWrongError = <div>{t('CommonError')}</div>;
    invalidCodeError = '';
  }

  return (
    <DrawerModal open={isOpen} onOpenChange={handleModalOpenChange}>
      <DrawerModalContent className="sm:max-w-[768px] space-y-2 px-5 pb-5 p-0">
        <DrawerModalHeader>
          <DrawerModalTitle className="text-center md:text-left">
            <div className="flex gap-2 justify-start items-center px-2 md:px-7 py-2 pt-4">
              <Smartphone />
              {t('settings.2FAModalTitle')}
            </div>
          </DrawerModalTitle>
          <Separator className="hidden md:block" />
          <DrawerModalDescription className="px-2 md:px-7 text-left">
            {t('settings.2FAModalDescription')}
          </DrawerModalDescription>
        </DrawerModalHeader>

        <div className="py-0 px-7">
          <p className="text-md font-medium">{t('settings.2FAScanQR')}</p>
          <p className="text-sm text-muted-foreground">
            {t('settings.2FAScanQR')}
          </p>
          {twoFAData?.qr_code ? (
            <img
              src={`data:image/png;base64,${twoFAData?.qr_code}`}
              alt="QR Code"
              className="border w-[200px] h-[200px] rounded-sm mt-3"
            />
          ) : (
            <div className="w-[200px] h-[200px] rounded-sm mt-3 border border-dashed flex flex-col justify-center items-center text-center text-sm">
              {t('settings.ErrorGettingQRCode')} <br />
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  onRegenerate2FA();
                }}
              >
                <RotateCw className="h-3 w-3" /> {t('Regenerate')}
              </Button>
            </div>
          )}

          {twoFAData?.qr_code && (
            <p className="text-sm text-muted-foreground mt-5">
              <Trans
                i18nKey="settings.UnableToScan"
                components={{
                  1: (
                    <span
                      onClick={handleCopySetupKeyToClipboard}
                      className="text-blue-500 underline underline-offset-4 hover:cursor-pointer"
                      title={t('ClickToCopy')}
                    />
                  ),
                }}
              />
            </p>
          )}
        </div>

        <form onSubmit={onCodeSubmit} className="py-0 px-7 pb-5">
          <Label htmlFor="code">
            {t('settings.VerifyDescription')} <RequiredInput />
          </Label>
          <InputOTP
            maxLength={AUTH2FA_OTP_LENGTH}
            pattern={REGEXP_ONLY_DIGITS}
            value={codeToVerifyInput}
            onChange={(value) => setCodeToVerifyInput(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {invalidCodeError && (
            <FormErrorMessage classes="mt-1" message={invalidCodeError} />
          )}
          {somethingWrongError && (
            <FormErrorMessage classes="mt-1" message={somethingWrongError} />
          )}

          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              disabled={
                codeToVerifyInput?.length !== AUTH2FA_OTP_LENGTH || isLoading
              }
            >
              {isLoading
                ? t('settings.ButtonVerifying')
                : t('settings.ButtonVerify')}
            </Button>
            <Button variant="secondary">{t('Cancel')}</Button>
          </div>
        </form>
      </DrawerModalContent>
    </DrawerModal>
  );
};

export default User2FASetupModal;
