import { getFirebaseBackend } from "helpers/firebase_helper";
import { getTimeLimits } from "helpers/fakebackend_helper";
import Cookies from 'universal-cookie';

export const timeLimits = async (): Promise<any[]> => {
   
    try {
        let response: any;
        response = await getTimeLimits()
        return response

    } catch (error) {
        console.log("error timeLimits: " + JSON.stringify(error))
        return []
    }
}

