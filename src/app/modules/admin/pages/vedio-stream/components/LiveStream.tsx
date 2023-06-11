import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Spinner } from '../../../../../../_metronic/helpers/components/Spinner';
import { getLiveStream } from '../core/requests';
import { LiveStreamModel } from '../core/models';
const VedioPlayer: FC = () => {
  const [streamUrl, setStreamUrl] = useState<string>(null);
  const [authentication, setAuthentication] = useState<string>(null);

  useEffect(() => {
    getLiveStream().then((res: LiveStreamModel) => {
      if (!res.code) {
        setStreamUrl(res.data.url);
        setAuthentication(res.data.authentication)
      }
      else {

      }
    })
  }, [])

  const videoUrl = 'http://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)'; // Replace with your DirectShow camera stream URL

  return (
    <div>
      {!streamUrl ? (
        <ReactPlayer url={videoUrl} controls={true} width="100%" height="auto" />
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default VedioPlayer;
