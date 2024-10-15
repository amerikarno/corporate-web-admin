import reducer, { setAssetData, clearAssetData } from '@/features/addedIcoData/AddedIcoData';
import { TAssetData } from '@/pages/createJob/addedICO/types';
const mockedAssetData: TAssetData[] = [
    {
        "icoCode": "0",
        "asset": {
            "id": "acf77e68-9eb8-4c3e-bc67-076100f8856c",
            "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
            "CreatedAt": "2024-10-07T04:10:20Z",
            "DeletedAt": null,
            "icoCode": 1,
            "title": "Digital Asset",
            "logo": "getImages",
            "issueBy": "Issue By Digital Asset",
            "image": "image",
            "name": "THGG",
            "description": "Blockchain Innovations Global (B.I.G.)",
            "category": "",
            "return": "18%",
            "region": "Asia",
            "minimum": "250.00 USD"
        },
        "info": {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "icoCode": "1",
            "totalIssuance": "1000.00 DA",
            "totalAmountRaised": "50000.00 USD",
            "contractInfomation": "0xC92Ff5e3A94...89e7e8a5b378b",
            "minimumInvestmentAmount": "1000.00 USD",
            "minimumInvestmentQuantity": "100.00 DA",
            "issueUnitPrice": "100.00 USD"
        },
        "details": [
            {
                "id": "6edfa6ca-002d-4fcc-9a81-c1602258c7d6",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Fundraising Milestone",
                "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
            },
            {
                "id": "746b21fd-85e9-4777-960d-8a4e91b3e952",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Company Information",
                "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
            },
            {
                "id": "754cdb18-7d9e-4b48-a1a9-7ffb3f747a04",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Company Information",
                "content": "tempor excepteur dolor occaecat et in ex do adipisicing enim incididunt dolore aliqua aliqua eiusmod reprehenderit ad veniam adipisicing irure irure consectetur excepteur commodo aliquip commodo est tempor anim veniam consequat dolore dolore esse incididunt veniam nostrud labore velit ea ullamco adipisicing aute commodo minim irure enim eiusmod quis anim esse proident nulla exercitation ullamco minim sunt consequat irure aliquip esse veniam aliqua aute commodo eu commodo labore nisi qui reprehenderit velit nulla tempor do fugiat incididunt incididunt ex sit labore fugiat reprehenderit anim ex ex occaecat magna officia elit magna ad id enim aliquip ad aliquip nisi aute pariatur"
            },
            {
                "id": "8fa7f84c-a940-45c1-bdb6-0237b26b9408",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Fundraising Milestone",
                "content": "consequat elit deserunt dolore sint veniam nulla labore minim exercitation Lorem reprehenderit ut Lorem nisi quis exercitation exercitation incididunt eu sit irure sint fugiat cupidatat id voluptate aliqua aute sint nisi dolor nulla nisi aliqua pariatur ex in velit culpa irure esse adipisicing aliquip fugiat dolore nulla commodo tempor magna occaecat duis sint excepteur cupidatat sit irure ex occaecat do laboris Lorem veniam fugiat cillum cillum reprehenderit excepteur incididunt anim do eu fugiat dolor enim ipsum quis id mollit non et velit elit cillum deserunt nulla nulla adipisicing qui nulla quis irure do laborum duis consectetur nostrud eiusmod officia nostrud"
            },
            {
                "id": "b11bd3d1-0277-4d8e-83a8-d7a05aa5899b",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Use of Proceeds",
                "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
            },
            {
                "id": "d05140d9-d2da-4a5c-a026-dbd01d66a029",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Business Model",
                "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
            },
            {
                "id": "d690cbd3-a188-436c-81a4-99a81a6181d1",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Business Model",
                "content": "Lorem laborum dolore laborum laboris enim officia labore est ex duis sunt occaecat excepteur dolore est officia qui mollit excepteur fugiat dolore esse anim enim eiusmod nulla enim duis Lorem dolor ullamco ut mollit est dolore voluptate ex mollit aliquip nisi pariatur nisi sunt sit aute voluptate sit nostrud eu ut est dolor minim ea quis sit in sit reprehenderit tempor qui laboris sunt exercitation enim ad ipsum ad anim culpa incididunt labore duis aliqua tempor pariatur consequat cillum Lorem ut fugiat in cupidatat est aliqua do laborum eiusmod duis eu occaecat fugiat incididunt veniam velit ut id voluptate reprehenderit fugiat excepteur et pariatur labore aliqua deserunt tempor cillum nulla reprehenderit voluptate ad sunt labore sunt officia elit deserunt enim eiusmod amet adipisicing ad est do dolor velit eu nostrud nulla Lorem et labore est tempor occaecat Lorem nostrud veniam occaecat in aliquip occaecat enim velit quis reprehenderit sunt officia"
            },
            {
                "id": "fc6403a8-c900-4c35-896d-e776f2da1438",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "header": "Use of Proceeds",
                "content": "aliqua nulla ullamco in mollit duis magna Lorem dolor dolor in laborum mollit enim et fugiat nostrud aliquip eiusmod ullamco laboris labore mollit aute excepteur laboris ullamco minim eiusmod Lorem pariatur non commodo magna elit ullamco labore ad ullamco dolor sit quis veniam ullamco duis laborum non dolor culpa qui Lorem enim ea officia sint aliquip in occaecat incididunt cupidatat incididunt officia enim deserunt Lorem cupidatat ut laboris ea eiusmod aute sunt aliquip excepteur incididunt fugiat fugiat sunt esse id eiusmod consequat esse nostrud deserunt incididunt sint consequat culpa officia consectetur dolore aute quis aliquip elit voluptate magna eu dolor occaecat quis magna ipsum pariatur occaecat ea consectetur esse reprehenderit adipisicing ea mollit labore non reprehenderit mollit occaecat nisi minim velit consequat ad ea culpa labore ea irure nostrud fugiat eu amet laborum veniam incididunt duis duis officia nostrud dolore commodo aliquip non fugiat eiusmod culpa in id sit ut"
            }
        ],
        "documents": null,
        "images": null,
        "videos": null,
        "faq": [
            {
                "id": "07a7c5f4-a279-4716-a7ff-2bd1d99f41e8",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "question": "What is the minimum investment?",
                "answer": "The minimum investment is $1000."
            },
            {
                "id": "1362f176-deb9-4ab6-93b7-c7cd3a2f05bc",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "question": "What is the expected return?",
                "answer": "The expected return is 10% annually."
            },
            {
                "id": "1b60ac4e-0fe4-4218-b82e-04bfc5ed1bbe",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "question": "What is the minimum investment?",
                "answer": "The minimum investment is $1000."
            },
            {
                "id": "6302ab87-eb22-4c07-b419-25fcff403e35",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "question": "What is the expected return?",
                "answer": "The expected return is 10% annually."
            },
            {
                "id": "a28387f6-4fa0-4666-a6f6-b9649214d7a4",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-02T04:55:04Z",
                "DeletedAt": null,
                "icoCode": 1,
                "question": "How long is the investment period?",
                "answer": "The investment period is 5 years."
            },
            {
                "id": "bacdfec7-ede3-4827-bc57-bd35165eab44",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-09-30T07:29:42Z",
                "DeletedAt": null,
                "icoCode": 1,
                "question": "How long is the investment period?",
                "answer": "The investment period is 5 years."
            }
        ],
        "keyInformation": {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "icoCode": "1",
            "network": "BNB Smart Chain Mainnet",
            "precision": "",
            "capitalStructure": "Independent Fund",
            "classiFication": "Retail Investor",
            "productType": "Others",
            "creationTime": "0001-01-01T00:00:00Z",
            "releaseTime": "0001-01-01T00:00:00Z",
            "compleationTime": "0001-01-01T00:00:00Z"
        },
        "issuanceTerms": {
            "CreatedAt": "0001-01-01T00:00:00Z",
            "DeletedAt": null,
            "icoCode": "1",
            "investmentPeriod": "120 Days",
            "dividendYield": "5.00 %",
            "grossMargin": "20.00 %",
            "equityMultiple": "5.00 %",
            "profit": "15.00 %",
            "leverage": "20.00 %",
            "investmentStructure": "/",
            "distributionFrequency": "Quarterly"
        },
        "companyMembers": [
            {
                "id": "1d928fdb-c7ef-48cd-b39a-c311d2867f6e",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-01T02:48:56Z",
                "DeletedAt": null,
                "icoCode": 1,
                "picture": "img.png",
                "firstName": "John",
                "midName": "A",
                "lastName": "Doe",
                "position": "CEO",
                "history": "John has over 20 years of experience in the industry."
            },
            {
                "id": "1f1cb3bc-3b2b-4bd5-8346-366c9290ef60",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-01T02:48:56Z",
                "DeletedAt": null,
                "icoCode": 1,
                "picture": "img.png",
                "firstName": "Jane",
                "midName": "B",
                "lastName": "Smith",
                "position": "CFO",
                "history": "Jane is a financial expert with a background in investment banking."
            },
            {
                "id": "6bceb445-fb14-4f9e-84ad-5de35c231512",
                "createBy": "163e6a07-bd7d-453d-9f57-c7ca8d7e34ba",
                "CreatedAt": "2024-10-01T02:48:56Z",
                "DeletedAt": null,
                "icoCode": 1,
                "picture": "img.png",
                "firstName": "Emily",
                "midName": "C",
                "lastName": "Johnson",
                "position": "COO",
                "history": "Emily has a strong background in operations and management."
            }
        ]
    }
]
describe('assetData slice', () => {
  const initialState = { data: null };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAssetData', () => {
    const actual = reducer(initialState, setAssetData(mockedAssetData[0]));
    expect(actual.data).toEqual(mockedAssetData[0]);
  });

  it('should handle clearAssetData', () => {
    const stateWithData = { data: mockedAssetData[0] };
    const actual = reducer(stateWithData, clearAssetData());
    expect(actual.data).toEqual(null);
  });
});