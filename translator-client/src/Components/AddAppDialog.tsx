import React, { useState, useEffect } from "react";
import { Apps, App } from '../Models/Types';
import { postNewApp } from '../Services/appService';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
    apps: Apps;
    openDialog: boolean;
    closeDialog: () => void;
    setApps: (apps: Apps) => void;
}

const AddAppDialog: React.FC<Props> = (props) => {
    const { apps, openDialog, closeDialog, setApps } = props;

    const [appName, setAppName] = useState('');
    const Swal = require('sweetalert2')

    const addApp = async () => {
        try {
            let newApp: App = {
                id: apps.length + 1 + '',
                name: appName,
                lastDeploymentDate: new Date().toLocaleString(),
                translations: [],
            };
            postApp(newApp);
            setApps([...apps, newApp]);
            closeDialog();
        }
        catch (err) {
            alert(err);
        }
    };

    const postApp = async (newApp: App) => {
        const response = await postNewApp(newApp);
        if (!response) {
            throw new Error('Network response was not ok');
        }
        else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: " App Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={closeDialog}
            >
                <DialogTitle>Add App</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="App name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setAppName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={addApp} disabled={appName === ''}>Add</Button>
                    <Button onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddAppDialog;
