import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, MenuItem } from '@mui/material';
// @types
// components
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import { VendorDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  row: VendorDto;
  selected: boolean;
  onSingleRow: VoidFunction;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function VendorTableRow({
  row,
  selected,
  onSingleRow,
  onEditRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const {
    id,
    balance = 0,
    category,
    user,
    createdAt,
    mobile,
    status,
    title,
    telephone,
    } = row;

    console.info(balance,
      createdAt,
      mobile,
      status,
      title,
      telephone,)

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [date, setDate] = useState(new Date(createdAt));
  console.info(date, createdAt);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSingleRow} />
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {title}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {user?.fullName}
      </TableCell>
      <TableCell align="left">{category.title}</TableCell>
      <TableCell align="left">{balance}</TableCell>
      <TableCell align="left">{mobile}</TableCell>
      <TableCell align="left">{telephone}</TableCell>
      <TableCell align="left">{status}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {date.toDateString()}
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
