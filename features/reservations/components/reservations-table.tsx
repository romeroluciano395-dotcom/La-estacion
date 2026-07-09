import type { Reservation } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PaymentStatusBadge,
  ReservationStatusBadge,
} from "./status-badge";

export function ReservationsTable({
  reservations,
}: {
  reservations: Reservation[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Pasajero</TableHead>
          <TableHead>Servicio</TableHead>
          <TableHead>Salida</TableHead>
          <TableHead className="text-center">Plazas</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Pago</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((r) => (
          <TableRow key={r.id}>
            <TableCell className="font-mono text-xs font-medium">
              {r.code}
            </TableCell>
            <TableCell>
              <div className="font-medium">{r.passengerName}</div>
              <div className="text-xs text-muted-foreground">
                {r.passengerEmail}
              </div>
            </TableCell>
            <TableCell>{CATEGORY_LABELS[r.category]}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(r.departureDate)}
            </TableCell>
            <TableCell className="text-center">{r.seats}</TableCell>
            <TableCell>
              <ReservationStatusBadge status={r.status} />
            </TableCell>
            <TableCell>
              <PaymentStatusBadge status={r.paymentStatus} />
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(r.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
