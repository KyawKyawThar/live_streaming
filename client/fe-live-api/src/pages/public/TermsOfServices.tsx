import { Button } from '@/components/ui/button';
import { LOGIN_PATH } from '@/data/route';
import { ScrollText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TermsOfServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-3">
        <h1 className="text-2xl text-black font-bold mb-4 flex gap-2 items-center">
          <div className="p-2 bg-primary text-white rounded-full">
            <ScrollText />
          </div>{' '}
          {t('privacy.TermsOfServices')}
        </h1>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo eget nisi tincidunt, vitae aliquet nunc tincidunt.
        </p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo eget nisi tincidunt, vitae aliquet nunc tincidunt.
        </p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          scelerisque leo eget nisi tincidunt, vitae aliquet nunc tincidunt.
        </p>

        <Button
          className="flex justify-center items-center w-full"
          onClick={() => navigate(LOGIN_PATH)}
        >
          {t('logout.ButtonBackToLogin')}
        </Button>
      </div>
    </div>
  );
};

export default TermsOfServices;
