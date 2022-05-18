import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { loginUser } from "../../services";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import "./form.css";

export const Login = () => {
    const { isExpanded, setLoader } = useData();
    const navigate = useNavigate();
    const { userState: { email, password },
        userDispatch, setLogin, showMsg, setShowMsg, errorMsg, setErrorMsg } = useAuth();
    const loginFormHandler = (e) => {
        e.preventDefault()
        loginUser(email, password, setLogin, userDispatch, setShowMsg, setErrorMsg, navigate, setLoader)
    }

    useDocumentTitle("CARS TUBE | LOGIN")

    return (
        <>
            <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
                <div className="form-container">
                    <section className="form d-flex justify-center">
                        <form onSubmit={loginFormHandler} className="container-card xxl-card-width pad-lg">
                            <div className="head-1 bold">Login</div>
                            <div className="d-flex flex-col  mar-y-4 ">
                                <label htmlFor="email" className="d-flex text-2 bold">Enter Email</label
                                >
                                <input
                                    id="email"
                                    type="email"
                                    className="mar-y-1 custom-input pad-sm"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => userDispatch({ type: "SET-EMAIL", payload: e.target.value })}
                                />

                            </div>
                            <div className="d-flex flex-col  mar-y-3 ">
                                <label htmlFor="password" className="d-flex text-2 bold">Enter Password</label
                                >
                                <input
                                    id="password"
                                    type="password"
                                    className="mar-y-1 custom-input pad-sm"
                                    autoComplete="off"
                                    value={password}
                                    onChange={(e) => userDispatch({ type: "SET-PASSWORD", payload: e.target.value })}

                                />

                            </div>
                            <div className="mar-y-3">
                                <button className="form-btn text-2 bold cursor_">
                                    Login
                                </button>
                            </div>
                            <div className="mar-y-2 head-4">
                                {showMsg && <p className="highlightMainText">{errorMsg}</p>}
                            </div>
                            <div className="mar-y-3">
                                <span className="btn btn-link head-4" onClick={() => {
                                    userDispatch({ type: "SET-EMAIL", payload: "Vrushabh@gmail.com" });
                                    userDispatch({ type: "SET-PASSWORD", payload: "Vrushabh123" })
                                }}>Add Test Credentials</span>
                            </div>
                            <div className="text-2 mar-y-2">
                                Forgot Your Password ?
                                <span className="bold cursor_"
                                >Reset Here</span
                                >
                            </div>
                            <div className="text-2 mar-y-2">
                                Not a User yet ?
                                <span className="bold cursor_"
                                ><Link to="/signup">Create Your Account</Link></span
                                >
                            </div>
                        </form >
                    </section >
                </div>
            </section>
        </>
    )
}