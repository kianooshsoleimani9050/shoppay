import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';
import { OrderDto, OrderDtoStatusEnum } from 'src/@types/models';

// ----------------------------------------------------------------------

type RowProps = {
  id: string;
  category: string;
  price: number;
  status: string;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: OrderDto[];
  tableLabels: any;
}

export default function AppNewInvoice({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <AppNewInvoiceRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: OrderDto;
};

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
  const theme = useTheme();

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  return (
    <TableRow>
      <TableCell>{row.code}</TableCell>

      <TableCell>{row.commission}</TableCell>

      <TableCell>{row.totalPrice}</TableCell>

      <TableCell>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (row.status === OrderDtoStatusEnum.PENDING && 'warning') ||
            (row.status === OrderDtoStatusEnum.ACCEPTED && 'success') ||
            'error'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
