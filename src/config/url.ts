import { TUrlConfig } from "./types";

export const urlConfig: TUrlConfig[] = [
  {
    header: "System Management",
    icon: "icon",
    pages: [1000, 1011],
    children: [
      // {
      //   label: "user management",
      //   href: "/system-management/user-management",
      //   pageId: 1001,
      // },
      // {
      //   label: "role management",
      //   href: "/system-management/role-management",
      //   pageId: 1002,
      // },
      // {
      //   label: "department management",
      //   href: "/system-management/department-management",
      //   pageId: 1003,
      // },
      // {
      //   label: "permission management",
      //   href: "/system-management/permission-management",
      //   pageId: 1004,
      // },
      // {
      //   label: "workflow",
      //   href: "/system-management/workflow",
      //   pageId: 1005,
      // },
      // {
      //   label: "system configuration",
      //   href: "/system-management/system-configuration",
      //   pageId: 1006,
      // },
      // {
      //   label: "schedual task",
      //   href: "/system-management/schedual-task",
      //   pageId: 1007,
      // },
      // {
      //   label: "password policy",
      //   href: "/system-management/password-policy",
      //   pageId: 1008,
      // },
      // {
      //   label: "audit log",
      //   href: "/system-management/audit-log",
      //   pageId: 1009,
      // },
      // {
      //   label: "activity log",
      //   href: "/system-management/activity-log",
      //   pageId: 1010,
      // },
    ],
  },
  {
    header: "Customer Management",
    icon: "icon",
    pages: [2000, 2023],
    children: [
      {
        label: "individual account",
        href: "/create-job/added-individual-account",
        pageId: 2002,
      },
      {
        label: "corporate account",
        href: "/create-job/added-corporate-account",
        pageId: 2001,
      },
      {
        label: "ICO campaign",
        href: "/create-job/added-ico",
        pageId: 2008,
      },
      {
        label: "edit individual account",
        href: "/create-job/change-individual-account",
        pageId: 2004,
      },
      {
        label: "edit corporate account",
        href: "/create-job/change-corporate-account",
        pageId: 2003,
      },
      {
        label: "edit ICO campaign",
        href: "/create-job/change-ico",
        pageId: 2009,
      },
      // {
      //   label: "orders/trades",
      //   href: "/create-job/orders-trades",
      //   pageId: 2005,
      // },
      {
        label: "cash deposite/withdraw",
        href: "/create-job/cash-deposit-withdraw",
        pageId: 2006,
      },
      // {
      //   label: "fx exchange",
      //   href: "/create-job/fx-exchange",
      //   pageId: 2007,
      // },
      // {
      //   label: "special edd",
      //   href: "/create-job/special-edd",
      //   pageId: 2003,
      // },
      // {
      //   label: "adjust cash balance",
      //   href: "/create-job/adjust-cash-balance",
      //   pageId: 2004,
      // },
      // {
      //   label: "broker transfer fee",
      //   href: "/create-job/broker-transfer-fee",
      //   pageId: 2005,
      // },
      // {
      //   label: "setting fx rate",
      //   href: "/create-job/setting-fx-rate",
      //   pageId: 2006,
      // },
      // {
      //   label: "bank gateway",
      //   href: "/create-job/bank-gateway",
      //   pageId: 2007,
      // },
      // {
      //   label: "coin listing",
      //   href: "/create-job/coin-listing",
      //   pageId: 2009,
      // },
      // {
      //   label: "coin exchange pending",
      //   href: "/create-job/coin-exchange-pending",
      //   pageId: 2010,
      // },
      // {
      //   label: "order engine control",
      //   href: "/create-job/order-engine-control",
      //   pageId: 2011,
      // },
      // {
      //   label: "exchange start-stop control",
      //   href: "/create-job/exchange-start-stop-control",
      //   pageId: 2012,
      // },
      // {
      //   label: "exchange config setting",
      //   href: "/create-job/exchange-config-setting",
      //   pageId: 2013,
      // },
      // {
      //   label: "packages",
      //   href: "/create-job/packages",
      //   pageId: 2014,
      // },
      // {
      //   label: "commission package setting",
      //   href: "/create-job/commission-package-setting",
      //   pageId: 2015,
      // },
      // {
      //   label: "customer commission",
      //   href: "/create-job/customer-commission",
      //   pageId: 2016,
      // },
      // {
      //   label: "penalty fee setting",
      //   href: "/create-job/penalty-fee-setting",
      //   pageId: 2017,
      // },
      // {
      //   label: "create penalty fee",
      //   href: "/create-job/create-penalty-fee",
      //   pageId: 2018,
      // },
      // {
      //   label: "airdrop setting",
      //   href: "/create-job/airdrop-setting",
      //   pageId: 2019,
      // },
      // {
      //   label: "whitelist(bank)",
      //   href: "/create-job/whitelist-bank",
      //   pageId: 2021,
      // },
      // {
      //   label: "change info",
      //   href: "/create-job/change-info",
      //   pageId: 2022,
      // },
    ],
  },
  {
    header: "Approval",
    icon: "icon",
    pages: [3000, 3016],
    children: [
      {
        label: "individual account",
        href: "/todo-list/individual-account-opening",
        pageId: 3002,
      },
      {
        label: "corporate account",
        href: "/todo-list/corporate-account-opening",
        pageId: 3001,
      },
      // {
      //   label: "individual account opening",
      //   href: "/todo-list/individual-account-opening",
      //   pageId: 3002,
      // },
      {
        label: "ICO compaign",
        href: "/todo-list/added-ico",
        pageId: 3007,
      },
      // {
      //   label:"account approval",
      //   href: "/todo-list/account-approval",
      //   pageId:3006
      // },
      // {
      //   label: "orders/trades",
      //   href: "/todo-list/orders-trades",
      //   pageId: 3003,
      // },
      {
        label: "cash deposite/withdraw",
        href: "/todo-list/cash-deposit-withdraw",
        pageId: 3004,
      },
      // {
      //   label:"fx exchange",
      //   href: "/todo-list/fx-exchange",
      //   pageId:3005
      // },

      // {
      //   label: "individual account opening",
      //   href: "/todo-list/individual-account-opening",
      //   pageId: 3002,
      // },
      {
        label: "account lock/unlock",
        href: "/todo-list/account-lockunlock",
        pageId: 3004,
      },
      // {
      //   label: "review KYB",
      //   href: "/todo-list/review-kyb",
      //   pageId: 3005,
      // },
      // {
      //   label: "review KYC",
      //   href: "/todo-list/review-kyc",
      //   pageId: 3006,
      // },
      // {
      //   label: "change risk and edd",
      //   href: "/todo-list/change-risk-and-edd",
      //   pageId: 3007,
      // },
      // {
      //   label: "STR monitoring",
      //   href: "/todo-list/str-monitoring",
      //   pageId: 3008,
      // },
      // {
      //   label: "lock unlock",
      //   href: "/todo-list/lock-unlock",
      //   pageId: 3009,
      // },
      // {
      //   label: "deposit cash",
      //   href: "/todo-list/deposit-cash",
      //   pageId: 3010,
      // },
      // {
      //   label: "withdraw cash",
      //   href: "/todo-list/withdraw-cash",
      //   pageId: 3011,
      // },
      // {
      //   label: "da withdraw",
      //   href: "/todo-list/da-withdraw",
      //   pageId: 3012,
      // },
      // {
      //   label: "fx rate approve",
      //   href: "/todo-list/fx-rate-approve",
      //   pageId: 3013,
      // },
    ],
  },
  {
    header: "Enquiry",
    icon: "icon",
    pages: [4000, 4007],
    children: [
      {
        label: "individual account",
        href: "/enquiry/individual",
        pageId: 4002,
      },
      {
        label: "corporate account",
        href: "/enquiry/corporate",
        pageId: 4001,
      },
      {
        label: "ICO  campaign",
        href: "/enquiry/ico-campaign",
        pageId: 4003,
      },
      // {
      //   label: "deposit/withdraw list",
      //   href: "/enquiry/deposit-withdraw-list",
      //   pageId: 4001,
      // },
      // {
      //   label: "enquiry application",
      //   href: "/enquiry/enquiry-application",
      //   pageId: 4002,
      // },
      // {
      //   label: "cutomer detail",
      //   href: "/enquiry/cutomer-detail",
      //   pageId: 4003,
      // },
      // {
      //   label: "deposit cash summary",
      //   href: "/enquiry/deposit-cash-summary",
      //   pageId: 4004,
      // },
      // {
      //   label: "withdraw cash summary",
      //   href: "/enquiry/withdraw-cash-summary",
      //   pageId: 4005,
      // },
      // {
      //   label: "cash balance statement",
      //   href: "/enquiry/cash-balance-statement",
      //   pageId: 4006,
      // },
    ],
  },
  // {
  //   header: "Reports",
  //   icon: "icon",
    // pages: [5000, 5038],
    // children: [
      // {
      //   label: "Customer Proxy Wallet (Deposit)",
      //   href: "/reports/customer-proxy-wallet-deposit",
      //   pageId: 5001,
      // },
      // {
      //   label: "Customer Whitelist Wallet (Withdraw)",
      //   href: "/reports/customer-whitelist-wallet-withdraw",
      //   pageId: 5002,
      // },
      // {
      //   label: "Digital Asset Outstanding by Customer",
      //   href: "/reports/digital-asset-outstanding-by-customer",
      //   pageId: 5003,
      // },
      // {
      //   label: "Digital Asset Movement by Customer",
      //   href: "/reports/digital-asset-movement-by-customer",
      //   pageId: 5004,
      // },
      // {
      //   label: "Digital Asset Movement by Coin",
      //   href: "/reports/digital-asset-movement-by-coin",
      //   pageId: 5005,
      // },
      // {
      //   label: "Digital Asset Outstanding by Coin",
      //   href: "/reports/digital-asset-outstanding-by-coin",
      //   pageId: 5006,
      // },
      // {
      //   label: "Digital Asset Balance by Coin",
      //   href: "/reports/digital-asset-balance-by-coin",
      //   pageId: 5007,
      // },
      // {
      //   label: "GAS API",
      //   href: "/reports/gas-api",
      //   pageId: 5008,
      // },
      // {
      //   label: "Customer Summary GAS Report",
      //   href: "/reports/customer-summary-gas-report",
      //   pageId: 5009,
      // },
      // {
      //   label: "Report GAS Transfer",
      //   href: "/reports/report-gas-transfer",
      //   pageId: 5010,
      // },
      // {
      //   label: "Summary Gas Report",
      //   href: "/reports/summary-gas-report",
      //   pageId: 5011,
      // },
      // {
      //   label: "Summary Customer Wallet",
      //   href: "/reports/summary-customer-wallet",
      //   pageId: 5012,
      // },
      // {
      //   label: "Cold Wallet by Exchange",
      //   href: "/reports/cold-wallet-by-exchange",
      //   pageId: 5013,
      // },
      // {
      //   label: "Summary Corporate Wallet",
      //   href: "/reports/summary-corporate-wallet",
      //   pageId: 5014,
      // },
      // {
      //   label: "Cash Settlement",
      //   href: "/reports/cash-settlement",
      //   pageId: 5015,
      // },
      // {
      //   label: "Coin Settlement",
      //   href: "/reports/coin-settlement",
      //   pageId: 5016,
      // },
      // {
      //   label: "Transaction Log by Exchange",
      //   href: "/reports/transaction-log-by-exchange",
      //   pageId: 5017,
      // },
      // {
      //   label: "Report Adjust Coin Cause Re-Balance Cold/Hot",
      //   href: "/reports/report-adjust-coin-cause-re-balance-cold-hot",
      //   pageId: 5018,
      // },
      // {
      //   label: "Report for Segregate Airdrop",
      //   href: "/reports/report-for-segregate-airdrop",
      //   pageId: 5019,
      // },
      // {
      //   label: "NC Report",
      //   href: "/reports/nc-report",
      //   pageId: 5020,
      // },
      // {
      //   label: "SEC Report",
      //   href: "/reports/sec-report",
      //   pageId: 5021,
      // },
      // {
      //   label: "Customer Data Report",
      //   href: "/reports/customer-data-report",
      //   pageId: 5022,
      // },
      // {
      //   label: "Confirmation Report",
      //   href: "/reports/confirmation-report",
      //   pageId: 5023,
      // },
      // {
      //   label: "Daily Deposit Cash Summary by Bank Report",
      //   href: "/reports/daily-deposit-cash-summary-by-bank-report",
      //   pageId: 5024,
      // },
      // {
      //   label: "Daily Pending Deposit Summary by Transaction Date Report",
      //   href: "/reports/daily-pending-deposit-summary-by-transaction-date-report",
      //   pageId: 5025,
      // },
      // {
      //   label: "Daily Withdrawal Cash Summary by Transaction Date Report",
      //   href: "/reports/daily-withdrawal-cash-summary-by-transaction-date-report",
      //   pageId: 5026,
      // },
      // {
      //   label: "Daily Segregation for Cash Balance Type Report",
      //   href: "/reports/daily-segregation-for-cash-balance-type-report",
      //   pageId: 5027,
      // },
      // {
      //   label: "Daily Total Segregation Report",
      //   href: "/reports/daily-total-segregation-report",
      //   pageId: 5028,
      // },
      // {
      //   label: "Summary Digital Asset Fee",
      //   href: "/reports/summary-digital-asset-fee",
      //   pageId: 5029,
      // },
      // {
      //   label: "Daily Fiat Pre-fund and Outstanding",
      //   href: "/reports/daily-fiat-pre-fund-and-outstanding",
      //   pageId: 5030,
      // },
      // {
      //   label: "Daily Summary Cold Corporate Wallet With Custodian",
      //   href: "/reports/daily-summary-cold-corporate-wallet-with-custodian",
      //   pageId: 5031,
      // },
      // {
      //   label: "Summary Cash Settlement with Counterparties",
      //   href: "/reports/summary-cash-settlement-with-counterparties",
      //   pageId: 5032,
      // },
      // {
      //   label: "Export Loging Order",
      //   href: "/reports/export-loging-order",
      //   pageId: 5033,
      // },
      // {
      //   label: "Customer Most Active By Value",
      //   href: "/reports/customer-most-active-by-value",
      //   pageId: 5034,
      // },
      // {
      //   label: "Order Register",
      //   href: "/reports/order-register",
      //   pageId: 5035,
      // },
      // {
      //   label: "Foreign Exchange Average and Spread Log",
      //   href: "/reports/foreign-exchange-average-and-spread-log",
      //   pageId: 5036,
      // },
      // {
      //   label: "DA deposit",
      //   href: "/reports/da-deposit",
      //   pageId: 5037,
      // },
    // ],
  // },
  {
    header: "Reports",
    icon: "icon",
    pages: [6000, 6002],
    children: [
      {
        label: "SEC Reports",
        href: "reports/sec-reports",
        pageId: 6001,
      },
      // {
      //   label: "NC Reports",
      //   href: "reports/nc-reports",
      //   pageId: 6002,
      // },
    ],
  },
];
