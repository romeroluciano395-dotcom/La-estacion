import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsappFloating } from "@/components/shared/whatsapp-button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* pt compensa la navbar fija */}
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
      <WhatsappFloating />
    </div>
  );
}
