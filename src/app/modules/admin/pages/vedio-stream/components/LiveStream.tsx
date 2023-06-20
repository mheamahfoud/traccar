import { FC, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Spinner } from '../../../../../../_metronic/helpers/components/Spinner';
import { getLiveStream } from '../core/requests';
import { LiveStreamModel } from '../core/models';
import IconButton from '../../../../../../_metronic/helpers/components/buttons/iconButton';
import PlayButton from '../../../../../../_metronic/helpers/components/buttons/playButton';


interface Props {
  title: string
}
const VedioPlayer: FC<Props> = ({ title }) => {
  const [streamUrl, setStreamUrl] = useState<string>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  // useEffect(() => {
  //   getLiveStream().then((res: LiveStreamModel) => {
  //     alert(JSON.stringify(res))
  //     if (!res.code) {

  //       // setStreamUrl(res.data.url);
  //       // setAuthentication(res.data.authentication)
  //     }
  //     else {

  //     }
  //   })
  // }, [])
  const playerRef = useRef(null);
  const videoUrl = 'https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8'; // Replace with your DirectShow camera stream URL

  return (
    <>
      {!streamUrl ? (
        <div className='d-flex flex-column position-relative w-100 my-1' style={{ padding: '0 2px' }}>
          <div className='shadow  bg-body'>
            <ReactPlayer ref={playerRef} url={videoUrl} controls={false} width={'100%'} height="auto" playing={playing} />

          </div>
          <div className='d-flex p-2' style={{ background: 'black' }}>
            {!playing && <PlayButton
              onClick={() => {
                setPlaying(true)
              }}
            >
              <i className='bi bi-play fs-2' style={{ color: 'white' }} />
            </PlayButton>}
            {playing && <PlayButton
              onClick={() => {
                setPlaying(false)
              }}
            >
              <i className='bi bi-pause fs-2' style={{ color: 'white' }} />
            </PlayButton>}
          </div>
        </div>

      ) : (
        <Spinner />
      )}
    </>
  );
}

export default VedioPlayer;
