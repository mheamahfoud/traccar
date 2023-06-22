import { FC, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Spinner } from '../../../../../../_metronic/helpers/components/Spinner';
import { getLiveStream } from '../core/requests';
import { LiveStreamModel } from '../core/models';
import IconButton from '../../../../../../_metronic/helpers/components/buttons/iconButton';
import PlayButton from '../../../../../../_metronic/helpers/components/buttons/playButton';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import React from 'react';

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
  const [value, setValue] = React.useState(30);
  const [voulme, setVolume] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
    setVolume(newValue / 100);
  };
  return (
    <>
      {!streamUrl ? (
        <div className='d-flex flex-column position-relative w-100 my-1' style={{ padding: '0 2px' }}>
          <div className='shadow  bg-body'>
            <ReactPlayer ref={playerRef} url={videoUrl} controls={false} width={'100%'} height="auto" playing={playing} volume={voulme} />

          </div>
          <div className='d-flex p-2 align-items-center' style={{ background: 'black' }}>
            {!playing && <PlayButton
              onClick={() => {
                setPlaying(true)
              }}
            >
              <i className='bi bi-play fs-2' style={{ color: 'gray' }} />
            </PlayButton>}
            {playing && <PlayButton
              onClick={() => {
                setPlaying(false)
              }}
            >
              <i className='bi bi-pause fs-2' style={{ color: 'white' }} />
            </PlayButton>}

            <div  style={{color:'gray'}} className=' d-flex align-items-center w-50 mx-2'>
              <VolumeDown />
              <Slider aria-label="Volume" value={value} onChange={handleChange} max={100} min={0}  style={{color:'gray'}} />
              <VolumeUp />
            </div>
          </div>
        </div>

      ) : (
        <Spinner />
      )}
    </>
  );
}

export default VedioPlayer;
