import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";
import { postNewTranslation } from "../Services/appService";
import { Translation } from '../Models/Types';

interface AddTranslationProps {
    appId: string;
    updateTranslations: (translation: Translation) => void;
}

const AddTranslation: React.FC<AddTranslationProps> = (props) => {

    const { appId, updateTranslations } = props;

    const [key, setKey] = useState('');
    const [english, setEnglish] = useState('');
    const [french, setFrench] = useState('');
    const [dutch, setDutch] = useState('');

    const [words, setWords] = useState<Translation[]>([]);

    const addNewTranslationLocally = () => {
        let newTrans: Translation = {
            key: key,
            words: {
                English: english,
                French: french,
                Dutch: dutch
            },
        };
        setWords([...words, newTrans]);
        updateTranslations(newTrans);
        //postNewTranslation(newTrans); // If I want to post one translation each time I click on 'Add'
        clearFields();
    };

    const onInputChange = (language: string, text: string) => {
        setKey(english.charAt(0).toUpperCase() + english.slice(1));
        switch (language) {
            case "English":
                setEnglish(text);
                break;
            case "French":
                setFrench(text);
                break;
            case "Dutch":
                setDutch(text);
                break;
            default:
                return;
        }
    };

    const clearFields = () => {
        setKey("");
        setEnglish("");
        setFrench("");
        setDutch("");
    }

    return (
        <div>
            <Container
            >
                <div className="txtFieldsContainer">
                    <TextField
                        id="Key"
                        label="Key"
                        variant="standard"
                        value={english.charAt(0).toUpperCase() + english.slice(1)}
                        disabled
                        style={{ marginRight: '40px' }}
                    />
                    <TextField
                        id="English"
                        label="English"
                        variant="standard"
                        value={english}
                        required
                        onChange={(e) => onInputChange(e.target.id, e.target.value)}
                        style={{ marginRight: '40px' }}
                    />
                    <TextField
                        id="French"
                        label="French"
                        variant="standard"
                        value={french}
                        required
                        onChange={(e) => onInputChange(e.target.id, e.target.value)}
                        style={{ marginRight: '40px' }}
                    />
                    <TextField
                        id="Dutch"
                        label="Dutch"
                        variant="standard"
                        value={dutch}
                        required
                        onChange={(e) => onInputChange(e.target.id, e.target.value)}
                        style={{ marginRight: '40px' }}
                    />
                </div>
                <br />
                <div>
                    <div>
                        <Button variant="contained" style={{ backgroundColor: "#5794cf" }} onClick={addNewTranslationLocally}
                            disabled={!english || !french || !dutch}>
                            Add
                        </Button>
                    </div>
                </div>
            </Container >
        </div >
    );
};

export default AddTranslation;
