import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from "./helpers/utils";
import { UserDataInterface } from "./interface";
import { fetchUrl } from "./helpers/constants";


const App: React.FC = () => {
    // State hooks for managing user data, filter text, loading state, and dropdown visibility
    const [usersData, setUsersData] = useState<UserDataInterface[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    // Debounce function to avoid making frequent API requests while typing
    const debounce = useCallback(useDebounce, [filterText]);

    // Fetch data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch user data based on the filter text
    const fetchData = debounce(async (text: string = '') => {
        try {
            // Fetch data from the API based on the filter text
            const users = await fetch(`${fetchUrl}?name=${text}`).then(res => res.json()).catch(() => []);

            //HANDLING FILTERING IN FRONT
            // const filteredData = users.filter((item: UserDataInterface) =>
            //     item.name.toLowerCase().includes(text.toLowerCase())
            // );

            setIsLoading(false);
            setUsersData(users);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 500);

    // Function to handle user input change (filter text)
    const handleInputChange = (text = '') => {
        setUsersData([]);
        setIsLoading(true);
        // Update state with the filter text and fetch data
        setFilterText(text);
        fetchData(text);
    };

    // Function to highlight the search text in the username
    const highlightText = (text: string, highlight: string) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
        {parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase()
                ? <mark key={index}>{part}</mark>
                : part
        )}
      </span>
        );
    };

    // Function to handle item click from the dropdown
    const handleItemClick = (name: string) => {
        // Update the filter text, fetch data, and close the dropdown
        handleInputChange(name);
        setDropdownOpen(false);
    };

    return (
        <div className="app-container">
            {/* Input field for searching by name */}
            <input
                type="text"
                placeholder="Search by name"
                value={filterText}
                onChange={(event) => handleInputChange(event.target.value)}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => !filterText && setDropdownOpen(false)}
            />
            {/* Dropdown for displaying user data */}
            {dropdownOpen &&
                <>
                    {usersData?.length ?
                        // Render the list of users with highlighted names
                        <ul>
                            {usersData.map((item) => (
                                <li key={item.id} onClick={() => handleItemClick(item.name)}>
                                    {highlightText(item.name, filterText)}
                                </li>
                            ))}
                        </ul>
                        :
                        // Show loading or no data message based on the state
                        <>{isLoading ? 'Loading...' : 'No data to show'}</>
                    }
                </>
            }
        </div>
    );
};

export default App;