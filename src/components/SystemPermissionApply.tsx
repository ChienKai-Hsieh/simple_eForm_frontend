import { useState } from "react";
import { formSave } from "../utils/formSave";

interface Info	{
	applicantDept: string;
	applicantName: string;
	applyDate: string;
	applyReason: string;
}

function SystemPermissionApply() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<Info>({ applicantDept: "", applicantName: "", applyDate: "", applyReason: "" });
  
  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setInfo({ ...info, [target.name]: target.value });
  }
  
  function formSubmit()	{
  	// console.log(info);
  	
  	setLoading(true);
    setErrorMessage(null);
  	
  	formSave(info).then((data) => {
  		setLoading(false);
  	});
  }
  
  return (
  	<div className="card shadow-2xl bg-base-100">
  		<div className="card-body">
  			<h1 className="mb-5 text-2xl font-bold">
            系統權限申請單
          	</h1>
  			<div className="form-control">
              <label className="label">
                <span className="label-text">申請部門</span>
              </label> 
              <br /><input type="text" placeholder="" className="input input-bordered" name="applicantDept" value={info.applicantDept} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">申請人</span>
              </label> 
              <br /><input type="text" placeholder="" className="input input-bordered" name="applicantName" value={info.applicantName} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">申請日期</span>
              </label> 
              <br /><input type="text" placeholder="" className="input input-bordered" name="applyDate" value={info.applyDate} onChange={handleChange} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">申請原因</span>
              </label> 
              <br /><textarea style={{ border: '2px solid gray', borderRadius: '5px', padding: '10px' }} name="applyReason" value={info.applyReason} onChange={handleChange} rows="4" cols="50" placeholder="" />
            </div>
            <div className="justify-center">
    			<button class="btn btn-accent btn-outline" onClick={formSubmit} disabled={loading}>
    			{loading ? '資料傳輸中...' : '送出'}
    			</button>
  			</div>
  		</div>
  	</div>
  );
}

export default SystemPermissionApply;
