import { useNavigate } from 'react-router-dom';
import { ProfileNavItem } from '@/data/types/ui/profileNavItem';
import { Globe, LogOut, Moon, Settings2, Tv } from 'lucide-react';
import {
  LOGOUT_PATH,
  RESOURCE_ID,
  SETTINGS_PATH,
  STREAMER_PROFILE_PATH,
} from '@/data/route';
import {
  getLoggedInUserInfo,
  invalidateAccount,
} from '@/data/model/userAccount';
import { USER_ROLE } from '@/data/types/role';
import { useTranslation } from 'react-i18next';

export const useProfileNavItems = (): ProfileNavItem[][] => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const currentUser = getLoggedInUserInfo();

  return [
    [
      {
        label: t('Channel'),
        icon: Tv,
        accessRoles: [USER_ROLE.STREAMER],
        action: () =>
          currentUser &&
          currentUser?.id &&
          navigate(STREAMER_PROFILE_PATH.replace(RESOURCE_ID, currentUser.id)),
      },
    ],
    [
      {
        label: t('Settings'),
        icon: Settings2,
        accessRoles: [],
        action: () => {
          navigate(SETTINGS_PATH);
        },
      },
      {
        label: t('Mode'),
        icon: Moon,
        accessRoles: [],
        id: 'theme',
      },
      {
        label: t('Language'),
        icon: Globe,
        accessRoles: [],
        id: 'language',
        action: () => {},
      },
    ],
    [
      {
        label: t('Logout'),
        icon: LogOut,
        accessRoles: [],
        action: () => {
          invalidateAccount();
          navigate(LOGOUT_PATH);
        },
      },
    ],
  ];
};
