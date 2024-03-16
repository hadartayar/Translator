import React from 'react';
import "../Styles/App.css";

interface HeaderProps {
    isAppPage: boolean;
    text: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h2>{props.text}</h2>
        </header>
    );
};

export default Header;
