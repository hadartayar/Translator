import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Apps, Translation } from '../Models/Types';
import { postNewTranslations } from "../Services/appService";
import AddTranslation from '../Components/AddTranslation';
import "../Styles/TranslationStyle.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


interface TranslationsProps {
  appId: string;
  translations: Translation[];
  setTranslations: (translations: Translation[]) => void;
}

const TranslationsContainer: React.FC<TranslationsProps> = (props) => {
  const { appId, translations, setTranslations } = props;
  const Swal = require('sweetalert2')

  const [newTranslations, setNewTranslations] = useState<Translation[]>([]);
  const updateTranslations = (newWord: Translation) => {
    setNewTranslations([...newTranslations, newWord]);
    setTranslations([...translations, newWord]);
    console.log(translations);
  };

  const postTranslationsOnSave = async () => {
    console.log(newTranslations);
    let response = await postNewTranslations(appId, newTranslations);
    console.log(response);
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Translation/s Added Successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops... Something went wrong!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  useEffect(() => {
    setNewTranslations([]);
  }, [appId])

  return (
    <div>

      <div className="previousTranslations">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><b>Key</b></TableCell>
                <TableCell align="left"><b>English</b></TableCell>
                <TableCell align="left"><b>French</b></TableCell>
                <TableCell align="left"><b>Dutch</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {translations.map((translation: Translation, index: number) => (
                <TableRow style={{ fontWeight: 'bold' }}
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{translation.key}</TableCell>
                  <TableCell align="left">{translation.words.English}</TableCell>
                  <TableCell align="left">{translation.words.French}</TableCell>
                  <TableCell align="left">{translation.words.Dutch}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: '50px' }}>
          <AddTranslation appId={appId} updateTranslations={updateTranslations} />
        </div>
        <div style={{ marginLeft: '90%' }}>
          <Button variant="contained" style={{ marginTop: "40px", backgroundColor: "#5794cf", }}
            onClick={postTranslationsOnSave}
            disabled={newTranslations.length == 0}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranslationsContainer;
