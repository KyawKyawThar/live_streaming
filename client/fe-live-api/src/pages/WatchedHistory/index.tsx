import ApiFetchingError from '@/components/ApiFetchingError';
import EndOfResults from '@/components/EndOfResults';
import InlineLoading from '@/components/InlineLoading';
import NotFoundCentered from '@/components/NotFoundCentered';
import VideoItem from '@/components/VideoItem';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/data/validations';
import useVideosList from '@/hooks/useVideosList';
import LayoutHeading from '@/layouts/LayoutHeading';
import { VideoOff } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const WatchedHistory = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const {
    videos,
    totalItems,
    hasMore,
    isLoading,
    error: isFetchingError,
    refetchVideos,
  } = useVideosList({
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
    is_history: true,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observerRef.current.observe(node); // Observe the last element in the list
    },
    [isLoading, hasMore]
  );

  return (
    <div>
      <div className="md:container lg:px-[10rem] md:mx-auto flex flex-col justify-center gap-4">
        <div className="w-full">
          <LayoutHeading title={`${t('watchHistory.title')} (${totalItems})`} />
        </div>

        <div className="flex flex-col justify-center gap-8 md:gap-4">
          {!isFetchingError &&
            videos.length > 0 &&
            videos.map((video, index) => {
              if (videos.length === index + 1)
                return (
                  <div key={index} ref={lastVideoElementRef}>
                    <VideoItem video={video} />
                  </div>
                );
              else
                return (
                  <div>
                    <VideoItem video={video} />
                  </div>
                );
            })}
        </div>

        {!isFetchingError && !isLoading && !hasMore && videos?.length > 0 && (
          <EndOfResults />
        )}

        {!isFetchingError && isLoading && <InlineLoading />}

        {!isFetchingError && !isLoading && videos.length === 0 && (
          <NotFoundCentered
            Icon={<VideoOff className="text-white" />}
            title={t('watchHistory.NoVideoFound')}
            description={t('watchHistory.TryWithDiffFilters')}
          />
        )}

        {isFetchingError && (
          <ApiFetchingError
            label={t('watchHistory.CannotFetchVideos')}
            isLoading={isLoading}
            onRefetch={refetchVideos}
          />
        )}
      </div>
    </div>
  );
};

export default WatchedHistory;
