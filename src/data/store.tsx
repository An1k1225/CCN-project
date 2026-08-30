import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChatConversation,
  ListingItem,
  SearchFilter,
  SortBy,
  TradeOffer,
  TradeType,
  UserProfile,
  UserStats,
} from "@/models/types";
import {
  defaultSearchFilter,
  defaultUserProfile,
  defaultUserStats,
  initialConversations,
  initialListings,
  initialRecentSearches,
  initialTradeOffers,
} from "@/data/sample-data";

let idCounter = 0;
const uid = (prefix: string) =>
  `${prefix}_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;

function capitalizeWords(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function filterListings(
  listings: ListingItem[],
  filter: SearchFilter,
  favorites: Set<string>
): ListingItem[] {
  const query = filter.query.toLowerCase();
  return listings
    .filter((item) => {
      const matchesQuery =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      const cat = filter.category?.toLowerCase();
      const matchesCategory =
        !cat ||
        item.category.toLowerCase() === cat ||
        (cat === "verified" && item.isVerifiedTrader);

      const brand = filter.brand?.toLowerCase();
      const matchesBrand = !brand || item.brand.toLowerCase().includes(brand);

      const condition = filter.condition?.toLowerCase();
      const matchesCondition =
        !condition || item.condition.toLowerCase() === condition;

      const matchesTradeType =
        filter.tradeType === null || item.tradeType === filter.tradeType;

      const matchesPrice =
        item.estimatedPrice >= filter.minPrice &&
        item.estimatedPrice <= filter.maxPrice;

      const matchesDistance = item.distanceMiles <= filter.maxDistanceMiles;

      const matchesInStock =
        !filter.onlyInStock || (item.inStock && item.inventoryCount > 0);

      const matchesVerified = !filter.onlyVerified || item.isVerifiedTrader;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesBrand &&
        matchesCondition &&
        matchesTradeType &&
        matchesPrice &&
        matchesDistance &&
        matchesInStock &&
        matchesVerified
      );
    })
    .map((item) => ({ ...item, isFavorite: favorites.has(item.id) }))
    .sort((a, b) => {
      switch (filter.sortBy as SortBy) {
        case "NEAREST":
          return a.distanceMiles - b.distanceMiles;
        case "ECO_IMPACT":
          return b.co2SavedKg - a.co2SavedKg;
        case "PRICE_LOW_TO_HIGH":
          return a.estimatedPrice - b.estimatedPrice;
        case "PRICE_HIGH_TO_LOW":
          return b.estimatedPrice - a.estimatedPrice;
        case "HIGHEST_RATED":
          return b.ownerRating - a.ownerRating;
        default:
          return 0;
      }
    });
}

export interface EcoTradeStore {
  listings: ListingItem[];
  favorites: Set<string>;
  recentSearches: string[];
  filterState: SearchFilter;
  userStats: UserStats;
  userProfile: UserProfile;
  tradeOffers: TradeOffer[];
  conversations: ChatConversation[];
  isDarkMode: boolean;
  privacyModeEnabled: boolean;
  isLoggedIn: boolean;
  hasAccount: boolean;
  allListingsWithFavorites: ListingItem[];
  filteredListings: ListingItem[];
  showFilterSheet: boolean;
  tradeProposalTarget: ListingItem | null;
  toastMessage: string | null;

  toggleDarkMode: () => void;
  togglePrivacyMode: () => void;
  toggleFavorite: (itemId: string) => void;
  setSearchQuery: (query: string) => void;
  commitSearch: () => void;
  setCategoryFilter: (category: string | null) => void;
  updateFilter: (filter: SearchFilter) => void;
  resetFilter: () => void;
  removeRecentSearch: (query: string) => void;
  clearAllRecentSearches: () => void;
  openFilterSheet: () => void;
  closeFilterSheet: () => void;
  openTradeProposal: (listing: ListingItem) => void;
  closeTradeProposal: () => void;
  submitTradeProposal: (
    listingId: string,
    offeredItemTitle: string,
    offeredEcoPoints: number,
    message: string
  ) => void;
  addNewListing: (
    title: string,
    category: string,
    brand: string,
    condition: string,
    tradeType: TradeType,
    ecoPoints: number,
    description: string,
    lookingFor: string[],
    imageUrl: string
  ) => void;
  sendChatMessage: (conversationId: string, text: string) => void;
  markConversationRead: (conversationId: string) => void;
  login: (emailOrUsername: string, password: string) => boolean;
  loginWithProvider: (name: string, email: string) => void;
  signup: (name: string, email: string, username: string, password: string) => boolean;
  continueAsGuest: () => void;
  logout: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
}

const StoreContext = createContext<EcoTradeStore | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [listings, setListings] = useState<ListingItem[]>(initialListings);
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(["item_1", "item_5"])
  );
  const [recentSearches, setRecentSearches] = useState<string[]>(initialRecentSearches);
  const [filterState, setFilterState] = useState<SearchFilter>(defaultSearchFilter);
  const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [tradeOffers, setTradeOffers] = useState(initialTradeOffers);
  const [conversations, setConversations] = useState<ChatConversation[]>(initialConversations);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [privacyModeEnabled, setPrivacyModeEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [tradeProposalTarget, setTradeProposalTarget] = useState<ListingItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listingsRef = useRef(listings);
  const profileRef = useRef(userProfile);
  const filterStateRef = useRef(filterState);
  const privacyModeRef = useRef(privacyModeEnabled);

  useEffect(() => {
    listingsRef.current = listings;
    profileRef.current = userProfile;
    filterStateRef.current = filterState;
    privacyModeRef.current = privacyModeEnabled;
  }, [listings, userProfile, filterState, privacyModeEnabled]);

  const clearToast = useCallback(() => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setToastMessage(null);
  }, []);

  const showToast = useCallback(
    (message: string) => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastMessage(message);
      toastTimer.current = setTimeout(() => {
        setToastMessage(null);
        toastTimer.current = null;
      }, 2800);
    },
    []
  );

  const toggleDarkMode = useCallback(() => setIsDarkMode((v) => !v), []);

  const togglePrivacyMode = useCallback(() => {
    const next = !privacyModeRef.current;
    privacyModeRef.current = next;
    setPrivacyModeEnabled(next);
    showToast(next ? "Privacy mode active: Location fuzzed" : "Standard precision active");
  }, [showToast]);

  const toggleFavorite = useCallback((itemId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilterState((f) => ({ ...f, query }));
  }, []);

  const addRecentSearch = useCallback((query: string) => {
    setRecentSearches((current) => {
      const next = current.filter((q) => q !== query);
      next.unshift(query);
      return next.slice(0, 8);
    });
  }, []);

  const commitSearch = useCallback(() => {
    const query = filterStateRef.current.query.trim();
    if (query) addRecentSearch(query);
  }, [addRecentSearch]);

  const setCategoryFilter = useCallback((category: string | null) => {
    const cat =
      category && category.toLowerCase() === "all" ? null : category;
    setFilterState((f) => ({ ...f, category: cat }));
  }, []);

  const updateFilter = useCallback((filter: SearchFilter) => {
    setFilterState(filter);
  }, []);

  const resetFilter = useCallback(() => setFilterState(defaultSearchFilter()), []);

  const removeRecentSearch = useCallback((query: string) => {
    setRecentSearches((current) => current.filter((q) => q !== query));
  }, []);

  const clearAllRecentSearches = useCallback(() => setRecentSearches([]), []);

  const openFilterSheet = useCallback(() => setShowFilterSheet(true), []);
  const closeFilterSheet = useCallback(() => setShowFilterSheet(false), []);
  const openTradeProposal = useCallback((listing: ListingItem) => {
    setTradeProposalTarget(listing);
  }, []);
  const closeTradeProposal = useCallback(() => setTradeProposalTarget(null), []);

  const submitTradeProposal = useCallback(
    (
      listingId: string,
      offeredItemTitle: string,
      offeredEcoPoints: number,
      message: string
    ) => {
      const listing = listingsRef.current.find((l) => l.id === listingId);
      if (!listing) return;

      const newOffer = {
        id: uid("offer"),
        listingId,
        listingTitle: listing.title,
        listingImageUrl: listing.imageUrl,
        ownerName: listing.ownerName,
        offeredItemTitle,
        offeredEcoPoints,
        message,
        status: "Pending Review",
        timestamp: "Just now",
      };
      setTradeOffers((offers) => [newOffer, ...offers]);

      const newMsg = {
        id: uid("msg"),
        text: `Trade Proposal for '${listing.title}': Offered '${offeredItemTitle}' + ${offeredEcoPoints} pts. Note: ${message}`,
        timestamp: "Just now",
        isFromMe: true,
      };

      setConversations((convs) => {
        const index = convs.findIndex((c) => c.traderName === listing.ownerName);
        if (index >= 0) {
          const conv = convs[index];
          const updated: ChatConversation = {
            ...conv,
            lastMessage: newMsg.text,
            lastMessageTime: "Just now",
            messages: [...conv.messages, newMsg],
          };
          const copy = [...convs];
          copy[index] = updated;
          return copy;
        }
        const newConv: ChatConversation = {
          id: uid("conv"),
          traderName: listing.ownerName,
          traderAvatarUrl: listing.ownerAvatarUrl,
          itemTitle: listing.title,
          lastMessage: newMsg.text,
          lastMessageTime: "Just now",
          unreadCount: 0,
          messages: [newMsg],
        };
        return [newConv, ...convs];
      });

      setUserStats((stats) => ({ ...stats, activeTrades: stats.activeTrades + 1 }));
      setTradeProposalTarget(null);
      showToast("Exchange proposal sent successfully!");
    },
    [showToast]
  );

  const addNewListing = useCallback(
    (
      title: string,
      category: string,
      brand: string,
      condition: string,
      tradeType: TradeType,
      ecoPoints: number,
      description: string,
      lookingFor: string[],
      imageUrl: string
    ) => {
      const profile = profileRef.current;
      const newItem: ListingItem = {
        id: uid("item").slice(0, 12),
        title,
        category,
        brand: brand ? brand : "EcoTrader",
        condition,
        tradeType,
        ecoPointsValue: ecoPoints,
        estimatedPrice: ecoPoints * 0.5,
        distanceKm: 0.1,
        distanceMiles: 0.1,
        ownerName: profile.name,
        ownerRating: 5.0,
        ownerTradesCount: profile.totalTrades,
        ownerAvatarUrl: profile.avatarUrl,
        isVerifiedTrader: true,
        ecoImpactLevel: "High",
        co2SavedKg: 12.0,
        imageUrl: imageUrl
          ? imageUrl
          : "https://lh3.googleusercontent.com/aida-public/AB6AXuDwCR5NypZ89YRy7JC3ZSRxd0vnGXoeOnEFyVBE0EkUU9Vlzq2xJSCokIKT0FnoBsGZGoKXLXL835vjdnhXro7xWtqDzE75-NyBE2SiLYvKNVlr61s5s9j0dsyQ19ohAJI-07vDND1CkqRjGSZSxzNab3DMIxht9KKbTsSn1szHJoc8_eZZVbu-4oP1jprQK71Gc0nKefFkV0-gJXPbsB51uxH_JuAfNssXZ-bSAuHhM0Y3YW17SJR-",
        additionalImages: [],
        description,
        lookingFor,
        openToOffers: true,
        postedTimeAgo: "Just now",
        inStock: true,
        inventoryCount: 1,
        isFavorite: false,
      };
      setListings((prev) => [newItem, ...prev]);
      setUserStats((stats) => ({
        ...stats,
        itemsDiverted: stats.itemsDiverted + 1,
        co2PreventedKg: stats.co2PreventedKg + 12,
      }));
      showToast("New item listed for trade!");
    },
    [showToast]
  );

  const sendChatMessage = useCallback((conversationId: string, text: string) => {
    if (!text.trim()) return;
    setConversations((prev) => {
      const index = prev.findIndex((c) => c.id === conversationId);
      if (index < 0) return prev;
      const conv = prev[index];
      const newMsg = {
        id: uid("msg"),
        text,
        timestamp: "Just now",
        isFromMe: true,
      };
      const updated: ChatConversation = {
        ...conv,
        lastMessage: text,
        lastMessageTime: "Just now",
        messages: [...conv.messages, newMsg],
      };
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  }, []);

  const markConversationRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unreadCount: 0 } : c))
    );
  }, []);

  const login = useCallback(
    (emailOrUsername: string, password: string) => {
      setIsLoggedIn(true);
      setHasAccount(true);
      if (emailOrUsername.trim()) {
        const isEmail = emailOrUsername.includes("@");
        const rawName = isEmail
          ? emailOrUsername.split("@")[0].replace(/\./g, " ")
          : emailOrUsername.replace(/_/g, " ");
        const name = capitalizeWords(rawName.trim()) || "Alex Green";
        setUserProfile((p) => ({
          ...p,
          email: isEmail ? emailOrUsername : `${emailOrUsername}@example.com`,
          name,
          username: isEmail ? emailOrUsername.split("@")[0] : emailOrUsername,
        }));
      }
      return true;
    },
    []
  );

  const loginWithProvider = useCallback((name: string, email: string) => {
    setIsLoggedIn(true);
    setHasAccount(true);
    const cleanName = name.trim() || "EcoTrader";
    const cleanEmail = email.trim() || "member@ecotrade.org";
    const username = cleanEmail.split("@")[0].replace(/[^a-zA-Z0-9_.]/g, "");
    setUserProfile((p) => ({
      ...p,
      name: cleanName,
      email: cleanEmail,
      username: username || `ecotrader_${Date.now() % 1000}`,
    }));
  }, []);

  const signup = useCallback(
    (name: string, email: string, username: string, password: string) => {
      setIsLoggedIn(true);
      setHasAccount(true);
      setUserProfile({
        name: name.trim() ? name : "New EcoTrader",
        email: email.trim() ? email : "member@ecotrade.org",
        username: username.trim()
          ? username
          : `ecotrader_${Date.now() % 1000}`,
        avatarUrl: "",
        isVerified: true,
        locationName: "Portland, OR",
        memberSince: "August 2026",
        rating: 5.0,
        totalTrades: 0,
      });
      return true;
    },
    []
  );

  const continueAsGuest = useCallback(() => setIsLoggedIn(true), []);

  const logout = useCallback(() => setIsLoggedIn(false), []);

  const allListingsWithFavorites = useMemo(
    () => listings.map((l) => ({ ...l, isFavorite: favorites.has(l.id) })),
    [listings, favorites]
  );

  const filteredListings = useMemo(
    () => filterListings(listings, filterState, favorites),
    [listings, filterState, favorites]
  );

  const value: EcoTradeStore = {
    listings,
    favorites,
    recentSearches,
    filterState,
    userStats,
    userProfile,
    tradeOffers,
    conversations,
    isDarkMode,
    privacyModeEnabled,
    isLoggedIn,
    hasAccount,
    allListingsWithFavorites,
    filteredListings,
    showFilterSheet,
    tradeProposalTarget,
    toastMessage,
    toggleDarkMode,
    togglePrivacyMode,
    toggleFavorite,
    setSearchQuery,
    commitSearch,
    setCategoryFilter,
    updateFilter,
    resetFilter,
    removeRecentSearch,
    clearAllRecentSearches,
    openFilterSheet,
    closeFilterSheet,
    openTradeProposal,
    closeTradeProposal,
    submitTradeProposal,
    addNewListing,
    sendChatMessage,
    markConversationRead,
    login,
    loginWithProvider,
    signup,
    continueAsGuest,
    logout,
    showToast,
    clearToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): EcoTradeStore {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
