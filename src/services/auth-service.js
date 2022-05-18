import axios from "axios"

const isPasswordValid = (password) => {
    if (
        password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) ==
        null
    )
        return false;
    else return true;
};

export const loginUser = (email, password, setLogin, userDispatch, setShowMsg, setErrorMsg, navigate, setLoader) => {
    setLoader(true)
    if (!isPasswordValid(password)) {
        setErrorMsg("Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.")
        setShowMsg(true);
    } else {
        try {
            (async () => {
                const { data: { foundUser, encodedToken } } = await axios.post(
                    `/api/auth/login`,
                    {
                        email, password
                    }
                )
                if (foundUser && encodedToken) {
                    localStorage.setItem("token", encodedToken)
                    setLogin(foundUser);
                    localStorage.setItem("login", JSON.stringify(foundUser));
                    userDispatch({ type: "CLEAR" });
                    navigate("/")
                }
            })()
        } catch (error) {
            setErrorMsg("Something Went Wrong!!!")
            setShowMsg(true);
        } finally {
            setLoader(false)
        }
    }

}

export const createUser = async (firstName, lastName, email, password, userDispatch, setLogin, setShowMsg, setErrorMsg, navigate, setLoader) => {
    setLoader(true);
    if (firstName === "" || lastName === "") {
        setErrorMsg("FirstName or LastName can not be empty!!!");
        setShowMsg(true)
    } else if (!isPasswordValid(password)) {
        setErrorMsg("Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.")
        setShowMsg(true);
    } else {
        try {

            const { data } = await axios({
                method: "post",
                url: '/api/auth/signup',
                data: { email, password, firstName, lastName }
            })
            const { createdUser, encodedToken } = data;
            if (data) {
                setLogin(createdUser);
                localStorage.setItem("login", JSON.stringify(createdUser));
                localStorage.setItem("token", encodedToken)
                userDispatch({ type: "CLEAR" });
                navigate("/")
            }
        } catch (error) {
            setErrorMsg("Something Went Wrong!!!")
            setShowMsg(true);
        } finally {
            setLoader(false);
            setShowMsg(false);
        }
    }
}

export const logOutUser = (setLogin, navigate) => {
    setLogin(false);
    localStorage.clear();
    navigate("/");
};