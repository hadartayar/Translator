import { FC, useState, useEffect } from 'react';
import '../Styles/App.css';
import Menu from '../Components/Menu';
import Header from '../Components/Header';
import TranslationContainer from '../Components/TranslationsContainer';
import { Apps, App, Translation } from '../Models/Types';
import { useParams } from 'react-router-dom';

interface TranslationApp {
    apps: Apps;
    setApps: (apps: Apps) => void;
}

export const PresentTranslations: FC<TranslationApp> = (props) => {
    const { apps, setApps } = props;
    const { appId } = useParams(); // Get the appId from path

    const currentApp: any = apps.find((a) => a.id === appId);
    const [translations, setTranslations] = useState<Translation[]>([]);

    useEffect(() => {
        // Find the app with the corresponding appId
        const appIndex = apps.findIndex((a) => a.id === appId);
        if (appIndex !== -1) {
            // If app is found, update the translations state
            setTranslations([...apps[appIndex].translations]);
        }
    }, [appId, apps]);

    const updateAppTranslations = (updatedTranslations: Translation[]) => {
        // Update the translations of the app in the apps list
        const updatedApps = [...apps];
        const appIndex = updatedApps.findIndex((a) => a.id === appId);
        if (appIndex !== -1) {
            updatedApps[appIndex].translations = updatedTranslations;
            // Update the apps state with the updated apps list
            setApps(updatedApps);
        }
    };

    if (!appId || !currentApp) {
        return <div></div>;
    }


    return (
        <div>
            <div>
                <Header isAppPage={true} text={currentApp.name} />
                <div className='pageContainer'>
                    <Menu appsList={apps} />
                    <div className='pageContent'>
                        <TranslationContainer appId={appId} translations={translations} setTranslations={updateAppTranslations} />
                    </div>
                </div>
            </div>
        </div>
    );
};