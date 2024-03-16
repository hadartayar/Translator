import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import AppSelectIcon from '@rsuite/icons/AppSelect';
import { Apps, App } from '../Models/Types';
import '../Styles/App.css';

interface MenuProps {
    appsList: Apps;
}

const Menu: React.FC<MenuProps> = (props) => {
    const [navItems, setNavItems] = useState<any | null>(null);
    const [keyItem, setKeyItem] = useState<string>('0');
    const navigate = useNavigate();

    const handleChooseApp = (appId: string) => {
        setKeyItem("" + appId)
        navigate(`/app/${appId}`);
    };

    useEffect(() => {
        if (Array.isArray(props.appsList) && props.appsList !== null) { // Check if props.appsList is an array
            setNavItems(
                props.appsList.map((app: App) => (
                    <Nav.Item
                        key={app.id}
                        eventKey={app.id}
                        icon={<AppSelectIcon />}
                        onClick={() => handleChooseApp(app.id)}
                    >
                        {app.name}
                    </Nav.Item>
                ))
            );
        }
    }, [props.appsList]);

    return (
        <div style={{ width: 240 }}>
            <Sidenav style={{ width: 300, height: "87vh" }}>
                <Sidenav.Body>
                    <Nav activeKey={keyItem}>
                        <Nav.Item eventKey="0" icon={<DashboardIcon />} onClick={() => navigate('/')}>
                            My Apps
                        </Nav.Item>
                        {navItems}
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div >
    );
};

export default Menu;
