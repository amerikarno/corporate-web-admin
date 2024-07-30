import { TUrlConfig } from "./types";

export const urlConfig: TUrlConfig[] = [
  // {
  //   header: "Welcome",
  //   icon: "icon",
  //   children: [
  //     {
  //       label: "Welcome",
  //       href: "/",
  //     },
  //   ],
  // },
  {
    header: "System Management",
    icon: "icon",
    children: [
      {
        label: "User management",
        href: "/blankPages",
      },
      {
        label: "Role management",
        href: "/blankPages",
      },
      {
        label: "Department management",
        href: "/blankPages",
      },
      {
        label: "Permission management",
        href: "/blankPages",
      },
      {
        label: "Workflow",
        href: "/blankPages",
      },
      {
        label: "System Configuration",
        href: "/blankPages",
      },
      {
        label: "Schedual task",
        href: "/blankPages",
      },
      {
        label: "password policy",
        href: "/blankPages",
      },
      {
        label: "audit log",
        href: "/blankPages",
      },
      {
        label: "activity log",
        href: "/blankPages",
      },
    ],
  },
  {
    header: "Create Job",
    icon: "icon",
    children: [
      {
        label: "Added Corporate Account",
        href: "/create-job/added-corporate-account",
      },
      {
        label: "Added Individual Account",
        href: "/blankPages",
      },
      {
        label: "special edd",
        href: "/blankPages",
      },
      {
        label: "adjust cash balance",
        href: "/blankPages",
      },
      {
        label: "broker transfer fee",
        href: "/blankPages",
      },
      {
        label: "setting FX rate",
        href: "/blankPages",
      },
      {
        label: "bank gateway",
        href: "/blankPages",
      },
      {
        label: "coin",
        href: "/blankPages",
      },
      {
        label: "coin listing",
        href: "/blankPages",
      },
      {
        label: "coin exchange pending",
        href: "/blankPages",
      },
      {
        label: "order engine control",
        href: "/blankPages",
      },
      {
        label: "exchange start-stop control",
        href: "/blankPages",
      },
      {
        label: "exchange config setting",
        href: "/blankPages",
      },
      {
        label: "packages",
        href: "/blankPages",
      },
      {
        label: "commision package setting",
        href: "/blankPages",
      },
      {
        label: "customer commission ",
        href: "/blankPages",
      },
      {
        label: "panalty fee setting",
        href: "/blankPages",
      },
      {
        label: "create panalty fee",
        href: "/blankPages",
      },
      {
        label: "label: airdrop setting",
        href: "/blankPages",
      },
      {
        label: "Orders/Trades",
        href: "/blankPages",
      },
      {
        label: "whitelist(bank)",
        href: "/blankPages",
      },
      {
        label: "change info",
        href: "/blankPages",
      },
    ],
  },
  {
    header: " TO DO List",
    icon: "icon",
    children: [
      { label: "corporate account opening", href: "/blankPages" },
      { label: "individual account opening", href: "/blankPages" },
      { label: "whitelist(bank)", href: "/blankPages" },
      { label: "change info", href: "/blankPages" },
      { label: "review KYB", href: "/blankPages" },
      { label: "review KYC", href: "/blankPages" },
      { label: "change risk and edd", href: "/blankPages" },
      { label: "STR monitoring", href: "/blankPages" },
      { label: "Lock Unlock", href: "/blankPages" },
      { label: "deposit cash", href: "/blankPages" },
      { label: "withdraw cash", href: "/blankPages" },
      { label: "DA withdraw", href: "/blankPages" },
      { label: "fx rate approve", href: "/blankPages" },
    ],
  },
  {
    header: "Enquiry",
    icon: "icon",
    children: [
      { label: "deposit/withdraw list", href: "/blankPages" },
      { label: "enquiry application", href: "/blankPages" },
      { label: "cutomer detail", href: "/blankPages" },
      { label: "deposit cash summary", href: "/blankPages" },
      { label: "withdraw cash summary", href: "/blankPages" },
      { label: "cash balance statement", href: "/blankPages" },
    ],
  },
  {
    header: "Reports",
    icon: "icon",
    children: [
      { label: "Customer Proxy Wallet (Deposit)", href: "/blankPages" },
      { label: "Customer Whitelist Wallet (Withdraw)", href: "/blankPages" },
      { label: "Digital Asset Outstanding by Customer", href: "/blankPages" },
      { label: "Digital Asset Movement by Customer", href: "/blankPages" },
      { label: "Digital Asset Movement by Coin", href: "/blankPages" },
      { label: "Digital Asset Outstanding by Coin", href: "/blankPages" },
      { label: "Digital Asset Balance by Coin", href: "/blankPages" },
      { label: "GAS API", href: "/blankPages" },
      { label: "Customer Summary GAS Report", href: "/blankPages" },
      { label: "Report GAS Transfer", href: "/blankPages" },
      { label: "Summary Gas Report", href: "/blankPages" },
      { label: "Summary Customer Wallet", href: "/blankPages" },
      { label: "Cold Wallet by Exchange", href: "/blankPages" },
      { label: "Summary Corporate Wallet", href: "/blankPages" },
      { label: "Cash Settlement", href: "/blankPages" },
      { label: "Coin Settlement", href: "/blankPages" },
      { label: "Transaction Log by Exchange", href: "/blankPages" },
      {
        label: "Report Adjust Coin Cause Re-Balance Cold/Hot",
        href: "/blankPages",
      },
      { label: "Report for Segregate Airdrop", href: "/blankPages" },
      { label: "NC Report", href: "/blankPages" },
      { label: "SEC Report", href: "/blankPages" },
      { label: "Customer Data Report", href: "/blankPages" },
      { label: "Confirmation Report", href: "/blankPages" },
      {
        label: "Daily Deposit Cash Summary by Bank Report",
        href: "/blankPages",
      },
      {
        label: "Daily Pending Deposit Summary by Transaction Date Report",
        href: "/blankPages",
      },
      {
        label: "Daily Withdrawal Cash Summary by Transaction Date Report",
        href: "/blankPages",
      },
      {
        label: "Daily Segregation for Cash Balance Type Report",
        href: "/blankPages",
      },
      { label: "Daily Total Segregation Report", href: "/blankPages" },
      { label: "Summary Digital Asset Fee", href: "/blankPages" },
      { label: "Daily Fiat Pre-fund and Outstanding", href: "/blankPages" },
      {
        label: "Daily Summary Cold Corporate Wallet With Custodian",
        href: "/blankPages",
      },
      {
        label: "Summary Cash Settlement with Counterparties",
        href: "/blankPages",
      },
      { label: "Export Loging Order", href: "/blankPages" },
      { label: "Customer Most Active By Value", href: "/blankPages" },
      { label: "Order Register", href: "/blankPages" },
      { label: "Foreign Exchange Average and Spread Log", href: "/blankPages" },
      { label: "DA deposit", href: "/blankPages" },
    ],
  },
  {
    header: "3rd party",
    icon: "icon",
    children: [
      { label: "BANK", href: "/blankPages" },
      { label: "CUSTODIAN", href: "/blankPages" },
      { label: "CDD", href: "/blankPages" },
      { label: "DOPA", href: "/blankPages" },
      { label: "NDID/ThaiD", href: "/blankPages" },
      { label: "Google", href: "/blankPages" },
      { label: "Azure AD", href: "/blankPages" },
      { label: "Amazon", href: "/blankPages" },
    ],
  },
  {
    header: "Customer",
    icon: "icon",
    children: [
      { label: "Login", href: "/login" },
      { label: "DA", href: "/blankPages" },
      { label: "Balance", href: "/blankPages" },
      { label: "Deposit/Withdraw DA", href: "/blankPages" },
      { label: "Deposit/Withdraw Cash", href: "/blankPages" },
      { label: "Google Authenticator", href: "/blankPages" },
    ],
  },
];
