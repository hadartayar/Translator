import { FC, useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import Header from '../Components/Header';
import AppsContainer from '../Components/AppsContainer';
import { Apps } from '../Models/Types';
import { getAllApps } from '../Services/appService';
import '../Styles/App.css';

interface AppsProps {
    apps: Apps;
    setApps: (apps: Apps) => void;
}

export const PresentApps: FC<AppsProps> = (props) => {
    const { apps, setApps } = props;
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div>
            <Header isAppPage={false} text={'My Apps:'} />
            <div className='pageContainer'>
                <Menu appsList={apps} />
                <div className='pageContent'>
                    <AppsContainer
                        setOpenDialog={setOpenDialog}
                        openDialog={openDialog}
                        apps={apps}
                        // onDeploy={(app) => console.log('Deploying:', app)}
                        setApps={setApps}
                    />
                </div>
            </div>
        </div>
    );
};