import { Icon } from "@iconify/react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useData } from "../../context/DataProvider";
import { logOutUser } from "../../services";
import "./layout.css";

export const Layout = ({ login }) => {
    const { isExpanded, setIsExpanded, dispatch } = useData();
    const { setLogin } = useAuth();

    const navigate = useNavigate();
    const handleToggler = () => {
        if (isExpanded) {
            setIsExpanded(false);
            localStorage.setItem("sidebar-collasped", "sidebar-collasped");
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem("sidebar-collasped");
    }

    const sidebarData = [
        {
            id: 1,
            icon: "ant-design:home-filled",
            itemName: "Home",
            navigate: "/",
        },
        {
            id: 2,
            icon: "ant-design:play-circle-filled",
            itemName: "Playlist",
            navigate: "/playlist-listing",
        },
        {
            id: 3,
            icon: "wpf:like",
            itemName: "Liked",
            navigate: "/liked-videos",
        },
        {
            id: 4,
            icon: "ic:baseline-watch-later",
            itemName: "Watch Later",
            navigate: "/watch-later-videos",
            handlerFunction: () => { }
        },
        {
            id: 5,
            icon: "fa:history",
            itemName: "History",
            navigate: "/history",
        },
    ]

    const searchFieldHandler = (e) => {
        dispatch({
            type: "SEARCH-BASED-ON-NAME",
            payload: e.target.value,
        });
    };


    return (
        <>
            <div className="wrapper">
                <div className={isExpanded ? "sidebar" : "sidebar collapsed"}>
                    <header className="sidebar-header">
                        <div className="sidebar-icon text-3">
                            <Icon className="iconify text-4 hamberger" onClick={handleToggler} icon="carbon:menu" />
                        </div>
                        <h1 className="sidebar-logo head-1 sidebar-title">CARS TUBE</h1>
                        <nav className="siderbar-navigation">
                            <div className="d-flex items-center">
                                <input
                                    id="search"
                                    type="text"
                                    className="mar-x-1 custom-input pad-sm"
                                    autoComplete="off"
                                    placeholder="Search By Name!!!"
                                    onChange={(e) => login ? searchFieldHandler(e) : navigate("/login")}
                                />

                            </div>
                            {
                                login ?
                                    <>
                                        <div className="badge-div mar-x-2">
                                            <Icon className="iconify cursor_" icon="healthicons:ui-user-profile" />
                                            <Link to="/">
                                                <div className="text-2 cursor_" >{login.firstName}</div>
                                            </Link>
                                        </div>
                                        <div className="badge-div" >
                                            <Icon className="iconify cursor_" icon="majesticons:logout" onClick={() => logOutUser(setLogin, navigate)} />
                                            <div className="text-2 cursor_" >Logout</div>
                                        </div>
                                    </> :
                                    <button className="btn btn-warning" ><Link to="/login">Login</Link></button>
                            }
                        </nav>
                    </header>
                    <main className="sidebar-items">
                        {
                            sidebarData.map(({ id, itemName, icon, navigate }) =>
                                <NavLink
                                    to={navigate}
                                    className={({ isActive }) =>
                                        isActive && "active-item"
                                    }
                                >
                                    <div key={id} className="item">
                                        <div className="sidebar-icon text-3">
                                            <Icon className="iconify" icon={icon} />
                                        </div>
                                        <span className="sidebar-text text-3" >
                                            {itemName}
                                        </span>
                                    </div>
                                </NavLink>)
                        }
                    </main>
                </div>
            </div>
        </>
    )
}