import {
  CategoryItem,
  ChatConversation,
  ListingItem,
  SearchFilter,
  TradeOffer,
} from "@/models/types";

export const defaultSearchFilter = (): SearchFilter => ({
  query: "",
  category: null,
  brand: null,
  condition: null,
  tradeType: null,
  minPrice: 0.0,
  maxPrice: 250.0,
  maxDistanceMiles: 25.0,
  onlyInStock: true,
  onlyVerified: false,
  sortBy: "NEAREST",
});

export const defaultUserStats = () => ({
  co2PreventedKg: 124,
  monthlyGoalKg: 150,
  itemsDiverted: 38,
  communityRank: "Top 5%",
  ecoPoints: 850,
  progressToGoalPercent: 85,
  activeTrades: 2,
  completedTrades: 14,
});

export const defaultUserProfile = () => ({
  name: "Alex Green",
  email: "alex.green@example.com",
  username: "alex_ecotrader",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDEKn0AtK3RUh85du8vHiMSyTT_bRd_V2ZA6bMxGjXxHs-wf1ggaZsp3d1tjnIfm4eXDQoPJZghnh5bSs-qjNUEHd3TtGzQDwxChDTs_Fh79g9y245mTKrHjcJ61EEJttL4csXhtPb8-uA33RZRHKBenTbuk0NskV33Y1aS3CKEsFrQ-a60_QbNVRBFQZfLT04lTLbKdMHsYzakQ4m818naYt8g0kCxW8p9o33oXoKKY0MSQq2APjzm",
  isVerified: true,
  locationName: "Portland, OR",
  memberSince: "June 2024",
  rating: 4.9,
  totalTrades: 16,
  linkedProviders: [],
});

const makeListing = (p: Partial<ListingItem> & Pick<ListingItem, "id" | "title" | "category">): ListingItem => ({
  brand: "EcoVintage",
  condition: "Excellent",
  tradeType: "TRADE",
  ecoPointsValue: 120,
  estimatedPrice: 35.0,
  distanceKm: 0.8,
  distanceMiles: 0.5,
  ownerName: "Sarah J.",
  ownerRating: 4.8,
  ownerTradesCount: 12,
  ownerAvatarUrl: "",
  isVerifiedTrader: true,
  ecoImpactLevel: "High",
  co2SavedKg: 14.5,
  imageUrl: "",
  additionalImages: [],
  description: "",
  lookingFor: [],
  openToOffers: true,
  postedTimeAgo: "2 days ago",
  inStock: true,
  inventoryCount: 1,
  isFavorite: false,
  ...p,
});

export const categories: CategoryItem[] = [
  { id: "all", name: "All", iconName: "explore", itemCount: 42 },
  { id: "verified", name: "Verified", iconName: "verified", itemCount: 18 },
  { id: "furniture", name: "Furniture", iconName: "chair", itemCount: 12 },
  { id: "garden", name: "Garden", iconName: "local_florist", itemCount: 8 },
  { id: "books", name: "Books", iconName: "menu_book", itemCount: 15 },
  { id: "kitchenware", name: "Kitchen", iconName: "restaurant", itemCount: 9 },
  { id: "electronics", name: "Electronics", iconName: "devices", itemCount: 6 },
  { id: "clothing", name: "Clothing", iconName: "checkroom", itemCount: 11 },
];

export const browseGridCategories: CategoryItem[] = [
  { id: "furniture", name: "Furniture", iconName: "chair", itemCount: 0 },
  { id: "garden", name: "Garden", iconName: "local_florist", itemCount: 0 },
  { id: "books", name: "Books", iconName: "menu_book", itemCount: 0 },
  { id: "kitchenware", name: "Kitchenware", iconName: "restaurant", itemCount: 0 },
  { id: "electronics", name: "Electronics", iconName: "devices", itemCount: 0 },
  { id: "clothing", name: "Clothing", iconName: "checkroom", itemCount: 0 },
];

export const initialRecentSearches = ["Vintage chair", "Plant seeds", "Books"];

const IMG_AVATAR_SARAH =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDEKn0AtK3RUh85du8vHiMSyTT_bRd_V2ZA6bMxGjXxHs-wf1ggaZsp3d1tjnIfm4eXDQoPJZghnh5bSs-qjNUEHd3TtGzQDwxChDTs_Fh79g9y245mTKrHjcJ61EEJttL4csXhtPb8-uA33RZRHKBenTbuk0NskV33Y1aS3CKEsFrQ-a60_QbNVRBFQZfLT04lTLbKdMHsYzakQ4m818naYt8g0kCxW8p9o33oXoKKY0MSQq2APjzm";
const IMG_AVATAR_CHLOE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBNGBT_EaEXRv1sAoEi4jDeHgP-puByJyUhkdddX9HrlhLE5737FTz0jK8F5poBrIryNQKR3E61qcoilUyy125hhsbWGoQAXSUvmLEHud5-o6RRYbxaEc0lZWZpYASb7ks9AEN0I-ld43-yUiCjdq4vMugUq3pDzuoHOu6WlxZDrLwgkYcM18pmT_ts0iYhcGWkeazaO5MKCazeeDrBcmXu-ZWc7OBdDf5o3SUkSefL0FinT9rXPW8C";
const IMG_AVATAR_MARCUS =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAqxgWxZNsCB8kcQ2mXKPAdn2sU4VJMVGKpM0nUMMwOcd9x1d1Mwm_0QWQKxuXDsVjd9IjSM6viXElN6IjgTN88e2271n-4dhvxwTtY4IuDnCs30AtMzLUr2T_FkjPl9avoVavPMseeEFicYrScoWTrL2ZDPve8bXl3KwZuDG5SveQpJ80qq8KMZAypOvEgy8qMiotUpRGor_ArREHEYXzB9vmvQnJKX-4L6qs7guz4D3gOqkA97-tK";
const IMG_AVATAR_DAVID =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAMdOHbZJnKjDiYlkRDgMUMbhsSQizunKiQhmlugNzrIPUqIIX_XZqJLO36RDkfKi6bFpgXvYvnbDmwVi8OzSP8tsBEKk6H0GjTq8ALmTVdF-vjU4JOdUGCNlvYXQwiRTEFXcvHgUCd_OAQZR1ihla1xlu2MYR0WmF2c3bECixn8YvXGATlJWyE4T8RTWdpNEI6xTDqtc_A3WcQ9Sf2lKDwQI1QPesatFl3BbUde6-nEfSOXjscvArL";

export const initialListings: ListingItem[] = [
  makeListing({
    id: "item_1",
    title: "Vintage Wood Coffee Table",
    category: "Furniture",
    brand: "Mid-Century Craft",
    condition: "Excellent",
    tradeType: "TRADE",
    ecoPointsValue: 180,
    estimatedPrice: 85.0,
    distanceKm: 0.8,
    distanceMiles: 0.5,
    ownerName: "Sarah J.",
    ownerRating: 4.9,
    ownerTradesCount: 12,
    ownerAvatarUrl: IMG_AVATAR_SARAH,
    isVerifiedTrader: true,
    ecoImpactLevel: "High",
    co2SavedKg: 28.4,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwCR5NypZ89YRy7JC3ZSRxd0vnGXoeOnEFyVBE0EkUU9Vlzq2xJSCokIKT0FnoBsGZGoKXLXL835vjdnhXro7xWtqDzE75-NyBE2SiLYvKNVlr61s5s9j0dsyQ19ohAJI-07vDND1CkqRjGSZSxzNab3DMIxht9KKbTsSn1szHJoc8_eZZVbu-4oP1jprQK71Gc0nKefFkV0-gJXPbsB51uxH_JuAfNssXZ-bSAuHhM0Y3YW17SJR-",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwCR5NypZ89YRy7JC3ZSRxd0vnGXoeOnEFyVBE0EkUU9Vlzq2xJSCokIKT0FnoBsGZGoKXLXL835vjdnhXro7xWtqDzE75-NyBE2SiLYvKNVlr61s5s9j0dsyQ19ohAJI-07vDND1CkqRjGSZSxzNab3DMIxht9KKbTsSn1szHJoc8_eZZVbu-4oP1jprQK71Gc0nKefFkV0-gJXPbsB51uxH_JuAfNssXZ-bSAuHhM0Y3YW17SJR-",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCukBsvX4Y_vyIhE4_95FqQjXAFEW4VHOomJKp4BlMjdCweqXARoStBUTonMfeFOtyT3jcWYzEMqynqq6DebnSZbb_RKWeBE8x_HWPIldDwiutbsOXDQX1B0KzCaXlbgtH4vlz-Bx5FwWcumgVTMhapLiKOTtqQKniY_dWWhPAopPQrdfkgEDjQnT7mTc6IuR2LdXaXcZ_nMRF7qHJ_9lU5bEq-LpSv_RHK_RpbXSGRCw9ZNPFFGnSP",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAi7afd2URn128qxzb5FbgT0OK2PA0dJJrU2T7rDn2wWTsznz0UUV0_i9w-pB98jPRat2akFoT-NGj6z8wqBIO4u8TYSGeUFiXlbXCwu74z02QLfFdHUQvgfTO6gc1zPL2B41ASCUwFrlvqUjmRVuX2h6vVGi7kvWLcNKR6MKXYjvbH96ErrMNFDAc0se7v-vMywL51uysgaxlOd9QXGbwbur8RHx4ng2oviqeFeRht-7gOoYV02-Xs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATA1yq15uk8OIXFsT6lwGwiAGHDPeMuNq1NKfmKJVRTnsUhB7M2-dm_Jkioi9sU8eopNFUNgZ-RHQgwbQorKauWSTO2m6ujuOQ3kMp3u2iHwfKJz5_dw4UXaMlZfCXVhGdxYsZMSvDWoW-FHIFGW77eui-q-rnGEHtxHbvZN8xaCC7n_ibAlVk_0fGQehGIga83btRJpEzTUruDDBkPpO3xvWa8PcFu3GoCfWjZ-G6T7kshYSfZbp8",
    ],
    description:
      "Beautiful mid-century style coffee table. I inherited this from my grandmother, but it unfortunately doesn't fit in my new apartment. It has been well cared for, with only very minor scuffs on one leg (hardly noticeable). Solid wood construction, very sturdy. Looking for a good home where it will be appreciated!",
    lookingFor: [
      "Garden tools (especially a good spade or pruners)",
      "Floor lamps or interesting desk lamps",
      "Large indoor plants",
    ],
    openToOffers: true,
    postedTimeAgo: "2 days ago",
    inStock: true,
    inventoryCount: 1,
  }),
  makeListing({
    id: "item_2",
    title: "Vintage Oak Chair",
    category: "Furniture",
    brand: "Danish Modern",
    condition: "Excellent",
    tradeType: "TRADE",
    ecoPointsValue: 140,
    estimatedPrice: 60.0,
    distanceKm: 0.8,
    distanceMiles: 0.5,
    ownerName: "David L.",
    ownerRating: 4.8,
    ownerTradesCount: 8,
    ownerAvatarUrl: IMG_AVATAR_DAVID,
    isVerifiedTrader: true,
    ecoImpactLevel: "High",
    co2SavedKg: 19.2,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ8LUvgTeavBxeYg4uM5OT5qJPlvggR7k47eLSy9BEC-wHT8PplEpbk0GKJgrHunluVS_JOjbkMjAbkMdmDUOa35aX56uJiMAzDRqfD94QK8IEmUkSSld_MOJzXlZMJ_e7hIYRCXqJujTwdDU2b6ohQEmv4hcHXiFgt0i6p9t7sTQRzow1VokJdrqkd9Labq01jiPlBlrW3Lw3l7-mQDHnb7q2DCE8WbzhQq_TWYfkrIwBuecLj-ub",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ8LUvgTeavBxeYg4uM5OT5qJPlvggR7k47eLSy9BEC-wHT8PplEpbk0GKJgrHunluVS_JOjbkMjAbkMdmDUOa35aX56uJiMAzDRqfD94QK8IEmUkSSld_MOJzXlZMJ_e7hIYRCXqJujTwdDU2b6ohQEmv4hcHXiFgt0i6p9t7sTQRzow1VokJdrqkd9Labq01jiPlBlrW3Lw3l7-mQDHnb7q2DCE8WbzhQq_TWYfkrIwBuecLj-ub",
    ],
    description:
      "Solid oak handcrafted armchair in Scandinavian style. Ergonomic curved backrest with smooth varnish. Clean and ready for your reading nook.",
    lookingFor: ["Ceramic teapots or mugs", "Indoor potting soil or planters"],
    openToOffers: true,
    postedTimeAgo: "3 hours ago",
    inStock: true,
    inventoryCount: 2,
  }),
  makeListing({
    id: "item_3",
    title: "Terracotta Pots (Set of 3)",
    category: "Garden",
    brand: "Clayworks Studio",
    condition: "Good",
    tradeType: "FREE",
    ecoPointsValue: 0,
    estimatedPrice: 0.0,
    distanceKm: 1.2,
    distanceMiles: 0.7,
    ownerName: "Chloe M.",
    ownerRating: 4.5,
    ownerTradesCount: 5,
    ownerAvatarUrl: IMG_AVATAR_CHLOE,
    isVerifiedTrader: false,
    ecoImpactLevel: "Med",
    co2SavedKg: 8.6,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkHAYUnEVb23IKM9JbHAfPnw2718vjb-zwDKAYBbHB_IbFB-BrPaQ-6E5eQkXu5YyHO4x-1xbUmiLxeGALnQI9MVnf-jU7TD1QirrXDoQDK0FMIrUpKyV0i0UmQbJ_iaXnP0Gs8Rj98PJmiA6ptYjKrlM5Zq_lkANDbKgszHOE2dQjrOGRAORppGX_b52O0q9jiB6Oos7HHNm_PmvXbJdgR9CqRmcC_3JfGWzUERjGIZA8WkMKo6G6",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkHAYUnEVb23IKM9JbHAfPnw2718vjb-zwDKAYBbHB_IbFB-BrPaQ-6E5eQkXu5YyHO4x-1xbUmiLxeGALnQI9MVnf-jU7TD1QirrXDoQDK0FMIrUpKyV0i0UmQbJ_iaXnP0Gs8Rj98PJmiA6ptYjKrlM5Zq_lkANDbKgszHOE2dQjrOGRAORppGX_b52O0q9jiB6Oos7HHNm_PmvXbJdgR9CqRmcC_3JfGWzUERjGIZA8WkMKo6G6",
    ],
    description:
      'Three porous red clay terracotta planters in graduated sizes (6", 8", 10"). Drainage holes included, perfect for succulents or kitchen herbs. Giving away for free to green thumbs!',
    lookingFor: ["Free for pickup"],
    openToOffers: false,
    postedTimeAgo: "5 hours ago",
    inStock: true,
    inventoryCount: 1,
  }),
  makeListing({
    id: "item_4",
    title: "Classic Novels Bundle",
    category: "Books",
    brand: "Penguin Vintage",
    condition: "Excellent",
    tradeType: "TRADE",
    ecoPointsValue: 90,
    estimatedPrice: 25.0,
    distanceKm: 2.5,
    distanceMiles: 1.5,
    ownerName: "Marcus W.",
    ownerRating: 4.9,
    ownerTradesCount: 22,
    ownerAvatarUrl: IMG_AVATAR_MARCUS,
    isVerifiedTrader: true,
    ecoImpactLevel: "High",
    co2SavedKg: 11.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-kvvMZNLvXYc7l_qC_uxmUUW8rSIoWhnviX7vFp1quhbN-_32SdgkzV87HAH5MozO_PjZjyYIsBG7GdKQoGOnGvuDSMgEThUpWddAhIO4tEKPiJqesy1ehixAtpyh-ee6P_A2o9dMMOgCHXMdqoKikpoeJdS8UdVS0NZKgwaXFoVxUv_Hs0i-IcdKueyP86DY9D_TFl1QzWs3Bm8rh70clFNq3D7-VJ4-jfNm3l2AftseQrHwnm03",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-kvvMZNLvXYc7l_qC_uxmUUW8rSIoWhnviX7vFp1quhbN-_32SdgkzV87HAH5MozO_PjZjyYIsBG7GdKQoGOnGvuDSMgEThUpWddAhIO4tEKPiJqesy1ehixAtpyh-ee6P_A2o9dMMOgCHXMdqoKikpoeJdS8UdVS0NZKgwaXFoVxUv_Hs0i-IcdKueyP86DY9D_TFl1QzWs3Bm8rh70clFNq3D7-VJ4-jfNm3l2AftseQrHwnm03",
    ],
    description:
      "A curated bundle of 6 classic literature novels in great condition. Clean pages with no markings or spine creases. Perfect for book clubs or cozy evenings.",
    lookingFor: ["Science fiction novels", "Non-fiction nature / gardening books"],
    openToOffers: true,
    postedTimeAgo: "1 day ago",
    inStock: true,
    inventoryCount: 1,
  }),
  makeListing({
    id: "item_5",
    title: "Mid-Century Armchair",
    category: "Furniture",
    brand: "Herman Miller Era",
    condition: "Excellent",
    tradeType: "TRADE",
    ecoPointsValue: 220,
    estimatedPrice: 145.0,
    distanceKm: 1.9,
    distanceMiles: 1.2,
    ownerName: "Sarah J.",
    ownerRating: 4.9,
    ownerTradesCount: 12,
    ownerAvatarUrl: IMG_AVATAR_CHLOE,
    isVerifiedTrader: true,
    ecoImpactLevel: "High",
    co2SavedKg: 34.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKKW-dyr5FDR6ucOrhFM6FWbAcExI6p-FZpZ5YvUHR90mL72JztfJ_pmJWrQxJsDzJqUi7KkmpjBMODiSf5vtWiRr2cnMOM3cFxRBRAuv5vy6Iq1hXbMWm1wfllZ1hsMwGdchTb67Nj5-dqSxpZ2lKLok3HWcOoN-hbdDeIh85xFEWiQkmYkEdRm3XxPBv8_vmPzKPRTLOAqsbsYvY4_YP6u7mIXbziGotm1i5m6ULPp1_6pSbNBlF",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKKW-dyr5FDR6ucOrhFM6FWbAcExI6p-FZpZ5YvUHR90mL72JztfJ_pmJWrQxJsDzJqUi7KkmpjBMODiSf5vtWiRr2cnMOM3cFxRBRAuv5vy6Iq1hXbMWm1wfllZ1hsMwGdchTb67Nj5-dqSxpZ2lKLok3HWcOoN-hbdDeIh85xFEWiQkmYkEdRm3XxPBv8_vmPzKPRTLOAqsbsYvY4_YP6u7mIXbziGotm1i5m6ULPp1_6pSbNBlF",
    ],
    description:
      "Pristine walnut arm chair with woven linen fabric cushion. Restored with natural beeswax finish. Extremely comfortable and elegant.",
    lookingFor: ["Standing floor lamps", "Record player or vinyl collections", "Ceramic planters"],
    openToOffers: true,
    postedTimeAgo: "4 hours ago",
    inStock: true,
    inventoryCount: 1,
  }),
  makeListing({
    id: "item_6",
    title: "Succulent Collection (4 Varietals)",
    category: "Garden",
    brand: "Green Thumb Botanical",
    condition: "Like New",
    tradeType: "TRADE",
    ecoPointsValue: 60,
    estimatedPrice: 20.0,
    distanceKm: 1.3,
    distanceMiles: 0.8,
    ownerName: "Mark D.",
    ownerRating: 5.0,
    ownerTradesCount: 9,
    ownerAvatarUrl: IMG_AVATAR_MARCUS,
    isVerifiedTrader: false,
    ecoImpactLevel: "Med",
    co2SavedKg: 5.2,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCS2Bem802c0Jd7NjKRAme7ffHj6Xam1AT7B2wcro9CdnQqMlvV19D4TDaGymeefA7PVbXUFMSyxBZUH40G3McMqFj2gFCDyA_3qVf1_tsc9tNn1vPnFQYdOblKbyqC8DN8OL358ANQ0bhAZEpGsZgcl7aWsuGwIr9qn0xyy0llkfmoX7fDHbvLl8uGiQ279MDIUdDuft24leiDVbdwkiBQkKI8mwr2TOXGwAv2vMFtjozOdJnsE9w",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCS2Bem802c0Jd7NjKRAme7ffHj6Xam1AT7B2wcro9CdnQqMlvV19D4TDaGymeefA7PVbXUFMSyxBZUH40G3McMqFj2gFCDyA_3qVf1_tsc9tNn1vPnFQYdOblKbyqC8DN8OL358ANQ0bhAZEpGsZgcl7aWsuGwIr9qn0xyy0llkfmoX7fDHbvLl8uGiQ279MDIUdDuft24leiDVbdwkiBQkKI8mwr2TOXGwAv2vMFtjozOdJnsE9w",
    ],
    description:
      "Four healthy potted succulents: Echeveria, Sedum, Jade, and Haworthia in handmade mini clay pots. Rooted and acclimated for indoor windowsill care.",
    lookingFor: ["Monstera or Pothos cuttings", "Espresso cups"],
    openToOffers: true,
    postedTimeAgo: "6 hours ago",
    inStock: true,
    inventoryCount: 3,
  }),
  makeListing({
    id: "item_7",
    title: "Precision Espresso Machine",
    category: "Kitchenware",
    brand: "Breville Artisanal",
    condition: "Excellent",
    tradeType: "TRADE",
    ecoPointsValue: 260,
    estimatedPrice: 180.0,
    distanceKm: 4.0,
    distanceMiles: 2.5,
    ownerName: "Elena R.",
    ownerRating: 4.8,
    ownerTradesCount: 19,
    ownerAvatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsqeAYlHurJ6p_nOPwHQO007r2un6r83C51tC5HhVUw-_iL9_Mz7bZSSIFch9-g1DKBGuifSGb1MXwR_bgMPxbPKkwQtaiiIlhVRuhTKH38hR9O4dPEIk1yEGG3OLyHe7kr8wadkQHOIKK9cF3IT7lOJuuziXdpK2-QL2y9VNtblJBevuxGeL2F1WPwUyBthboX6isWBageQuSn8EQuN464J10yrB1ODSfNAD9NwMdNfZ_DF-vBD_x",
    isVerifiedTrader: true,
    ecoImpactLevel: "High",
    co2SavedKg: 42.0,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALPBGCfOQNJN413HUgzYs59tFFRhmr-Y4aRP7RpB6V4HJUrHz61RsIwHzACWmAbkqYnJ_b_0pQoFXc94w_tQOK321jrrzGcu7cq9VyX4pP5jUiIG1n5bTZqhXXWUWTl_7U235E2wA4oicGPl6Q3zuL4b0XO_jPifg2eS2zhoEtBu2i9Tzp3Zj0HIM8kzeCN0ma2i7_qAZqfXpdfVd8dV5uNc52srsvw9LUGNZJ3Z8ZnwhKUcwkUTNa",
    additionalImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALPBGCfOQNJN413HUgzYs59tFFRhmr-Y4aRP7RpB6V4HJUrHz61RsIwHzACWmAbkqYnJ_b_0pQoFXc94w_tQOK321jrrzGcu7cq9VyX4pP5jUiIG1n5bTZqhXXWUWTl_7U235E2wA4oicGPl6Q3zuL4b0XO_jPifg2eS2zhoEtBu2i9Tzp3Zj0HIM8kzeCN0ma2i7_qAZqfXpdfVd8dV5uNc52srsvw9LUGNZJ3Z8ZnwhKUcwkUTNa",
    ],
    description:
      "Commercial grade compact espresso machine with stainless steel steam wand and 54mm portafilter. Descaled and fully tested. Makes incredible microfoam!",
    lookingFor: ["Burr coffee grinder", "KitchenAid mixer attachment", "Cast iron skillet set"],
    openToOffers: true,
    postedTimeAgo: "1 day ago",
    inStock: true,
    inventoryCount: 1,
  }),
  makeListing({
    id: "item_8",
    title: "Organic Cotton Canvas Jacket",
    category: "Clothing",
    brand: "Patagonia Vintage",
    condition: "Like New",
    tradeType: "TRADE",
    ecoPointsValue: 130,
    estimatedPrice: 75.0,
    distanceKm: 1.6,
    distanceMiles: 1.0,
    ownerName: "Sarah J.",
    ownerRating: 4.9,
    ownerTradesCount: 12,
    ownerAvatarUrl: IMG_AVATAR_CHLOE,
    isVerifiedTrader: true,
    ecoImpactLevel: "High",
    co2SavedKg: 16.8,
    imageUrl: IMG_AVATAR_DAVID,
    additionalImages: [],
    description:
      "100% GOTS certified organic canvas work jacket in sage green. Size Medium. Only worn a couple of times, heavy duty metal buttons.",
    lookingFor: ["Wool sweater (L)", "Hiking backpack"],
    openToOffers: true,
    postedTimeAgo: "3 days ago",
    inStock: true,
    inventoryCount: 1,
  }),
];

export const initialConversations: ChatConversation[] = [
  {
    id: "conv_1",
    traderName: "Sarah J.",
    traderAvatarUrl: IMG_AVATAR_CHLOE,
    itemTitle: "Vintage Wood Coffee Table",
    lastMessage:
      "Hi Alex! That indoor fig tree you offered looks great. When can we meet for the trade?",
    lastMessageTime: "10:42 AM",
    unreadCount: 1,
    messages: [
      {
        id: "m1",
        text: "Hello! I saw your vintage wood coffee table listing. I have a large healthy Fiddle Leaf Fig tree in a ceramic pot to trade.",
        timestamp: "10:15 AM",
        isFromMe: true,
      },
      {
        id: "m2",
        text: "Hi Alex! That indoor fig tree you offered looks great. When can we meet for the trade?",
        timestamp: "10:42 AM",
        isFromMe: false,
      },
    ],
  },
  {
    id: "conv_2",
    traderName: "Mark D.",
    traderAvatarUrl: IMG_AVATAR_MARCUS,
    itemTitle: "Succulent Collection",
    lastMessage: "Sure, I can leave the succulents on the porch for contact-free pickup!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "m3",
        text: "Hey Mark, interested in your succulent bundle. Would 60 Eco-Points work?",
        timestamp: "Yesterday",
        isFromMe: true,
      },
      {
        id: "m4",
        text: "Sure, I can leave the succulents on the porch for contact-free pickup!",
        timestamp: "Yesterday",
        isFromMe: false,
      },
    ],
  },
];

export const initialTradeOffers: TradeOffer[] = [
  {
    id: "offer_1",
    listingId: "item_1",
    listingTitle: "Vintage Wood Coffee Table",
    listingImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwCR5NypZ89YRy7JC3ZSRxd0vnGXoeOnEFyVBE0EkUU9Vlzq2xJSCokIKT0FnoBsGZGoKXLXL835vjdnhXro7xWtqDzE75-NyBE2SiLYvKNVlr61s5s9j0dsyQ19ohAJI-07vDND1CkqRjGSZSxzNab3DMIxht9KKbTsSn1szHJoc8_eZZVbu-4oP1jprQK71Gc0nKefFkV0-gJXPbsB51uxH_JuAfNssXZ-bSAuHhM0Y3YW17SJR-",
    ownerName: "Sarah J.",
    offeredItemTitle: "Large Fiddle Leaf Fig Plant + Ceramic Pot",
    offeredEcoPoints: 50,
    message:
      "I have a healthy 4-foot indoor plant in a terracotta pot that matches what you're looking for!",
    status: "Pending Review",
    timestamp: "2 hours ago",
  },
];
