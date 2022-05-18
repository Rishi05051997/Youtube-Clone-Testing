import { createContext, useContext, useReducer, useState } from "react";
import { VideoReducer } from "../Reducer";



const intialStateVal = {
    videos: [],
    category: [],
    playlists: [],
    sortBy: "",
    search: "",
    sortByDate: false,
    toastMsg: "",
};

const dataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(VideoReducer, intialStateVal)
    const sidebarCollasped = localStorage.getItem("sidebar-collasped");
    const [isExpanded, setIsExpanded] = useState(sidebarCollasped ? true : false);
    const [ModalOpen, setModalOpen] = useState(false);
    const [playlistManagementModalOpen, setPlaylistManagementModalOpen] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const [loader, setLoader] = useState();


    return (
        <dataContext.Provider value={{
            isExpanded,
            setIsExpanded,
            state,
            dispatch,
            ModalOpen,
            setModalOpen,
            playlistManagementModalOpen,
            setPlaylistManagementModalOpen,
            dialog,
            setDialog,
            dialogData,
            setDialogData,
            loader,
            setLoader
        }}>
            {
                children
            }
        </dataContext.Provider>
    )
}

const useData = () => useContext(dataContext);

export { useData, DataProvider, intialStateVal }