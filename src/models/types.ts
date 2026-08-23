export type TradeType = "TRADE" | "FREE" | "ECO_POINTS";

export type SortBy =
  | "NEAREST"
  | "ECO_IMPACT"
  | "PRICE_LOW_TO_HIGH"
  | "PRICE_HIGH_TO_LOW"
  | "HIGHEST_RATED";

export const SORT_BY_LABELS: Record<SortBy, string> = {
  NEAREST: "Nearest to Me",
  ECO_IMPACT: "Highest Eco Impact",
  PRICE_LOW_TO_HIGH: "Price: Low to High",
  PRICE_HIGH_TO_LOW: "Price: High to Low",
  HIGHEST_RATED: "Top Rated Traders",
};

export interface ListingItem {
  id: string;
  title: string;
  category: string;
  brand: string;
  condition: string;
  tradeType: TradeType;
  ecoPointsValue: number;
  estimatedPrice: number;
  distanceKm: number;
  distanceMiles: number;
  ownerName: string;
  ownerRating: number;
  ownerTradesCount: number;
  ownerAvatarUrl: string;
  isVerifiedTrader: boolean;
  ecoImpactLevel: string;
  co2SavedKg: number;
  imageUrl: string;
  additionalImages: string[];
  description: string;
  lookingFor: string[];
  openToOffers: boolean;
  postedTimeAgo: string;
  inStock: boolean;
  inventoryCount: number;
  isFavorite: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  iconName: string;
  itemCount: number;
}

export interface UserStats {
  co2PreventedKg: number;
  monthlyGoalKg: number;
  itemsDiverted: number;
  communityRank: string;
  ecoPoints: number;
  progressToGoalPercent: number;
  activeTrades: number;
  completedTrades: number;
}

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  isVerified: boolean;
  locationName: string;
  memberSince: string;
  rating: number;
  totalTrades: number;
}

export interface SearchFilter {
  query: string;
  category: string | null;
  brand: string | null;
  condition: string | null;
  tradeType: TradeType | null;
  minPrice: number;
  maxPrice: number;
  maxDistanceMiles: number;
  onlyInStock: boolean;
  onlyVerified: boolean;
  sortBy: SortBy;
}

export interface TradeOffer {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImageUrl: string;
  ownerName: string;
  offeredItemTitle: string;
  offeredEcoPoints: number;
  message: string;
  status: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: string;
  isFromMe: boolean;
}

export interface ChatConversation {
  id: string;
  traderName: string;
  traderAvatarUrl: string;
  itemTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}
