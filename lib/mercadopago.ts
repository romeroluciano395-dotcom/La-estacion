/**
 * Capa de integración con MercadoPago.
 *
 * Aislada del resto de la app para poder reemplazar el mock por el SDK
 * real (`mercadopago`) sin tocar la UI ni los services. Cuando se
 * configure MP_ACCESS_TOKEN, implementar `createPreference` con el SDK.
 */

export interface PreferenceItem {
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface PreferenceResult {
  id: string;
  initPoint: string;
}

export async function createPreference(
  items: PreferenceItem[],
  metadata: Record<string, string>,
): Promise<PreferenceResult> {
  const total = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);

  // TODO: reemplazar por el SDK real de MercadoPago.
  // const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });
  // const preference = await new Preference(client).create({ body: { items, metadata } });

  return {
    id: `pref_${Date.now()}`,
    initPoint: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=demo_${total}`,
  };
}
