import { FC, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Spinner } from '../../../../../../_metronic/helpers/components/Spinner';
import { getLiveStream } from '../core/requests';
import { LiveStreamModel } from '../core/models';
interface Props {
  title:string
}
const VedioPlayer: FC<Props>= ({title}) => {
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

  const videoUrl = 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'; // Replace with your DirectShow camera stream URL

  return (
    <>
      {!streamUrl ? (
        <div className='my-4 shadow-lg p-md-6 bg-body rounded'>
          <p className='fs-md-2 fs-sm-4'>{title}</p>
          <ReactPlayer url={videoUrl} controls={true} width={"440px"} height="auto" />
        </div>

      ) : (
        <Spinner />
      )}
    </>
  );
}

export default VedioPlayer;
