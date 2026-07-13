import ExcelJS from "exceljs";

import { auth } from "@/auth";
import { getReservas } from "@/services/admin.service";
import { RESERVA_ESTADO_META } from "@/components/reservations/reserva-status-badge";

/** Exporta todas las reservas a un archivo Excel (.xlsx). Solo autenticados. */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return new Response("No autorizado", { status: 401 });
  }

  const reservas = await getReservas();

  const wb = new ExcelJS.Workbook();
  wb.creator = "La Estación";
  const ws = wb.addWorksheet("Reservas");

  ws.columns = [
    { header: "ID", key: "id", width: 16 },
    { header: "Nombre", key: "nombre", width: 18 },
    { header: "Apellido", key: "apellido", width: 18 },
    { header: "DNI", key: "dni", width: 14 },
    { header: "Teléfono", key: "telefono", width: 18 },
    { header: "Correo", key: "email", width: 28 },
    { header: "Evento", key: "evento", width: 32 },
    { header: "Ciudad", key: "ciudad", width: 18 },
    { header: "Cantidad", key: "cantidad", width: 10 },
    { header: "Estado", key: "estado", width: 14 },
    { header: "Fecha reserva", key: "fecha", width: 16 },
    { header: "Observaciones", key: "obs", width: 40 },
  ];
  ws.getRow(1).font = { bold: true };

  for (const r of reservas) {
    ws.addRow({
      id: r.id.slice(-8).toUpperCase(),
      nombre: r.nombre,
      apellido: r.apellido,
      dni: r.dni,
      telefono: r.telefono,
      email: r.email,
      evento: r.eventoNombre,
      ciudad: r.eventoCiudad,
      cantidad: r.cantidadPasajeros,
      estado: RESERVA_ESTADO_META[r.estado].label,
      fecha: new Date(r.createdAt).toLocaleDateString("es-AR"),
      obs: r.observaciones,
    });
  }

  const buffer = await wb.xlsx.writeBuffer();
  const filename = `reservas-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(buffer as ArrayBuffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
