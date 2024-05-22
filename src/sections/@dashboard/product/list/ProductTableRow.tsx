import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// @types
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { ProductDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  row: ProductDto;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { title, status, view, saleCount, brand, productCategories, createdAt } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [createdDate, setCreatedDate] = useState(new Date(createdAt));
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={fullName} src={avatar} sx={{ mr: 2 }} /> */}
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>

      <TableCell align="left">{saleCount}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {view}
      </TableCell>

      <TableCell align="center">
        <Iconify
          icon={status ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!status && { color: 'warning.main' }),
          }}
        />
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {brand?.title}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {productCategories[0].category?.title}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {createdDate.toDateString()}
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
