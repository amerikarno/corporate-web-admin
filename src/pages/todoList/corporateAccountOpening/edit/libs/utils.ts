import { getCookies } from "@/lib/Cookies";
import { jwtDecode } from "jwt-decode";
import {
  TCorporateAddress,
  TCorporateData,
  TCorporateInfo,
} from "../../constant/type";
import { TCorporateInfoSchema } from "../constants/schemas";

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
    // let resContactRegisterCountry = data.Contact?.find(
    //   (item) => item.types === 702
    // );
    // let resContactPlaceofIncorporation = data.Contact?.find(
    //   (item) => item.types === 701
    // );

    const timeStamp = Date.parse(data.Info.dateOfIncorporation);

    let result: TCorporateInfoSchema = {
      // let result = {
      name: data.Info.name,
      registrationNo: data.Info.registrationNo,
      taxId: data.Info.taxId,
      // dateofincorporation: data.Info.dateOfIncorporation,
      dateofincorporation: new Date(timeStamp),
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

    console.log("result", result);
    return result;
  } catch (error) {
    console.log("cast type error", error);
  }
};
