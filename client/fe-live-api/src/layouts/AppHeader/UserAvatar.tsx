import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { ModeSwitcher } from '@/components/ModeSwitcher';
import { getLoggedInUserInfo } from '@/data/model/userAccount';
import { useProfileNavItems } from '@/hooks/useProfileNavItems';
import { EVENT_EMITTER_NAME, EventEmitter } from '@/lib/event-emitter';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { USER_ROLE } from '@/data/types/role';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const UserAvatar = React.memo(() => {
  const { t } = useTranslation();

  const currentUser = getLoggedInUserInfo();
  const profileNavItems = useProfileNavItems();

  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const [user, setUser] = useState<{
    username: string;
    displayName: string;
    avatarUrl: string;
  }>({
    username: currentUser.username || 'unknown',
    displayName: currentUser.display_name || 'Unknown',
    avatarUrl: currentUser.avatar_file_name || '',
  });

  const handleAccountChange = () => {
    const updatedUser = getLoggedInUserInfo();
    if (updatedUser) {
      setUser({
        username: updatedUser.username || 'unknown',
        displayName: updatedUser.display_name || 'Unknown',
        avatarUrl: updatedUser.avatar_file_name || '',
      });
    }
  };

  useEffect(() => {
    EventEmitter.subscribe(
      EVENT_EMITTER_NAME.USER_PROFILE_UPDATE,
      handleAccountChange
    );

    return () => {
      EventEmitter.unsubscribe(
        EVENT_EMITTER_NAME.USER_PROFILE_UPDATE,
        handleAccountChange
      );
    };
  }, []);

  useEffect(() => {
    setShowLanguages(false);
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback className="uppercase">
            {user?.displayName[0] || 'NA'}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 overflow-hidden rounded-lg p-0"
        align="end"
      >
        <div className="flex flex-col">
          <div className="flex gap-2 items-center justify-start py-3 pb-2 px-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="uppercase">
                {user?.displayName[0] || 'NA'}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <p className="text-sm">{user?.displayName}</p>
              <p className="text-xs -mt-1">@{user?.username}</p>
            </div>
          </div>
          <Separator />
          {showLanguages ? (
            // Show language options
            <div className="border-b last:border-none pt-0">
              <div
                className="w-full text-left px-4 pl-2 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2 italic text-muted-foreground text-xs"
                onClick={() => setShowLanguages(false)}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('ChooseYourLanguage')}</span>
              </div>
              <LanguageSwitcher onClose={setIsOpen} />
            </div>
          ) : (
            // Show default menu items
            profileNavItems.map((group, index) => {
              if (
                group.length === 1 &&
                group[0].accessRoles.length !== 0 &&
                !group[0].accessRoles.includes(
                  currentUser.role_type as USER_ROLE
                )
              )
                return;

              return (
                <div key={index} className="border-b last:border-none pt-0">
                  <div className="gap-0">
                    {group.map((item) => {
                      if (
                        item.accessRoles.length === 0 ||
                        item.accessRoles.includes(
                          currentUser.role_type as USER_ROLE
                        )
                      )
                        return (
                          <div
                            key={item.label}
                            className="w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm"
                            onClick={
                              item?.id === 'language'
                                ? () => setShowLanguages(true)
                                : item?.action
                            }
                          >
                            {item?.id === 'theme' ? (
                              <ModeSwitcher label={item.label} />
                            ) : item?.id === 'language' ? (
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <item.icon className="w-4 h-4" />{' '}
                                  <span>{item.label}</span>
                                </div>
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4" />{' '}
                                <span>{item.label}</span>
                              </div>
                            )}
                          </div>
                        );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
});

export default UserAvatar;
