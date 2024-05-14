import { combineReducers } from "redux";

// Front
// import LayoutReducer from "./layouts/reducer";
import EcommerenceReducer from "./e-commerence/reducer";
import CryptoReducer from "./crypto/reducer";
import InvoiceReducer from "./invoices/reducer";
import ProjectsReducer from "./projects/reducer";
import TasksReducer from "./tasks/reducer";
import ContactsReducer from "./contacts/reducer"
import DashboardReducer from "./dashboards/reducer";
import JobsReducer from "./jobs/reducer";
import ChatsReducer from "./chats/reducer";
import CalendarReducer from "./calendar/reducer";
import LayoutReducer from "./layouts/reducer";
import EmailReducer from "./email/reducer";
import LoginReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import ForgotPasswordReducer from "./auth/forgetpwd/reducer";
import AccountReducer from "./auth/register/reducer";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    ecommerce: EcommerenceReducer,
    crypto: CryptoReducer,
    invoices: InvoiceReducer,
    projects: ProjectsReducer,
    tasks: TasksReducer,
    contacts: ContactsReducer,
    dashboard: DashboardReducer,
    jobs: JobsReducer,
    chats: ChatsReducer,
    calendar: CalendarReducer,
    email: EmailReducer,
    Login: LoginReducer,
    Profile: ProfileReducer,
    ForgetPassword: ForgotPasswordReducer,
    Account: AccountReducer
});

export default rootReducer;