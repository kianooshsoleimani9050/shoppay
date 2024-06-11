import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Card, Button, Container, Typography, Box, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import { useGetVendorList } from '../../hooks/query/vendor/useGetVendorList';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CustomDataGrid, QueryType } from '../../components/custom/CustomDataGrid';
import { VendorDto, VendorDtoStatusEnum } from 'src/@types/models';
import { GridActionsCellItem } from '@mui/x-data-grid';
import AxiosApi from 'src/utils/axios';
import moment from 'jalali-moment';
import { useGetSettingBanner } from 'src/hooks/query/setting/useGetSettingBanner';
import { DialogStateType } from 'src/components/custom/CustomDialog';
import SettingNewEditBanner from 'src/sections/@dashboard/setting/SettingNewEditBanner';
import Image from 'src/components/Image';

// ----------------------------------------------------------------------

const SliderImage = ({ iconId, iconName }: any) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    if (!!iconId) {
      AxiosApi.getFileLocalPath(`media/${iconId}`, iconName).then((res) => {
        if (typeof res === 'string') {
          setImage(res);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: 100 }}>
      <Image src={image} alt={image} ratio="1/1" width="100%" height="100%" />
    </Box>
  );
};

export default function SettingBanner() {
  const { themeStretch } = useSettings();

  const { data, isLoading } = useGetSettingBanner();

  const [openFormDialog, setOpenFormDialog] = useState<DialogStateType<{}>>({
    open: false,
  });

  const handleOpenAddDialog = () => {
    setOpenFormDialog({ open: true });
  };

  const handleCloseDialog = () => {
    setOpenFormDialog({ open: false });
  };

  return (
    <>
      <Page title="تنظیمات: بنر" sx={{ height: '100%' }}>
        <Container
          maxWidth={themeStretch ? false : 'lg'}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <HeaderBreadcrumbs
            heading="تنظیمات بنر"
            links={[
              { name: 'داشبورد', href: PATH_DASHBOARD.root },
              { name: 'تنظیمات', href: PATH_DASHBOARD.vendor.root },
              { name: 'بنر' },
            ]}
            action={
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
                onClick={handleOpenAddDialog}
              >
                ساخت بنر
              </Button>
            }
          />
          <Card sx={{ flexGrow: 1 }}>
            {data?.data?.Slider?.map((item) => (
              <Box key={item.id} p={1} px={2}>
                <Typography>
                  {item.title}
                </Typography>
                <SliderImage iconId={item.image}
                  iconName={item.image} />
                <Box>
                  <IconButton
                    color="error"
                    onClick={(e) => {

                    }}
                  >
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Box>
              </Box>
            ))}
            {data?.data?.Square?.map((item) => (
              <Box key={item.id} p={1} px={2}>
                <Typography>
                  {item.title}
                </Typography>
                <SliderImage iconId={item.image}
                  iconName={item.image} />
                <Box>
                  <IconButton
                    color="error"
                    onClick={(e) => {

                    }}
                  >
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Box>
              </Box>
            ))}
            {data?.data?.Wide?.map((item) => (
              <Box key={item.id} p={1} px={2}>
                <Typography>
                  {item.title}
                </Typography>
                <SliderImage iconId={item.image}
                  iconName={item.image} />
                <Box>
                  <IconButton
                    color="error"
                    onClick={(e) => {

                    }}
                  >
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Card>
        </Container>
      </Page>
      <SettingNewEditBanner dialogState={openFormDialog} handleCloseDialog={handleCloseDialog} isEdit={false} />
    </>
  );
}
