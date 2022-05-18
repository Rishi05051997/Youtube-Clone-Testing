import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useData } from "../../context/DataProvider";


export const Toast = () => {

    const { state: { toastMsg }, dispatch } = useData();

    const closeToast = () => {
        dispatch({ type: "SHOW_TOAST", payload: null })
    }

    useEffect(() => {
        const timeID = setTimeout(closeToast, 2000);
        return () => clearTimeout(timeID);
    })
    return (
        < div className="toastr info-alert-toast" >
            < div className="alert info-alert mar-y-2" >
                <Icon className="iconify head-1" icon="gg:danger" />
                <h4 className="head-4 mar-sm">{toastMsg}</h4>
                <Icon onClick={closeToast} className="iconify text-3" icon="akar-icons:circle-x" />
            </div >
        </div>
    )
}