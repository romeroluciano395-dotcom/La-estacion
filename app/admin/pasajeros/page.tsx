import { getPassengers } from "@/services/dashboard.service";
import { formatDate } from "@/lib/utils";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminPasajerosPage() {
  const passengers = await getPassengers();

  return (
    <>
      <AdminTopbar title="Pasajeros" />
      <div className="flex-1 space-y-6 p-6">
        <p className="text-sm text-muted-foreground">
          {passengers.length} pasajeros registrados.
        </p>
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Alta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passengers.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {p.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <span className="font-medium">{p.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {p.email}
                    </TableCell>
                    <TableCell className="text-sm">{p.phone}</TableCell>
                    <TableCell className="text-sm">{p.document}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(p.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
