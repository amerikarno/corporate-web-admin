import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import {
  CorporateResponse,
  TContact,
  TCorporateData,
  TDocuments,
  TJuristic,
} from "../../constant/type";

import { TAuthorizedPersonSchema,TCorporateInfoSchema } from "@/pages/createJob/addedCorporateAccount/constants2/schemas";
import {
  TAttorney,
  TAuthorizePerson,
  TContactPerson,
  TDirector,
  TIndividualsShareholders,
  TJuristicsShareholders,
} from "@/pages/createJob/addedCorporateAccount/constants2/types";
import { TDirector as TDirectorEdit } from "../../constant/type";
import { TIndividualShareholder as TIndividualShareholderEdit } from "../../constant/type";
import { TAuthorizedPerson as TAuthorizedPersonEdit } from "../../constant/type";
import { TBank as TBankEdit } from "../../constant/type";
import { TBank } from "../constants/types";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { CorporateTypeBody } from "@/pages/createJob/addedCorporateAccount/constants2/types";
import { TAttorney as TAttorneyEdit } from "../../constant/type";

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
      (item) => item.types === 602
    );

    // const timeStamp = Date.parse(data.Info.dateOfIncorporation);
    // let dt = new Date(timeStamp).toLocaleDateString("th-TH");

    let result: TCorporateInfoSchema = {
      name: data.Info.name,
      registrationNo: data.Info.registrationNo,
      taxId: data.Info.taxId,
      dateOfIncorporation: data.Info.dateOfIncorporation.split("T")[0],
      // dateOfIncorporation: dt,
      // dateOfIncorporation: new Date(timeStamp),
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
      registeredCapital: String(data.CorporateFinancials.registeredCapital || ""),
      revenuePerYear: String(data.CorporateFinancials.revenuePerYear || ""),
      netProFitLoss: String(data.CorporateFinancials.netProfitLoss || ""),
      shareholderEquity: String(data.CorporateFinancials.shareholderEquity || ""),
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
          title: data?.fullNames?.[0]?.title ?? "",
          firstName: data?.fullNames?.[0]?.firstName ?? "",
          lastName: data?.fullNames?.[0]?.lastName ?? "",
        },
      ],
      citizenId: data?.citizenId ?? "",
      passportId: data?.passportId ?? "",
      expiryDate: dateFormatted ?? "",
      nationality: data?.nationality ?? "",
      types: data?.types ?? undefined,
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
    const result: TIndividualsShareholders = {
      registerId: String(data.registerId ?? ""),
      fullNames: [
        {
          title: data.fullNames[0].title ?? "",
          firstName: data.fullNames[0].firstName ?? "",
          lastName: data.fullNames[0].lastName ?? "",
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
      registerId: String(data.registerId ?? ""),
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
      registerId: String(data.registerId ?? ""),
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
  registerId?: string;
  bank: TBank[];
  BankId?: string;
};
export const mapDataToTBank = (data: TBankEdit | null): TBankWithID | null => {
  try {
    if (data === null) {
      return null;
    }

    const result: TBankWithID = {
      registerId: String(data.registerId ?? ""),
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
  const jrType = corpData?.CorporateTypes;
  const buType = corpData?.BusinessTypes;
  const srcOfIncome = corpData?.SourceOfIncomes;
  const countrySrcOfIncome =
    corpData?.CountrySourceIncomes && corpData.CountrySourceIncomes[0];
  const invType = corpData?.CountrySourceIncomes
    ? corpData.CountrySourceIncomes[0]
    : null;
  const countrySrcOfIncomeTh = countrySrcOfIncome?.corporateCountry;

  // console.log(JSON.stringify(corpData, null, 2));

  return {
    jrType,
    buType,
    srcOfIncome,
    countrySrcOfIncome,
    invType,
    countrySrcOfIncomeTh,
  };
};

export const getFrom2Response = () => {
  const corpData = useSelector((state: RootState) => state.editCorporate);
  // const juristicType = useSelector((state: RootState) => state.juristicType);
  // console.log(JSON.stringify(juristicType, null, 2));
  // if (juristicType.registerId === 0) {
  const {
    jrType,
    buType,
    srcOfIncome,
    countrySrcOfIncome,
    invType,
    countrySrcOfIncomeTh,
  } = getCheckedLabel(corpData) || {};

  let res: CorporateResponse = {
    ...jrType,
    ...buType,
    ...srcOfIncome,
    ...countrySrcOfIncome,
    ...invType,
    ...countrySrcOfIncomeTh,
  };
  // console.log(JSON.stringify(res, null, 2));
  return res;
  // } else {
  //   return juristicType;
  // }
};

export const mapDataToTAttorney = (
  data: TAttorneyEdit | null
): TAttorney | null => {
  try {
    if (data === null) {
      return null;
    }
    const dateFormatted = data.expiryDate?.split("T")[0];
    const result: TAttorney = {
      registerId: String(data.registerId ?? ""),
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
          ? data?.addresses.map(address => ({
              addressNo: address.addressNo ?? "",
              building: address.building ?? "",
              floor: address.floor ?? "",
              mooNo: address.mooNo ?? "",
              soi: address.soi ?? "",
              road: address.road ?? "",
              tambon: address.tambon ?? "",
              amphoe: address.amphoe ?? "",
              province: address.province ?? "",
              postalCode: address.postalCode ?? "",
              country: address.country ?? "",
            }))
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
      email: data?.email ?? "",
      telephone: data?.telephone ?? "",
    };

    return result;
  } catch (error) {
    console.error("Cast type error", error);
    return null;
  }
};

export const mapToForm2Create = (data:CorporateResponse) :CorporateTypeBody | any =>{
  try {
    if (data === null) {
      return null;
    }

    const result: CorporateTypeBody = {
      isJuristicThailand: data.isJuristicThailand,
      isTaxExempt:data.isTaxExempt,
      isNonTaxExempt:data.isNonTaxExempt,
      isJuristicForeign:data.isJuristicForeign,
      isOperatingInThailand:data.isOperatingInThailand,
      isNonOperatingInThailand:data.isNonOperatingInThailand,
      isOther:data.isOther,
      isPartnership:data.isPartnership,
      isGovernmentStateEnterprise: data.isGovernmentStateEnterprise,
      isTaxExemptCompany: data.isTaxExemptCompany,
      isAntiqueTrading: data.isAntiqueTrading,
      isHotelRestaurant: data.isHotelRestaurant,
      isArmament: data.isArmament,
      isInsuranceAssurance: data.isInsuranceAssurance,
      isCasinoGambling: data.isCasinoGambling,
      isJewelryGoldTrading: data.isJewelryGoldTrading,
      isFoundation: data.isFoundation,
      isPropertyRealEstate: data.isPropertyRealEstate,
      isMoneyTransfer: data.isMoneyTransfer,
      isEmploymentAgency: data.isEmploymentAgency,
      isEntertainment: data.isEntertainment,
      isTravel: data.isTravel,
      isFinancial: data.isFinancial,
      isEducationCenter: data.isEducationCenter,
      isForeignCurrencyExchange: data.isForeignCurrencyExchange,
      isCryptoRelated: data.isCryptoRelated,
      isOtherBusiness: data.isOtherBusiness,
      isRevenue: data.isRevenue,
      isStock: data.isStock,
      isDonation: data.isDonation,
      isLoan: data.isLoan,
      isRevenueSelling: data.isRevenueSelling,
      isOtherIncome: data.isOtherIncome,
      isThailand: data.corporateCountry?.isThailand,
      isLiquidation: data.isLiquidation,
      isInvestment: data.isInvestment,
      isCashManagement: data.isCashManagement,
      isOtherInvestment: data.isOtherInvestment,
      isCoOperative: data.isCoOperative,
      otherBusinessType: data.otherBusinessType,
      otherIncome: data.otherIncome,
      otherCountry: data.corporateCountry?.other,
      otherInvestment: data.otherInvestment,
      registerId: data.registerId?.toString(),
    }
    return result
  }catch(error){
    return null
  }
  
}

export const mapToUploadFile = (data: TDocuments): TDocuments | null => {
  console.log(data)
  try {
    if (data === null) {
      return null;
    }
    
    return {
      id:data?.id || "",
      filePath: data?.filePath || "",
      registerId: data?.registerId || "",
      docTypes: data?.docTypes || "",
      fileName: data?.fileName || "",
      fileTypes: data?.fileTypes || "",
    };
    
  } catch (error) {
    return null;
  }
};
