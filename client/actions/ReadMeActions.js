import UUID from 'uuid/v4';
import AppDispatcher from "../dispatcher/AppDispatcher";
import AppConstants from "../../shared/constants/AppConstants";

export default class ReadMeActions {
    static getReadme(){
        AppDispatcher.handleAction({
            actionType: AppConstants.PERFORM_REQUEST,
            url: AppConstants.README_URL,
            requestId: UUID()
        });
    }
}
