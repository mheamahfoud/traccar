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


  return (
    <div>
      {streamUrl ? (
        <ReactPlayer
          url={streamUrl}
          playing
          controls
          width="640px"
          height="360px"
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                crossOrigin: 'anonymous',
                // Add the authentication information as a parameter
                src: `${streamUrl}?auth=${encodeURIComponent(authentication)}`,
              },
            },
          }}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default VedioPlayer;
