import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// @types
import { UserManager } from '../../../../@types/user';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { UserDto } from 'src/@types/models';

// ----------------------------------------------------------------------

type Props = {
  row: UserDto;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme();

  const { fullName, avatar, email, role, isActive, mobile,createdAt, deletedAt } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const [createdDate, setCreatedDate] = useState(new Date(createdAt));
  const [deletedDate, setDeletedDate] = useState(deletedAt && new Date(deletedAt));
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
          {fullName}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {role?.toLowerCase()}
      </TableCell>

      <TableCell align="center">
        <Iconify
          icon={isActive ? 'eva:checkmark-circle-fill' : 'eva:clock-outline'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(!isActive && { color: 'warning.main' }),
          }}
        />
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {mobile}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {createdDate.toDateString()}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {deletedDate.toDateString()}
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
