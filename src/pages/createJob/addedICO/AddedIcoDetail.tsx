import { Button } from "@/components/ui/button";
import { FaQuestionCircle } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "@/lib/Cookies";
import axios from "@/api/axios";
import { setTestCorporateData } from "@/features/corporateTest/corporateTestSlice";
import { useNavigate } from "react-router-dom";


const AddedIcoDetail = () => {

  const fetchedData = useSelector((state: RootState) => state.assetData.data);

  const [faqs, setFaqs] = useState([{answer:'', question: ''}]);
  const [companyInformation,setCompanyInformation] = useState('');
  const [businessModel,setBusinessModel] = useState('');
  const [useOfProceeds,setUseOfProceeds] = useState('');
  const [fundraisingMileStone,setFundraisingMileStone] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (fetchedData) {
      //fetchedData.details !== []
      if (fetchedData.details && fetchedData.details.length > 0) {
        fetchedData.details.forEach(detail => {
          switch (detail.header) {
            case "Company Information":
              setCompanyInformation(detail.content || "");
              break;
            case "Business Model":
              setBusinessModel(detail.content || "");
              break;
            case "Use of Proceeds":
              setUseOfProceeds(detail.content || "");
              break;
            case "Fundraising Milestone":
              setFundraisingMileStone(detail.content || "");
              break;
            default:
              break;
          }
        });
      }
      //fetchedData.faq !== []
      if (fetchedData.faq && fetchedData.faq.length > 0) {
        setFaqs(fetchedData.faq);
      }
    }
  }, [fetchedData]);
  
  const handleAddFaq = () => {
    setFaqs([...faqs, {answer:'', question: ''}]);
  };

  const registerId = localStorage.getItem("registerId");
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const body = {
      faq: faqs.map(faq => ({ ...faq, registerId })),
      details: [
        { registerId, header: "Company Information", content: companyInformation },
        { registerId, header: "Business Model", content: businessModel },
        { registerId, header: "Use of Proceeds", content: useOfProceeds },
        { registerId, header: "Fundraising Milestone", content: fundraisingMileStone }
      ]
    };
    console.log(body)
    dispatch(setTestCorporateData(body))
    if(registerId){
      if(fetchedData?.details && fetchedData?.details.length === 0){
        try{
          const res = await axios.post('/api/v1/ico/details/create',body,{
            headers: {
              Authorization: `Bearer ${getCookies()}`,
          },
          })
          if(res.status === 200){
            console.log("create ico form2 success",res)
            navigate("/create-job/added-ico/3")
          }else{
            console.log("create ico form2 fail ",res)
          }
        }catch(error){
          console.log("create ico form2 failed", error)
        }
      }else{
        try{
          const res = await axios.post('/api/v1/ico/details/update',body,{
            headers: {
              Authorization: `Bearer ${getCookies()}`,
          },
          })
          if(res.status === 200){
            console.log("update ico form2 success",res)
            navigate("/create-job/added-ico/3")
          }else{
            console.log("update ico form2 fail ",res)
          }
        }catch(error){
          console.log("update ico form2 failed", error)
        }
      }
    }else{
      console.log("no ico id")
    }
  };
  
  return (
    <div className="flex justify-evenly p-5 md:p-10 md:pb-0 relative">
            <div className="w-full md:w-3/4">
                <hr className="horizontal-line-top" />
                <form className="flex flex-col items-center space-y-24">
                    <div className="ico-card space-y-8 rounded-b-[10px]">
                      <div className="w-full flex items-center my-5 mb-0 space-x-2">
                            <h1 className="text-lg md:text-xl font-bold">Company Details</h1>
                            <span className="text-xl"><BiSolidMessageSquareDetail /></span>
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                          <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Company Information</label>
                          <textarea value={companyInformation} onChange={(e)=>setCompanyInformation(e.target.value)} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your company information here..."></textarea>
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                          <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Business Model</label>
                          <textarea value={businessModel} onChange={(e)=>setBusinessModel(e.target.value)} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your business model here..."></textarea>
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                          <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Use of Proceeds</label>
                          <textarea value={useOfProceeds} onChange={(e)=>setUseOfProceeds(e.target.value)} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your use of proceeds here..."></textarea>
                        </div>
                        <div className="w-full flex flex-col space-y-2">
                          <label htmlFor="message" className="font-medium text-gray-900 dark:text-white">Fundraising Milestone</label>
                          <textarea value={fundraisingMileStone} onChange={(e)=>setFundraisingMileStone(e.target.value)} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your fundraising milestone here..."></textarea>
                        </div>           
                    </div>
                    <div className="ico-card space-y-8 relative rounded-t-[10px]">
                        <div className="w-full flex items-center my-5 mb-0 space-x-2">
                            <h1 className="text-lg md:text-xl font-bold">Company FAQ</h1>
                            <span className="text-xl"><FaQuestionCircle /></span>
                        </div>
                        {faqs.map((faq, index) => (
                          <div key={index} className="w-full flex flex-col space-y-2">
                            <label htmlFor={`faq-${index}`} className="font-medium text-gray-900 dark:text-white">Frequently Asked Questions {index+1}</label>
                            <textarea
                              data-testid={`faq-question-${index+1}`}
                              id={`faq-${index}`}
                              rows={2}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Write your question here..."
                              value={faq.question}
                              onChange={(e) => {
                                const newFaqs = faqs.map((faqItem, faqIndex) =>
                                  faqIndex === index ? { ...faqItem, question: e.target.value } : faqItem
                                );
                                setFaqs(newFaqs);
                              }}
                            />
                            <textarea
                              data-testid={`faq-answer-${index+1}`}
                              id={`faq-${index}`}
                              rows={2}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Write your answer here..."
                              value={faq.answer}
                              onChange={(e) => {
                                const newFaqs = faqs.map((faqItem, faqIndex) =>
                                  faqIndex === index ? { ...faqItem, answer: e.target.value } : faqItem
                                );
                                setFaqs(newFaqs);
                              }}
                            />
                          </div>
                        ))}
                        <div className="absolute right-[50%] bottom-5 md:text-3xl cursor-pointer hover:text-4xl transition-all">
                          <FaCirclePlus data-testid="addFaqBtn" onClick={handleAddFaq}/>
                        </div>
                    </div>
                    <div className="absolute right-4 -bottom-[4.5rem]">
                        <Button onClick={handleSubmit}>
                          Next Form
                        </Button>
                    </div>
                </form>
                <hr className="horizontal-line-bottom " />
            </div>
        </div>
  )
}

export default AddedIcoDetail
