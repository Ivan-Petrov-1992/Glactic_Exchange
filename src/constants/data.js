export const SidebarData = [
  {
    name: "home",
    icon: "/NavIcon/Home.png",
    iconHover: "/NavIcon/HomeH.png",
    path: "/",
  },
  {
    name: "stake",
    icon: "/NavIcon/Staking.png",
    iconHover: "/NavIcon/StakingH.png",
    path: "/staking",
  },
  {
    name: "exchange",
    icon: "/NavIcon/Exchange.png",
    iconHover: "/NavIcon/ExchangeH.png",
    path: "/exchange",
  },
  {
    name: "dashboard",
    icon: "/NavIcon/Dashboard.png",
    iconHover: "/NavIcon/DashboardH.png",
    path: "/dashboard",
  },
  {
    name: "claim",
    icon: "/NavIcon/Claim.png",
    iconHover: "/NavIcon/ClaimH.png",
    path: "/claim",
  },
  {
    name: "pool",
    icon: "/NavIcon/Pool.png",
    iconHover: "/NavIcon/PoolH.png",
    path: "/pool",
  },
  {
    name: "liquidation",
    icon: "/NavIcon/Liquidation.png",
    iconHover: "/NavIcon/LiquidationH.png",
    path: "/liquidation",
  },
];

export const ClaimData = [
  { title: "currency", width: "10%", align: "left" },
  { title: "apy", width: "8%", align: "left" },
  { title: "coll", width: "17%", align: "center" },
  { title: "collI", width: "17%", align: "center" },
  { title: "sp", width: "20%", align: "center" },
  { title: "rr", width: "14%", align: "center" },
  { title: "reward", width: "14%", align: "center" },
];

export const TransClaim = [
  { title: "apy", width: "10%", align: "left" },
  { title: "coll", width: "12%", align: "left" },
  { title: "collI", width: "18%", align: "center" },
  { title: "sp", width: "20%", align: "center" },
  { title: "rr", width: "17%", align: "center" },
  { title: "reward", width: "17%", align: "center" },
];

export const DistClaim = [
  { title: "Gala", width: "20%", align: "center" },
  { title: "ETH", width: "20%", align: "center" },
  { title: "BTC", width: "20%", align: "center" },
  { title: "BNB", width: "20%", align: "center" },
  {
    title: "more",
    select: true,
  },
];

export const LiqData = ["addr", "coll", "debt", "cratio", "op"];

export const StakeData = ["assets", "amount", "Generatable", "c_ratio", "op"];

export const OrderHistoryData = [
  "type",
  "date",
  "pair",
  "price",
  "amount",
  "fee",
  "status",
  "hash",
];

export const ExchangeData = ["pair", "price", "change", "move", "op"];
