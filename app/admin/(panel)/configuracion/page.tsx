import { getSettings } from "@/services/admin.service";
import { SettingsForm } from "@/components/forms/settings-form";

export const metadata = { title: "Configuración" };

export default async function AdminConfiguracionPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Configuración</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Datos de la empresa que se reflejan en el sitio principal.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
