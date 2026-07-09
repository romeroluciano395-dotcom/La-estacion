import { getTrips } from "@/services/dashboard.service";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/utils/format";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AdminViajesPage() {
  const trips = await getTrips();

  return (
    <>
      <AdminTopbar title="Viajes" />
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => {
            const occupancy = Math.round(
              ((trip.seatsTotal - trip.seatsAvailable) / trip.seatsTotal) * 100,
            );
            return (
              <Card key={trip.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {CATEGORY_LABELS[trip.category]}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(trip.departureDate)}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-base">{trip.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {trip.origin} → {trip.destination}
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Ocupación</span>
                      <span className="font-medium">{occupancy}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${occupancy}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                    <span className="text-muted-foreground">
                      {trip.seatsAvailable} plazas libres
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(trip.pricePerSeat)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
