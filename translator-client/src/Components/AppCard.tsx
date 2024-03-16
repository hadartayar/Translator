import React from 'react';
import '../Styles/cardsStyle.css';
import { App } from '../Models/Types';
import { downloadAppTranslations, deployAppTranslations } from '../Services/appService';
import { Card, CardContent, Typography, CardActions, Button, IconButton } from '@mui/material';
import { Close, Download, UploadFileSharp } from '@mui/icons-material';

interface AppCardProps {
    app: App;
    handleDelete: (appId: string) => void;
}

const AppCard: React.FC<AppCardProps> = (props) => {
    const Swal = require('sweetalert2')

    const handleDownload = async (app: App) => {
        await downloadAppTranslations(app.id, app.name);
    };

    const handleDeploy = async (app: App) => {
        let response = await deployAppTranslations(app.id);
        if (response) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Deployment successfuly to Translations Deployments",
                showConfirmButton: false,
                timer: 1500
            });
        };
    }

    return (
        <Card sx={{ position: 'relative', minWidth: 275 }}>
            <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} size="small" onClick={() => props.handleDelete(props.app.id)}>
                <Close />
            </IconButton>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" component="div">
                    {props.app.name}
                </Typography>
                <br />
                <Typography variant="body2">
                    Last Date Deployment:
                    <br />
                    {props.app.lastDeploymentDate}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" onClick={() => handleDownload(props.app)}><IconButton size="small"><Download /></IconButton>Download</Button>
                <Button size="small" onClick={() => handleDeploy(props.app)}><IconButton size="small"><UploadFileSharp /></IconButton>Deploy</Button>
            </CardActions>
        </Card>
    );
};

export default AppCard;
