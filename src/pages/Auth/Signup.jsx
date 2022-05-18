import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { createUser } from "../../services";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import "./form.css";
export const Signup = () => {
    const { isExpanded, setLoader } = useData();
    const navigate = useNavigate();
    const { userState: { firstName, lastName, email, password }, userDispatch, setLogin, showMsg, setShowMsg, errorMsg, setErrorMsg } = useAuth();
    const signupFormHandler = (e) => {
        e.preventDefault()
        createUser(firstName, lastName, email, password, userDispatch, setLogin, setShowMsg, setErrorMsg, navigate, setLoader)

    }

    useDocumentTitle("CARS TUBE | SIGNUP");

    return (
        <>
            <section className={isExpanded ? "info-tube-main-content" : "info-tube-main-content-collasped"}>
                <div className="form-container">
                    <section className="form d-flex justify-center">
                        <form onSubmit={signupFormHandler} className="container-card xxl-card-width pad-lg">
                            <div className="head-1 bold">Sign Up</div>
                            <div className="d-flex items-center justify-between">
                                <div className="d-flex flex-col  mar-y-4">
                                    <label htmlFor="firstName" className="d-flex text-2 bold">Enter First Name</label
                                    >
                                    <input
                                        id="firstName"
                                        type="text"
                                        className="mar-y-1 custom-input pad-sm"
                                        autoComplete="off"
                                        placeholder=" "
                                        onChange={(e) => userDispatch({ type: "SET-FIRSTNAME", payload: e.target.value })}
                                    />

                                </div>
                                <div className="d-flex flex-col  mar-y-4 ">
                                    <label htmlFor="lastName" className="d-flex text-2 bold">Enter Last Name</label
                                    >
                                    <input
                                        id="lastName"
                                        type="text"
                                        className="mar-y-1 custom-input pad-sm"
                                        autoComplete="off"
                                        placeholder=" "
                                        onChange={(e) => userDispatch({ type: "SET-LASTNAME", payload: e.target.value })}

                                    />

                                </div>
                            </div>
                            <div className="d-flex items-center justify-between">
                                <div className="d-flex flex-col  mar-y-4">
                                    <label htmlFor="email" className="d-flex text-2 bold">Enter Email</label
                                    >
                                    <input
                                        id="email"
                                        type="email"
                                        className="mar-y-1 custom-input pad-sm"
                                        autoComplete="off"
                                        placeholder=" "
                                        onChange={(e) => userDispatch({ type: "SET-EMAIL", payload: e.target.value })}
                                    />

                                </div>
                                <div className="d-flex flex-col  mar-y-4 ">
                                    <label htmlFor="password" className="d-flex text-2 bold">Enter Password</label
                                    >
                                    <input
                                        id="password"
                                        type="password"
                                        className="mar-y-1 custom-input pad-sm"
                                        autoComplete="off"
                                        placeholder=" "
                                        onChange={(e) => userDispatch({ type: "SET-PASSWORD", payload: e.target.value })}

                                    />

                                </div>
                            </div>
                            <div className="mar-y-3">
                                <button className="form-btn text-2 bold cursor_">
                                    Signup
                                </button>
                            </div>
                            <div className="mar-y-2 head-4">
                                {showMsg && <p className="highlightMainText">{errorMsg}</p>}
                            </div>
                            <div className="text-2 mar-y-2">
                                Forgot Your Password ?
                                <span className="bold cursor_"
                                >Reset Here</span
                                >
                            </div>
                            <div className="text-2 mar-y-2">
                                Already User ?
                                <span className="bold cursor_"
                                ><Link to="/login">Login</Link></span
                                >
                            </div>
                        </form >
                    </section >
                </div>
            </section>
        </>
    )
}