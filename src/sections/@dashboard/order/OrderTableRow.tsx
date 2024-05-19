import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, MenuItem } from '@mui/material';
// @types
// components
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import { OrderDto, OrderDtoStatusEnum } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  row: OrderDto;
  selected: boolean;
  onSingleRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onSingleRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const {
    id,
    code,
    status,
    totalPrice,
    address,
    user,
    createdAt,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [date, setDate] = useState(new Date(createdAt));
  console.info(date, createdAt);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const setStatusClass = (status: OrderDtoStatusEnum) => {
    switch (status) {
      case OrderDtoStatusEnum.ACCEPTED:
        return '';
      case OrderDtoStatusEnum.CANCELED:
        return '';
      case OrderDtoStatusEnum.DELIVERED:
        return '';
      case OrderDtoStatusEnum.PAID:
        return '';
      case OrderDtoStatusEnum.PENDING:
        return '';
      case OrderDtoStatusEnum.SENT:
        return '';
    }
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSingleRow} />
      </TableCell>
      <TableCell align="left">{code}</TableCell>
      <TableCell align="left">{totalPrice}</TableCell>
      <TableCell align="left">{status}</TableCell>
      <TableCell align="left">{address?.address}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {user?.fullName}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {date.toDateString()}
      </TableCell>

      {/* <TableCell align="center">
        <Iconify
          icon={isActive ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isActive && { color: 'warning.main' }),
          }}
        />
      </TableCell> */}

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
                  onSingleRow();
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
