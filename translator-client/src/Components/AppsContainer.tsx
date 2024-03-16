import React, { FC, useState, useEffect } from 'react';
import { deleteApp } from '../Services/appService';
import { Container, Button } from '@mui/material';
import AppCard from './AppCard';
import AddAppDialog from './AddAppDialog';
import { Apps } from '../Models/Types';
import '../Styles/cardsStyle.css';


interface AppsContainerProps {
    apps: Apps;
    openDialog: boolean;
    setOpenDialog: (show: boolean) => void;
    setApps: (apps: Apps) => void;
}

const AppsContainer: FC<AppsContainerProps> = (props) => {
    const { apps, openDialog, setOpenDialog, setApps } = props;
    const Swal = require('sweetalert2')

    const handleDeleteApp = async (appId: string) => {
        let response = await deleteApp(appId);
        if (response) {
            const updatedApps = apps.filter(app => app.id !== appId);
            props.setApps(updatedApps);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "App Deleted",
                showConfirmButton: false,
                timer: 1500
            });
        };
    }

    return (
        <Container>
            <ul className="cardsList" >
                {apps.map((app) => (
                    <li key={app.id} className="cardItem"><AppCard app={app} handleDelete={handleDeleteApp} /></li>
                ))}

                <li className='addAppBtn'>
                    <Button variant="contained" style={{ backgroundColor: '#5794cf' }} onClick={() => setOpenDialog(true)}>
                        Add App
                    </Button></li>
            </ul>
            {openDialog ? (
                <AddAppDialog openDialog={openDialog} closeDialog={() => setOpenDialog(false)} setApps={setApps} apps={apps} />
            ) : null}
        </Container>
    );
};
export default AppsContainer;