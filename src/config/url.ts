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
  // {
  //   header: "Corporate",
  //   icon: "",
  //   children: [
  //     {
  //       label: "create",
  //       href: "/corporate/create",
  //     },
  //   ],
  // },
  {
    header: "System Management",
    icon: "icon",
    children: [
      {
        label: "User management",
        href: "",
      },
      {
        label: "Role management",
        href: "",
      },
      {
        label: "Department management",
        href: "",
      },
      {
        label: "Permission management",
        href: "",
      },
      {
        label: "Workflow",
        href: "",
      },
      {
        label: "System Configuration",
        href: "",
      },
      {
        label: "Schedual task",
        href: "",
      },
      {
        label: "password policy",
        href: "",
      },
      {
        label: "audit log",
        href: "",
      },
      {
        label: "activity log",
        href: "",
      },
    ],
  },
  {
    header: "Create Job",
    icon: "icon",
    children: [
      {
        label: "Added Corporate Account",
        href: "",
      },
      {
        label: "Added Individual Account",
        href: "",
      },
      {
        label: "special edd",
        href: "",
      },
      {
        label: "adjust cash balance",
        href: "",
      },
      {
        label: "broker transfer fee",
        href: "",
      },
      {
        label: "setting FX rate",
        href: "",
      },
      {
        label: "bank gateway",
        href: "",
      },
      {
        label: "coin",
        href: "",
      },
      {
        label: "coin listing",
        href: "",
      },
      {
        label: "coin exchange pending",
        href: "",
      },
      {
        label: "order engine control",
        href: "",
      },
      {
        label: "exchange start-stop control",
        href: "",
      },
      {
        label: "exchange config setting",
        href: "",
      },
      {
        label: "packages",
        href: "",
      },
      {
        label: "commision package setting",
        href: "",
      },
      {
        label: "customer commission ",
        href: "",
      },
      {
        label: "panalty fee setting",
        href: "",
      },
      {
        label: "create panalty fee",
        href: "",
      },
      {
        label: "label: airdrop setting",
        href: "",
      },
      {
        label: "Orders/Trades",
        href: "",
      },
      {
        label: "whitelist(bank)",
        href: "",
      },
      {
        label: "change info",
        href: "",
      },
    ],
  },
  {
    header: " TO DO List",
    icon: "icon",
    children: [
      { label: "corporate account opening", href: "/corporate/create" },
      { label: "individual account opening", href: "" },
      { label: "whitelist(bank)", href: "" },
      { label: "change info", href: "" },
      { label: "review KYB", href: "" },
      { label: "review KYC", href: "" },
      { label: "change risk and edd", href: "" },
      { label: "STR monitoring", href: "" },
      { label: "Lock Unlock", href: "" },
      { label: "deposit cash", href: "" },
      { label: "withdraw cash", href: "" },
      { label: "DA withdraw", href: "" },
      { label: "fx rate approve", href: "" },
    ],
  },
  {
    header: "Enquiry",
    icon: "icon",
    children: [
      { label: "deposit/withdraw list", href: "" },
      { label: "enquiry application", href: "" },
      { label: "cutomer detail", href: "" },
      { label: "deposit cash summary", href: "" },
      { label: "withdraw cash summary", href: "" },
      { label: "cash balance statement", href: "" },
    ],
  },
  {
    header: "Reports",
    icon: "icon",
    children: [
      { label: "Customer Proxy Wallet (Deposit)", href: "" },
      { label: "Customer Whitelist Wallet (Withdraw)", href: "" },
      { label: "Digital Asset Outstanding by Customer", href: "" },
      { label: "Digital Asset Movement by Customer", href: "" },
      { label: "Digital Asset Movement by Coin", href: "" },
      { label: "Digital Asset Outstanding by Coin", href: "" },
      { label: "Digital Asset Balance by Coin", href: "" },
      { label: "GAS API", href: "" },
      { label: "Customer Summary GAS Report", href: "" },
      { label: "Report GAS Transfer", href: "" },
      { label: "Summary Gas Report", href: "" },
      { label: "Summary Customer Wallet", href: "" },
      { label: "Cold Wallet by Exchange", href: "" },
      { label: "Summary Corporate Wallet", href: "" },
      { label: "Cash Settlement", href: "" },
      { label: "Coin Settlement", href: "" },
      { label: "Transaction Log by Exchange", href: "" },
      { label: "Report Adjust Coin Cause Re-Balance Cold/Hot", href: "" },
      { label: "Report for Segregate Airdrop", href: "" },
      { label: "NC Report", href: "" },
      { label: "SEC Report", href: "" },
      { label: "Customer Data Report", href: "" },
      { label: "Confirmation Report", href: "" },
      { label: "Daily Deposit Cash Summary by Bank Report", href: "" },
      {
        label: "Daily Pending Deposit Summary by Transaction Date Report",
        href: "",
      },
      {
        label: "Daily Withdrawal Cash Summary by Transaction Date Report",
        href: "",
      },
      { label: "Daily Segregation for Cash Balance Type Report", href: "" },
      { label: "Daily Total Segregation Report", href: "" },
      { label: "Summary Digital Asset Fee", href: "" },
      { label: "Daily Fiat Pre-fund and Outstanding", href: "" },
      { label: "Daily Summary Cold Corporate Wallet With Custodian", href: "" },
      { label: "Summary Cash Settlement with Counterparties", href: "" },
      { label: "Export Loging Order", href: "" },
      { label: "Customer Most Active By Value", href: "" },
      { label: "Order Register", href: "" },
      { label: "Foreign Exchange Average and Spread Log", href: "" },
      { label: "DA deposit", href: "" },
    ],
  },
  {
    header: "3rd party",
    icon: "icon",
    children: [
      { label: "BANK", href: "" },
      { label: "CUSTODIAN", href: "" },
      { label: "CDD", href: "" },
      { label: "DOPA", href: "" },
      { label: "NDID/ThaiD", href: "" },
      { label: "Google", href: "" },
      { label: "Azure AD", href: "" },
      { label: "Amazon", href: "" },
    ],
  },
  {
    header: "Customer",
    icon: "icon",
    children: [
      { label: "Login", href: "/login" },
      { label: "DA", href: "" },
      { label: "Balance", href: "" },
      { label: "Deposit/Withdraw DA", href: "" },
      { label: "Deposit/Withdraw Cash", href: "" },
      { label: "Google Authenticator", href: "" },
    ],
  },
];
