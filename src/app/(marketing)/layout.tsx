import IconDefinitions from "@/components/sections/IconDefinitions";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import SiteEffects from "@/components/SiteEffects1";
import DialogHost from "@/components/DialogHost";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { getPresentationSettings as getSiteSettings } from "@/lib/site-presentation";

export const revalidate = 60;

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="page-progress" aria-hidden="true" />
      <IconDefinitions />
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <div className="pointer-follower" aria-hidden="true">
        <span />
      </div>
      <div className="project-cursor" aria-hidden="true">
        EXPLORE
        <br />↗
      </div>
      <SiteEffects />
      <DialogHost contactEmail={settings.email || undefined} />
      <ChatWidget
        welcomeMessage={settings.chatbotWelcomeMessage || undefined}
      />
    </>
  );
}
