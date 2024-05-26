import { useEffect, useState } from 'react';
// @mui
import { Box, } from '@mui/material';
//
import AxiosApi from 'src/utils/axios';

// ----------------------------------------------------------------------

interface Props {
  imageId: string;
}

export default function ImageField({ imageId }: Props) {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    AxiosApi.getImage(imageId).then((res) => {
      console.info(res)
      // setImage()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {image && (<img src={image} alt='icon'/>)}
      </Box>
    </>
  );
}
