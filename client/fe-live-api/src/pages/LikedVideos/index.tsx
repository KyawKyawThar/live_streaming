import VideoItem from '@/components/VideoItem';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/data/validations';
import useVideosList from '@/hooks/useVideosList';
import LayoutHeading from '@/layouts/LayoutHeading';
import { useCallback, useRef, useState } from 'react';
import EndOfResults from '../../components/EndOfResults';
import InlineLoading from '@/components/InlineLoading';
import NotFoundCentered from '@/components/NotFoundCentered';
import { Trash2, VideoOff } from 'lucide-react';
import ApiFetchingError from '@/components/ApiFetchingError';
import { StreamsResponse } from '@/data/dto/stream';
import { reactOnVideo } from '@/services/stream';
import { Reaction } from '@/data/chat';
import { toast } from 'sonner';
import { CONTENT_STATUS } from '@/data/types/stream';
import { useTranslation } from 'react-i18next';

const LikedVideos = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);

  const {
    videos,
    totalItems,
    hasMore,
    isLoading,
    error: isFetchingError,
    refetchVideos,
    setVideos,
    setTotalItems,
  } = useVideosList({
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
    is_liked: true,
    status: CONTENT_STATUS.VIDEO,
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

  const handleRemoveFromLikedVideos = async (video: StreamsResponse) => {
    // unlike videos
    const data = await reactOnVideo({
      videoId: video.id,
      likeStatus: false,
      likeType: Reaction.LIKE, // this is unnecessary, because we are removing given reaction
    });
    if (data) {
      setVideos((prev) => {
        const oldVideos = prev;
        const updatedVideos = oldVideos.filter((v) => v.id !== video.id);
        return updatedVideos;
      });
      setTotalItems((prev) => prev - 1);
      toast.success(t('likedVideos.Removed'));
    } else {
      toast.error(t('likedVideos.CannotRemoved'));
    }
  };

  return (
    <div className="md:container lg:px-[10rem] md:mx-auto flex flex-col justify-center gap-4">
      <div className="w-full">
        <LayoutHeading title={`${t('likedVideos.title')} (${totalItems})`} />
      </div>

      <div className="flex flex-col justify-center gap-8 md:gap-4">
        {!isFetchingError &&
          videos.length > 0 &&
          videos.map((video, index) => {
            if (videos.length === index + 1)
              return (
                <div key={index} ref={lastVideoElementRef}>
                  <VideoItem
                    video={video}
                    actions={[
                      {
                        Icon: Trash2,
                        label: t('likedVideos.RemoveFromLikedVideos'),
                        onClick: handleRemoveFromLikedVideos,
                      },
                    ]}
                  />
                </div>
              );
            else
              return (
                <div key={index}>
                  <VideoItem
                    video={video}
                    actions={[
                      {
                        Icon: Trash2,
                        label: t('likedVideos.RemoveFromLikedVideos'),
                        onClick: handleRemoveFromLikedVideos,
                      },
                    ]}
                  />
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
          title={t('likedVideos.NoVideoFound')}
          description={t('likedVideos.LikedVideosWillAppearHere')}
        />
      )}

      {isFetchingError && (
        <ApiFetchingError
          label={t('likedVideos.CannotFetchVideos')}
          isLoading={isLoading}
          onRefetch={refetchVideos}
        />
      )}
    </div>
  );
};

export default LikedVideos;
