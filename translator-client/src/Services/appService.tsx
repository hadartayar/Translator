import { App, Apps, Translation } from '../Models/Types';
import http from "./http";
import config from "../config.json";


export async function getAllApps() {
    const { data } = await http.get(config.apiUrl);
    return data;
}

export async function postNewApp(newApp: App) {
    const { data } = await http.post(config.apiUrl, newApp);
    return data;
}

export async function deleteApp(appId: string) {
    try {
        const { data } = await http.delete(`http://localhost:5221/${appId}`);
        return data;
    }
    catch (err) {
        throw err;
    }
}

//post 1 translation
export async function postNewTranslation(appId: string, newTranslation: Translation) {
    try {
        const { data } = await http.post(`http://localhost:5221/${appId}`, newTranslation);
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error posting new translation:', error);
        throw error;
    }
}

//Post some translations when save
export async function postNewTranslations(appId: string, newTranslations: Translation[]) {
    try {
        const { data } = await http.post(`http://localhost:5221/${appId}`, newTranslations);
        console.log(data);
        return data;
    } catch (error) {
        console.log('Error posting new translation:', error);
        throw error;
    }
}

export async function downloadAppTranslations(appId: string, appName: string) {
    try {
        const res = await http.get<Blob>(`http://localhost:5221/${appId}/download`, { responseType: 'blob', });
        handleDownloadFile(res, appName);
    }
    catch (err) {
        throw err;
    }
}

export async function deployAppTranslations(appId: string) {
    try {
        const { data } = await http.get(`http://localhost:5221/${appId}/deploy`);
        return data;
    }
    catch (err) {
        throw err;
    }
}

const handleDownloadFile = (response: any, appName: string) => {
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${appName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
}

export default {
    getAllApps,
    postNewApp,
    deleteApp,
    postNewTranslation,
    postNewTranslations,
    downloadAppTranslations,
    deployAppTranslations,
};
