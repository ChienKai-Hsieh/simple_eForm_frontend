import axios from "axios";

const formSaveRequest = axios.create({
    baseURL: 'https://localhost:5001',
    headers: { 'Content-Type': 'application/json' }
});

export const formSave = (info) => {
    return formSaveRequest.post("/form/create",
    {
        'applicantDept': info.applicantDept, 
        'applicantName': info.applicantName, 
        'applyDate': info.applyDate, 
        'applyReason': info.applyReason
    }).then((res) => {
    	// res.data
    	console.log(res);
    }).catch((err)=>err);
};
