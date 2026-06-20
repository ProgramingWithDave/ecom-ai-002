import { ClerkProvider } from "@clerk/nextjs";
import { CartSheet } from "@/components/app/cart/CartSheet";
import { Header } from "@/components/app/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartStoreProvider } from "@/lib/store/cart-store-provider";
import { ChatStoreProvider } from "@/lib/store/chat-store-provider";
import { SanityLive } from "@/sanity/lib/live";
import { ChatSheet } from "@/components/app/chat/ChatSheet";
import { AppShell } from "@/components/app/AppShell";

function layout({ children }: { children: React.ReactNode }) {
  return (

      <CartStoreProvider>
        <ChatStoreProvider>
          <AppShell>

          <Header />

          <main>{children}</main>
          </AppShell>
          <CartSheet />
          <ChatSheet />
          <Toaster position="bottom-center" />
          <SanityLive />
        </ChatStoreProvider>
      </CartStoreProvider>

  );
}

export default layout;
