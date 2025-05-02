import { Link } from 'react-router-dom';
import { PRIVACY_DOCS_PATH, TERMS_OF_SERVICES_DOCS_PATH } from '@/data/route';
import { Trans } from 'react-i18next';

const PrivacyAndTerms = () => {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      <Trans
        i18nKey="privacy.PrivacyAndTerms"
        components={{
          1: (
            <Link
              to={TERMS_OF_SERVICES_DOCS_PATH}
              className="underline underline-offset-4 hover:text-primary"
            ></Link>
          ),
          2: (
            <Link
              to={PRIVACY_DOCS_PATH}
              className="underline underline-offset-4 hover:text-primary"
            ></Link>
          ),
        }}
      />
    </p>
  );
};

export default PrivacyAndTerms;
