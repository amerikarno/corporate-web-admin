import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import { TContact, TCorporateData, TJuristic } from "../../constant/type";
import {
  TAuthorizedPersonSchema,
  TContactPersonSchema,
  TCorporateInfoSchema,
} from "../constants/schemas";
import {
  TAuthorizePerson,
  TContactPerson,
  TDirector,
  TIndividualsShareholders,
  TJuristicsShareholders,
} from "../constants/types";
import { TDirector as TDirectorEdit } from "../../constant/type";
import { TIndividualShareholder as TIndividualShareholderEdit } from "../../constant/type";
import { TAuthorizedPerson as TAuthorizedPersonEdit } from "../../constant/type";
import { TBank as TBankEdit } from "../../constant/type";
import { TBank } from "../constants/types";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { mapKey, TMapKeyLabel } from "../constants/variables";
import { copy } from "@/lib/utils";
import { initailJuristicTypeAndIncome } from "../constants/initialData";
export function formatDateToIsoString(date: Date): string {
  const isoString = date.toISOString();
  const formattedDate = isoString.replace(/\.\d{3}Z$/, "+00:00");
  return formattedDate;
}

export const isExpiredToken = (): boolean => {
  const token = getCookies();
  let isExpired = true;
  if (token && token !== null) {
    try {
      const user = jwtDecode(token);

      if (user && user.exp) {
        const dateTime = new Date(user.exp * 1000);
        isExpired = new Date().getTime() > dateTime.getTime();
      } else {
        console.log("Invalid token: exp field is missing.");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return isExpired;
};

export const findAddress = (data: TCorporateData, type: number) => {
  for (let i = 0; i < data.CorporateAddress.length; i++) {
    const element = data.CorporateAddress[i];
    if (element.address[0].types === type) {
      return element;
    }
  }
};
export const mapDataToTCorporateInfo = (data: TCorporateData) => {
  try {
    let resRegisterCountry = findAddress(data, 702);
    let resPlaceofIncorporation = findAddress(data, 701);
    let resCorpRegisterCountry = data.CorporateCountry.find(
      (item) => item.types === 601
    );
    let resCorpPrimaryCountry = data.CorporateCountry.find(
      (item) => item.types === 601
    );

    // const timeStamp = Date.parse(data.Info.dateOfIncorporation);
    // let dt = new Date(timeStamp).toLocaleDateString("th-TH");

    let result: TCorporateInfoSchema = {
      name: data.Info.name,
      registrationNo: data.Info.registrationNo,
      taxId: data.Info.taxId,
      dateofincorporation: data.Info.dateOfIncorporation.split("T")[0],
      // dateofincorporation: dt,
      // dateofincorporation: new Date(timeStamp),
      registered: resCorpRegisterCountry?.other || "",
      primary: resCorpPrimaryCountry?.other || "",
      registeredBusiness: {
        address: [
          {
            addressNo: resRegisterCountry?.address[0]?.addressNo || "",
            building: resRegisterCountry?.address[0].building || "",
            floor: resRegisterCountry?.address[0].floor || "",
            mooNo: resRegisterCountry?.address[0].mooNo || "",
            soi: resRegisterCountry?.address[0].soi || "",
            road: resRegisterCountry?.address[0].road || "",
            tambon: resRegisterCountry?.address[0].tambon || "",
            amphoe: resRegisterCountry?.address[0].amphoe || "",
            province: resRegisterCountry?.address[0].province || "",
            postalCode: resRegisterCountry?.address[0].postalCode || "",
            country: resRegisterCountry?.address[0].country || "",
          },
        ],
        emailAddress: resRegisterCountry?.emailAddress || "",
        telephone: resRegisterCountry?.telephone || "",
      },
      placeofIncorporation: {
        address: [
          {
            addressNo: resPlaceofIncorporation?.address[0]?.addressNo || "",
            building: resPlaceofIncorporation?.address[0]?.building || "",
            floor: resPlaceofIncorporation?.address[0]?.floor || "",
            mooNo: resPlaceofIncorporation?.address[0]?.mooNo || "",
            soi: resPlaceofIncorporation?.address[0]?.soi || "",
            road: resPlaceofIncorporation?.address[0]?.road || "",
            tambon: resPlaceofIncorporation?.address[0]?.tambon || "",
            amphoe: resPlaceofIncorporation?.address[0]?.amphoe || "",
            province: resPlaceofIncorporation?.address[0]?.province || "",
            postalCode: resPlaceofIncorporation?.address[0]?.postalCode || "",
            country: resPlaceofIncorporation?.address[0]?.country || "",
          },
        ],
        emailAddress: resPlaceofIncorporation?.emailAddress || "",
        telephone: resPlaceofIncorporation?.telephone || "",
      },
      registeredCapital: data.CorporateFinancials.registeredCapital || 0,
      revenuePerYear: data.CorporateFinancials.revenuePerYear || 0,
      netProFitLoss: data.CorporateFinancials.netProfitLoss || 0,
      shareholderEquity: data.CorporateFinancials.shareholderEquity || 0,
    };

    return result;
  } catch (error) {
    console.log("cast type error", error);
  }
};

export const mapDataToTContactPerson = (
  data: TContact | null
): TContactPerson | null => {
  try {
    if (data === null) {
      return null;
    }
    const fullName = data.fullNames[0];
    const result: TContactPerson = {
      fullNames: [
        {
          title: fullName.title ?? "",
          firstName: fullName.firstName ?? "",
          lastName: fullName.lastName ?? "",
        },
      ],
      position: data.position ?? "",
      division: data.division ?? "",
      telephone: data.telephone ?? "",
      email: data.email ?? "",
      personalId: data.id ?? "",
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

export const mapDataToTDirector = (
  data: TDirectorEdit | null
): TDirector | null => {
  try {
    if (data === null) {
      return null;
    }

    const dateFormatted = data?.expiryDate?.split("T")[0]; // "2024-08-29"
    // console.log(dateFormatted)
    // const dateParts = dateFormatted.split('-'); // ["2024", "08", "29"]
    // const date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
    const result: TDirector = {
      fullNames: [
        {
          title: data?.fullNames[0].title ?? "",
          firstName: data?.fullNames[0].firstName ?? "",
          lastName: data?.fullNames[0].lastName ?? "",
        },
      ],
      citizenId: data?.citizenId ?? "",
      passportId: data?.passportId ?? "",
      expiryDate: dateFormatted ?? "",
      nationality: data?.nationality ?? "",
      types: data?.types ?? "",
      personalId: data?.personalId ?? "",
      addresses:
        data?.addresses?.length > 0
          ? data?.addresses
          : [
              {
                addressNo: "",
                building: "",
                floor: "",
                mooNo: "",
                soi: "",
                road: "",
                tambon: "",
                amphoe: "",
                province: "",
                postalCode: "",
                country: "",
              },
            ],
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

export const mapDataToTIndividualShareholder = (
  data: TIndividualShareholderEdit | null
): TIndividualsShareholders | null => {
  try {
    if (data === null) {
      return null;
    }
    const dateFormatted = data.expiryDate?.split("T")[0];
    const fullName = data.fullNames[0];
    const result: TIndividualsShareholders = {
      corporateCode: String(data.corporateCode ?? ""),
      fullNames: [
        {
          title: fullName.title ?? "",
          firstName: fullName.firstName ?? "",
          lastName: fullName.lastName ?? "",
        },
      ],
      citizenId: data.citizenId ?? "",
      passportId: data.passportId ?? "",
      expiryDate: dateFormatted || "",
      nationality: data.nationality ?? "",
      sharePercentage: data.sharePercentage ?? 0,
      personalId: data.personalId ?? null,
      types: data.types ?? undefined,
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

export const mapDataToTJuristicShareholder = (
  data: TJuristic | null
): TJuristicsShareholders | null => {
  try {
    if (data === null) {
      return null;
    }

    const result: TJuristicsShareholders = {
      corporateCode: String(data.corporateCode ?? ""),
      juristicName: data.juristicName ?? "",
      registrationNo: data.registrationNo ?? "",
      registeredCountry: data.registeredCountry ?? "",
      sharePercentage: data.sharePercentage ?? 0,
      juristicId: data.id ?? "",
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

export const mapDataToTAuthoirzedPerson = (
  data: TAuthorizedPersonEdit | null
): TAuthorizePerson | null => {
  try {
    if (data === null) {
      return null;
    }
    const dateFormatted = data.expiryDate?.split("T")[0]; // "2024-08-29"
    // const dateParts = dateFormatted.split("-"); // ["2024", "08", "29"]
    // const date = new Date(
    //   Number(dateParts[0]),
    //   Number(dateParts[1]) - 1,
    //   Number(dateParts[2])
    // );
    const result: TAuthorizedPersonSchema = {
      corporateCode: String(data.corporateCode ?? ""),
      fullNames: [
        {
          title: data?.fullNames[0].title ?? "",
          firstName: data?.fullNames[0].firstName ?? "",
          lastName: data?.fullNames[0].lastName ?? "",
        },
      ],
      passportId: data?.passportId ?? "",
      citizenId: data?.citizenId ?? "",
      expiryDate: dateFormatted ?? "",
      nationality: data?.nationality ?? "",
      personalId: data?.personalId ?? "",
      addresses:
        data?.addresses?.length > 0
          ? data?.addresses
          : [
              {
                addressNo: "",
                building: "",
                floor: "",
                mooNo: "",
                soi: "",
                road: "",
                tambon: "",
                amphoe: "",
                province: "",
                postalCode: "",
                country: "",
              },
            ],
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

type TBankWithID = {
  CorporateCode?: string;
  bank: TBank[];
  BankId?: string;
};
export const mapDataToTBank = (data: TBankEdit | null): TBankWithID | null => {
  try {
    if (data === null) {
      return null;
    }

    const result: TBankWithID = {
      CorporateCode: String(data.corporateCode ?? ""),
      BankId: data.id ?? "",
      bank: [
        {
          accountType: data.accountType ?? "",
          bankName: data.bankName ?? "",
          accountNo: data.accountNo ?? "",
          accountLocation: data.accountLocation ?? "",
          swiftCode: data.swiftCode ?? "",
        },
      ],
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

export const getCheckedLabel = (corpData: TCorporateData) => {
  // const corpType = corpData?.CorporateTypes;
  // const bsType = corpData?.BusinessTypes;
  // const srcIncome = corpData?.SourceOfIncomes;
  // const countrySrcIncome =
  //   corpData?.CountrySourceIncomes && corpData.CountrySourceIncomes[0];
  // const invObj = corpData?.CountrySourceIncomes;
  // const countrySrcOfIncomeThailand = countrySrcIncome?.corporateCountry;

  // const keysToRemove = [
  //   "id",
  //   "createBy",
  //   "CreatedAt",
  //   "DeletedAt",
  //   "corporateCode",
  //   "corporateCountry",
  //   "types",
  // ];

  // var jrType;
  // var buType;
  // var srcOfIncome;
  // var countrySrcOfIncome;
  // var invType;
  // var countrySrcOfIncomeTh;

  // if (corpType && corpType !== null) {
  //   const filteredKeysCorpType = Object.keys(corpType).filter(
  //     (key) => !keysToRemove.includes(key)
  //   );
  //   console.log(filteredKeysCorpType);
  //   jrType = mapKey[filteredKeysCorpType[0] as keyof TMapKeyLabel];
  //   console.log(jrType);
  // }

  // if (bsType && bsType !== null) {
  //   const filteredKeysBSType = Object.keys(bsType).filter(
  //     (key) => !keysToRemove.includes(key)
  //   );
  //   console.log(filteredKeysBSType);
  //   buType = mapKey[filteredKeysBSType[0] as keyof TMapKeyLabel];
  //   console.log(buType);
  // }

  // if (srcIncome && srcIncome !== null) {
  //   const filteredKeysSrcIncome = Object.keys(srcIncome).filter(
  //     (key) => !keysToRemove.includes(key)
  //   );
  //   console.log(filteredKeysSrcIncome);
  //   srcOfIncome = mapKey[filteredKeysSrcIncome[0] as keyof TMapKeyLabel];
  //   console.log(srcOfIncome);
  // }

  // if (countrySrcIncome && countrySrcIncome !== null) {
  //   const filteredKeysCountrySrcIncome = Object.keys(countrySrcIncome!).filter(
  //     (key) => !keysToRemove.includes(key)
  //   );
  //   console.log(filteredKeysCountrySrcIncome);
  //   countrySrcOfIncome =
  //     mapKey[filteredKeysCountrySrcIncome[0] as keyof TMapKeyLabel];
  //   console.log(countrySrcOfIncome);
  // }

  // if (invObj && invObj !== null) {
  //   const filteredKeysInvObj = Object.keys(invObj).filter(
  //     (key) => !keysToRemove.includes(key)
  //   );
  //   console.log(filteredKeysInvObj);
  //   invType = mapKey[filteredKeysInvObj[0] as keyof TMapKeyLabel];
  //   console.log(invType);
  // }

  // if (countrySrcOfIncomeThailand && countrySrcOfIncomeThailand !== null) {
  //   const filteredKeysCountrySrcOfIncomeThailand = Object.keys(
  //     countrySrcOfIncomeThailand
  //   ).filter((key) => !keysToRemove.includes(key));
  //   console.log(filteredKeysCountrySrcOfIncomeThailand);
  //   countrySrcOfIncomeTh =
  //     mapKey[filteredKeysCountrySrcOfIncomeThailand[0] as keyof TMapKeyLabel];
  //   console.log(countrySrcOfIncomeThailand);
  // }

  const jrType = corpData?.CorporateTypes;
  const buType = corpData?.BusinessTypes;
  const srcOfIncome = corpData?.SourceOfIncomes;
  const countrySrcOfIncome =
    corpData?.CountrySourceIncomes && corpData.CountrySourceIncomes[0];
  const invType = corpData?.CountrySourceIncomes;
  const countrySrcOfIncomeTh = countrySrcOfIncome?.corporateCountry;

  let tmp = {
    isJuristicThailand: jrType.isJuristicThailand,
    isTaxExempt: jrType.isTaxExempt,
    isNonTaxExempt: jrType.isNonTaxExempt,
    isJuristicForeign: jrType.isJuristicForeign,
    isOperatingInThailand: jrType.isOperatingInThailand,
    isNonOperatingInThailand: jrType.isNonOperatingInThailand,
    isOther: jrType.isOther,
    isPartnership: jrType.isPartnership,
    isGovernmentStateEnterprise: jrType.isGovernmentStateEnterprise,
    isTaxExemptCompany: jrType.isTaxExemptCompany,
    isAntiqueTrading: false,
    isHotelRestaurant: false,
    isArmament: false,
    isInsuranceAssurance: false,
    isCasinoGambling: false,
    isJewelryGoldTrading: false,
    isFoundation: false,
    isPropertyRealEstate: false,
    isMoneyTransfer: false,
    isEmploymentAgency: false,
    isEntertainment: false,
    isTravel: false,
    isFinancial: false,
    isEducationCenter: false,
    isForeignCurrencyExchange: false,
    isCryptoRelated: false,
    isOtherBusiness: false,
    isRevenue: false,
    isStock: false,
    isDonation: false,
    isLoan: false,
    isRevenueSelling: false,
    isOtherIncome: false,
    isThailand: false,
    isOtherThailand: false,
    isLiquidation: false,
    isInvestment: false,
    isCashManagement: false,
    isOtherInvestMent: false,
  };

  return {
    jrType,
    buType,
    srcOfIncome,
    countrySrcOfIncome,
    invType,
    countrySrcOfIncomeTh,
  };
};
