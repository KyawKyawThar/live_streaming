import {
  User,
  Play,
  ChartNoAxesCombined,
  AudioWaveform,
  Podcast,
} from 'lucide-react';
import { ITEM_INFO } from '@/router';
import { Trans } from 'react-i18next';

export const data = {
  navMain: [
    {
      title: <Trans i18nKey="sidebar.AccountManagement.Title" />,
      icon: User,
      url: '#',
      isActive: true,
      items: [ITEM_INFO.APP_ACCOUNT_LIST_PATH, ITEM_INFO.APP_ACCOUNT_LOG_PATH],
    },
    {
      title: <Trans i18nKey="sidebar.LiveManagement.Title" />,
      icon: Podcast,
      url: '#',
      isActive: true,
      items: [
        ITEM_INFO.APP_UPCOMING_SESSION_PATH,
        ITEM_INFO.APP_LIVE_SESSION_PATH,
        ITEM_INFO.APP_LIVE_CATEGORY_PATH,
      ],
    },
    {
      title: <Trans i18nKey="sidebar.VideoManagement.Title" />,
      icon: Play,
      url: '#',
      isActive: true,
      items: [ITEM_INFO.APP_VIDEO_LIBRARY_PATH],
    },
    {
      title: <Trans i18nKey="sidebar.StatisticsManagement.Title" />,
      icon: ChartNoAxesCombined,
      url: '#',
      isActive: true,
      items: [
        ITEM_INFO.APP_LIVE_STATISTIC_PATH,
        ITEM_INFO.APP_VIDEO_STATISTIC_PATH,
        ITEM_INFO.APP_USER_STATISTICS_PATH,
      ],
    },
  ],
};

export const siteData = {
  name: 'Cloud TV ⚡️',
  description: 'Streaming Hub',
  logo: AudioWaveform,
};
