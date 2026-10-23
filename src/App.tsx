import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import { QrPickupModal } from './components/QrPickupModal';
import { FairPriceLedgerModal } from './components/FairPriceLedgerModal';
import { CartModal } from './components/CartModal';
import { GuildProfileModal } from './components/GuildProfileModal';

import { BazaarView } from './components/views/BazaarView';
import { StoryView } from './components/views/StoryView';
import { AddCraftView } from './components/views/AddCraftView';
import { OrdersView } from './components/views/OrdersView';

import { CraftItem, FairPriceLedger, ArtisanOrder, Language, AppMode, NavTab } from './types/craft';
import { MOCK_CRAFTS, MOCK_ORDERS, MOCK_LEDGERS } from './data/mockCrafts';
import { audioSystem } from './utils/audioAssistant';

export function App() {
  const [crafts, setCrafts] = useState<CraftItem[]>(MOCK_CRAFTS);
  const [orders, setOrders] = useState<ArtisanOrder[]>(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState<NavTab>('bazaar');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [appMode, setAppMode] = useState<AppMode>('buyer');
  const [audioAssistActive, setAudioAssistActive] = useState<boolean>(false);

  // Modals & Active Selections
  const [selectedStoryCraft, setSelectedStoryCraft] = useState<CraftItem>(MOCK_CRAFTS[0]);
  const [audioModalData, setAudioModalData] = useState<{
    isOpen: boolean;
    title: string;
    kannadaTitle?: string;
    artisanName: string;
    cluster: string;
    storyText: string;
    kannadaStoryText?: string;
    duration?: string;
    avatarUrl?: string;
  }>({
    isOpen: false,
    title: '',
    artisanName: '',
    cluster: '',
    storyText: ''
  });

  const [qrModalOrder, setQrModalOrder] = useState<ArtisanOrder | null>(null);
  const [ledgerModalData, setLedgerModalData] = useState<{ craft: CraftItem; ledger: FairPriceLedger } | null>(null);
  const [cartItems, setCartItems] = useState<CraftItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Tab change handler with audio assist prompt
  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (audioAssistActive) {
      const prompts: Record<NavTab, string> = {
        bazaar: 'ಹಸ್ತಕಾರ ಬಜಾರ್. ಕೈಮಗ್ಗ ಕಸೂತಿ ಮತ್ತು ಕರಕುಶಲ ಮಾಸ್ಟರ್‌ವರ್ಕ್ಸ್‌ಗಳು.',
        story: 'ಕಸೂತಿ ಪರಂಪರೆ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ಬೆಲೆ ವಿವರಣೆ.',
        add: 'ಹೊಸ ಕ್ರಾಫ್ಟ್ ಸೇರಿಸಿ. ಧ್ವನಿಯ ಮೂಲಕ ಮಾತನಾಡಿ.',
        orders: 'ಆದೇಶ ಮತ್ತು ಗಳಿಕೆಗಳ ಲೆಡ್ಜರ್. ಇಂದು ಪ್ಯಾಕ್ ಮಾಡಬೇಕಾದ ಆರ್ಡರ್‌ಗಳು.'
      };
      audioSystem.speakText(prompts[tab], currentLang);
    }
  };

  const handleToggleAudioAssist = () => {
    const nextState = !audioAssistActive;
    setAudioAssistActive(nextState);
    if (nextState) {
      audioSystem.speakText('ಹಸ್ತಕಾರ ಧ್ವನಿ ಸಹಾಯಕ ಸಕ್ರಿಯವಾಗಿದೆ. ನೀವು ಮುಕ್ತವಾಗಿ ಕೇಳಬಹುದು.', currentLang);
    } else {
      audioSystem.stop();
    }
  };

  // Open craft story deep-dive
  const handleOpenStory = (craftId: string) => {
    const item = crafts.find(c => c.id === craftId) || crafts[0];
    setSelectedStoryCraft(item);
    setActiveTab('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Audio Player Modal
  const handleOpenAudioForCraft = (craft: CraftItem) => {
    setAudioModalData({
      isOpen: true,
      title: craft.title,
      kannadaTitle: craft.kannadaTitle,
      artisanName: craft.artisanName,
      cluster: craft.artisanCluster,
      storyText: craft.storySnippet,
      kannadaStoryText: craft.kannadaTitle
        ? `ನಮ್ಮ ${craft.kannadaTitle} ಧ್ವನಿ ಕಥೆ: ${craft.artisanName} ಅವರು ಹಾಡುವ ಹಳೆಯ ಶ್ರಾವಣ ಹಾಡು ಮತ್ತು ಕೈಮಗ್ಗದ ತಂತ್ರಗಳು.`
        : undefined,
      duration: '03:40',
      avatarUrl: craft.artisanAvatar
    });
  };

  // Open generic audio guide (for packing / tracking)
  const handleOpenAudioGuide = (title: string, duration: string, text: string) => {
    setAudioModalData({
      isOpen: true,
      title,
      kannadaTitle: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ',
      artisanName: 'Hastakar Cluster Sahayak',
      cluster: 'Hubballi Dispatch Center',
      storyText: text,
      kannadaStoryText: text,
      duration,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    });
    audioSystem.speakText(text, currentLang);
  };

  // Quick commission to cart
  const handleQuickCommission = (craft: CraftItem) => {
    setCartItems(prev => [...prev, craft]);
    setIsCartOpen(true);
  };

  // View Fair Price Ledger
  const handleViewFairLedger = (craft: CraftItem, ledger: FairPriceLedger) => {
    setLedgerModalData({ craft, ledger });
  };

  // Add new craft from vernacular flow
  const handleCraftAdded = (newCraft: CraftItem) => {
    setCrafts(prev => [newCraft, ...prev]);
  };

  // Confirm order dispatch
  const handleConfirmDispatch = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => o.orderId === orderId ? { ...o, status: 'In Transit', pickupTime: 'Picked up just now' } : o)
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        appMode={appMode}
        onAppModeToggle={setAppMode}
        audioAssistActive={audioAssistActive}
        onToggleAudioAssist={handleToggleAudioAssist}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content View Container */}
      <main style={{ flex: 1 }}>
        {activeTab === 'bazaar' && (
          <BazaarView
            crafts={crafts}
            currentLang={currentLang}
            appMode={appMode}
            onAppModeToggle={setAppMode}
            onOpenStory={handleOpenStory}
            onOpenAudio={handleOpenAudioForCraft}
            onQuickCommission={handleQuickCommission}
            onViewFairLedger={handleViewFairLedger}
          />
        )}

        {activeTab === 'story' && (
          <StoryView
            craft={selectedStoryCraft}
            currentLang={currentLang}
            onOpenAudio={handleOpenAudioForCraft}
            onCommission={handleQuickCommission}
          />
        )}

        {activeTab === 'add' && (
          <AddCraftView
            currentLang={currentLang}
            onCraftAdded={handleCraftAdded}
            onNavigateToBazaar={() => setActiveTab('bazaar')}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersView
            orders={orders}
            currentLang={currentLang}
            onOpenQrPickup={(order) => setQrModalOrder(order)}
            onOpenAudioGuide={handleOpenAudioGuide}
          />
        )}
      </main>

      {/* Fixed Vernacular 4-Tab Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        currentLang={currentLang}
        pendingOrderCount={orders.filter(o => o.status === 'Pack Today').length}
      />

      {/* Modals */}
      <AudioPlayerModal
        isOpen={audioModalData.isOpen}
        onClose={() => setAudioModalData(prev => ({ ...prev, isOpen: false }))}
        title={audioModalData.title}
        kannadaTitle={audioModalData.kannadaTitle}
        artisanName={audioModalData.artisanName}
        cluster={audioModalData.cluster}
        storyText={audioModalData.storyText}
        kannadaStoryText={audioModalData.kannadaStoryText}
        duration={audioModalData.duration}
        avatarUrl={audioModalData.avatarUrl}
      />

      <QrPickupModal
        isOpen={qrModalOrder !== null}
        onClose={() => setQrModalOrder(null)}
        order={qrModalOrder}
        onConfirmDispatch={handleConfirmDispatch}
      />

      <FairPriceLedgerModal
        isOpen={ledgerModalData !== null}
        onClose={() => setLedgerModalData(null)}
        craft={ledgerModalData?.craft || null}
        ledger={ledgerModalData?.ledger || null}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(id) => setCartItems(prev => prev.filter(c => c.id !== id))}
        onClearCart={() => setCartItems([])}
      />

      <GuildProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}

export default App;

