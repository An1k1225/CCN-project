# EcoTrade Expo Port — Work Log & Notes

Full port of the native Android "EcoTrade" app (`F:\Project\Demo2\ecotrade (1)`,
Kotlin + Jetpack Compose) to React Native / Expo.

- **Source of truth**: the Kotlin app under `F:\Project\Demo2\ecotrade (1)` (untouched except for an earlier separate bug-fix pass).
- **This project**: `F:\Project\Demo2\ecotrade-expo`, written entirely in TypeScript.
- **Status**: feature-complete port. `npx tsc --noEmit` passes clean and `npx expo export --platform android` bundles successfully.
- **Not yet verified on-device** (no Android SDK/emulator on this machine): run `npx expo start` on a device/emulator to smoke-test, especially the `@expo/ui` sheets.

---

## How to run

```powershell
cd F:\Project\Demo2\ecotrade-expo
npx expo start          # dev server (scan QR with Expo Go or emulator)
npx tsc --noEmit        # typecheck
npx expo export --platform android   # release bundle check
```

---

## Project layout

```
src/
  models/types.ts            # TS mirror of Models.kt (ListingItem, SearchFilter, TradeOffer, ...)
  constants/theme.ts         # LIGHT_COLORS/DARK_COLORS (from Color.kt), TYPE scale, useTheme()
  data/sample-data.ts        # SampleData.kt port: 8 listings, conversations, offer, defaults
  data/store.tsx             # EcoTradeRepository + EcoTradeViewModel ported to React Context
  components/
    app-icon.tsx             # MaterialIcons wrapper (cross-platform parity w/ Compose icons)
    eco-image.tsx            # expo-image + loading/error fallback (EcoImage.kt port)
    common.tsx               # TopEcoHeader, cards, avatar, chips (CommonComponents.kt port)
    app-tab-bar.tsx          # custom tab bar w/ raised center Trade button
    filter-sheet.tsx         # FilterBottomSheet.kt port (@expo/ui BottomSheet/Slider/Switch)
    trade-proposal-sheet.tsx # TradeProposalBottomSheet.kt port
  app/
    _layout.tsx              # root Stack + StoreProvider + ThemeProvider + ToastHost
    index.tsx                # onboarding (4 steps)
    auth.tsx                 # login/signup/guest/OAuth-demo
    listing/[id].tsx         # ListingDetailScreen.kt port
    (tabs)/_layout.tsx       # auth guard + Tabs(index/search/trade/chat/profile)
    (tabs)/index.tsx         # HomeScreen.kt port
    (tabs)/search.tsx        # SearchScreen.kt port (results + discovery modes)
    (tabs)/trade.tsx         # TradeTabScreen.kt port (offers + list-an-item form)
    (tabs)/chat.tsx          # ChatScreen.kt port (list + thread view)
    (tabs)/profile.tsx       # ProfileScreen.kt port
```

## Key porting decisions

- **ViewModel → Context**: `store.tsx` exposes the same state/actions as `EcoTradeRepository`/`EcoTradeViewModel`
  (filterListings, submitTradeProposal, addNewListing, login name derivation, etc.), byte-for-byte logic parity.
- **Navigation**: Compose destination state → expo-router. `listing/[id]` is pushed; Chat/Profile buttons use
  `router.navigate("/(tabs)/...")` (equivalent of `navigateTo(Dashboard)+selectTab`). Auth guard = `<Redirect href="/auth">`.
- **Icons**: `@expo/vector-icons` MaterialIcons everywhere (Compose material-icons names) instead of SF Symbols,
  since Android is the target platform.
- **M3 components → @expo/ui**: BottomSheet/Slider/Switch come from `@expo/ui`; sliders are single-value
  (maxPrice 0–300 step 50, maxDistance 1–25 step 1, proposal points 0–200 step 10).
- **Toasts**: ToastHost overlay at root, auto-dismiss ~2800 ms, bottom inset + 84.

---

## Bugs found & fixed during the port

### Store / logic
1. **Side effects inside state updaters** (`src/data/store.tsx`) — `togglePrivacyMode` showed its toast inside a
   `setState` updater and `commitSearch` wrote recent searches inside one; both would double-fire under React
   StrictMode. Refactored to read `privacyModeRef` / `filterStateRef` and keep updaters pure.
   Toast semantics preserved: message reflects the *new* privacy value ("Privacy mode active..." after enabling).
2. **Earlier store fixes carried through**: updater side effects replaced with `listingsRef`/`profileRef`;
   missing `TradeOffer` type import fixed.

### Missing behavior vs. the Kotlin app
3. **Logout toast missing** (`src/app/(tabs)/profile.tsx`) — Kotlin's `logout()` shows
   "Signed out successfully"; the port only flipped the flag. Now shows the toast before redirecting to `/auth`.

### Dependencies / toolchain
4. **SDK 57 does not ship `@react-navigation/*` at the package root** — installing them directly created duplicate
   types that broke `BottomTabBarProps`. Uninstalled; imports now use expo-router's vendored fork:
   - `expo-router` exports `DarkTheme`/`DefaultTheme`/`ThemeProvider` directly (`src/app/_layout.tsx`)
   - `BottomTabBarProps` from `expo-router/build/react-navigation/bottom-tabs/types` (`src/components/app-tab-bar.tsx`)
5. **`@expo/vector-icons` was not installed** — added via npm; extended `AppIconName`/`GLYPHS` with
   `chat_bubble_outline`, `security`, `check_circle`.
6. Note: `npx expo install` rejects `--no-audit/--no-fund` passthrough on this machine (npm EALLOWSCRIPTS);
   plain `npm install --save ...` works.

### Template leftovers / compile errors
7. **Orphaned default-template files deleted** (they imported the template theme module we replaced):
   `app/explore.tsx`, `components/{external-link,themed-text,themed-view,hint-row,web-badge,app-tabs,app-tabs.web,animated-icon,animated-icon.web}.tsx`,
   `components/ui/collapsible.tsx`, `hooks/use-theme.ts`, plus later `global.css` and `animated-icon.module.css`.
8. **Invalid style factories** (`src/components/common.tsx`) — `styles.cardOuter(width)` /
   `styles.browseCatCard(width)` were function entries inside `StyleSheet.create`, which TypeScript rejects
   ("expression is not callable"). Moved out as typed helpers `cardOuterStyle()` / `browseCatCardStyle()`
   returning `ViewStyle`.

### Earlier screen-level fixes (carried from first build pass)
9. Invented `route.nameOf()` call in the custom tab bar replaced with proper `tabPress` emit + `navigate`.
10. Home filter button now goes to Search tab *and* opens the filter sheet (matches MainActivity wiring);
    results grid got explicit `rowGap`.

---

## Verified-parity checklist (vs. Kotlin originals)

- `filterListings`: all 9 predicates, `"verified"` category special case, all 5 sort modes — line-for-line match.
- `submitTradeProposal`: offer prepended; conversation updated-or-created keyed by owner name;
  activeTrades + 1; silent early-return when listing id unknown.
- `addNewListing`: price = pts × 0.5, distance 0.1, +12 kg CO₂, +1 item diverted, default image URL.
- Login name derivation (email dots→spaces / underscores→spaces, capitalizeWords, "Alex Green" fallback),
  signup defaults, guest mode.
- Defaults identical to Kotlin data classes (SearchFilter 250/25/in-stock/NEAREST; UserStats 124/150/38/…;
  profile Alex Green 4.9 rating / 16 trades).
- Search screen: `isSearching` = query ∨ category ∨ brand; filter badge counts category/brand/condition/tradeType;
  Trending = `filteredListings.take(4)`; SEE ALL clears category.
- Home: "All"/"Verified" chip special cases; inventory alert counts all listings.
- Trade form: points fallback 100 on parse failure; wish-list comma split; only title/desc/lookingFor reset
  after publish (same fields reset as Kotlin).
- Auth: demo prefill (alex.green@example.com / password123), forgot-password inline error, Google/Apple demo OAuth,
  guest mode toast, welcome/signup toasts.

## Known runtime risks (untestable here)

- `@expo/ui` `BottomSheet` content mixes RN views with Host-wrapped Slider/Switch — API-verified against .d.ts,
  not exercised on a device.
- Filter/trade-proposal sheets render conditionally and mount fresh per open (keyed), matching the Compose
  ModalBottomSheet lifecycle.
